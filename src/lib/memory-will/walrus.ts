import type { MemoryWillRecord, WalrusPointer } from "./types";

type WalrusWriteResult =
  | {
      status: "ready";
      pointer: WalrusPointer;
      raw: unknown;
    }
  | {
      status: "degraded" | "error";
      pointer: null;
      raw: unknown;
      message: string;
    };

type WalrusReadOptions = {
  attempts?: number;
  initialDelayMs?: number;
  maxDelayMs?: number;
  strictConsistencyCheck?: boolean;
};

function endpoint(name: "publisher" | "aggregator") {
  const value =
    name === "publisher"
      ? process.env.WALRUS_PUBLISHER_URL
      : process.env.WALRUS_AGGREGATOR_URL;
  return value?.trim().replace(/\/+$/, "") ?? "";
}

function objectIdFromWalrusResponse(value: unknown) {
  if (!value || typeof value !== "object") return "";
  const record = value as Record<string, unknown>;
  const id = record.id;
  if (typeof id === "string") return id;
  if (id && typeof id === "object" && "id" in id) {
    const nested = (id as Record<string, unknown>).id;
    if (typeof nested === "string") return nested;
  }
  return "";
}

function pointerFromWalrusResponse(raw: unknown): WalrusPointer | null {
  if (!raw || typeof raw !== "object") return null;
  const record = raw as Record<string, unknown>;
  const created = record.newlyCreated as { blobObject?: Record<string, unknown> } | undefined;
  const certified = record.alreadyCertified as Record<string, unknown> | undefined;
  const blobObject = created?.blobObject;
  const blobId = String(blobObject?.blobId ?? certified?.blobId ?? "");
  const objectId = objectIdFromWalrusResponse(blobObject ?? certified);
  if (!blobId || !objectId) return null;
  return {
    status: "walrus-certified",
    blobId,
    objectId,
    aggregatorUrl: endpoint("aggregator"),
    publisherUrl: endpoint("publisher"),
    writtenAt: new Date().toISOString(),
    epochs: Number((record as { epochs?: number }).epochs ?? 1)
  };
}

export async function writeMemoryWillToWalrus(input: {
  willDraft: Omit<MemoryWillRecord, "willId" | "createdAt" | "status" | "pointer" | "dependency">;
  epochs?: number;
}): Promise<WalrusWriteResult> {
  const publisher = endpoint("publisher");
  const aggregator = endpoint("aggregator");
  if (!publisher || !aggregator) {
    return {
      status: "degraded",
      pointer: null,
      raw: null,
      message: "Walrus publisher or aggregator endpoint is not configured."
    };
  }

  const payload = JSON.stringify(
    {
      schema: "memory-will.v1",
      createdAt: new Date().toISOString(),
      payload: input.willDraft
    },
    null,
    2
  );

  const attempts = 4;
  let delayMs = 1000;
  let lastError: Error | null = null;
  let lastRaw: unknown = null;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(`${publisher}/v1/blobs?epochs=${input.epochs ?? 1}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json"
        },
        body: payload
      });

      const rawText = await response.text();
      let raw: unknown = rawText;
      try {
        raw = JSON.parse(rawText);
      } catch {
        raw = { responseText: rawText };
      }
      lastRaw = raw;

      if (!response.ok) {
        lastError = new Error(`Walrus write failed with HTTP ${response.status}.`);
        if ([408, 425, 429, 500, 502, 503, 504].includes(response.status) && attempt < attempts) {
          await sleep(delayMs);
          delayMs = Math.min(5000, Math.round(delayMs * 1.6));
          continue;
        }
        return {
          status: "error",
          pointer: null,
          raw,
          message: lastError.message
        };
      }

      const pointer = pointerFromWalrusResponse(raw);
      if (!pointer) {
        return {
          status: "error",
          pointer: null,
          raw,
          message: "Walrus write completed without a blob id and object id."
        };
      }

      return { status: "ready", pointer, raw };
    } catch (err) {
      lastError = err instanceof Error ? err : new Error("Walrus write failed.");
      if (attempt < attempts) {
        await sleep(delayMs);
        delayMs = Math.min(5000, Math.round(delayMs * 1.6));
      }
    }
  }

  return {
    status: "error",
    pointer: null,
    raw: lastRaw,
    message: `${lastError?.message ?? "Walrus write failed."} after ${attempts} write attempts.`
  };
}

function sleep(ms: number) {
  return new Promise((done) => {
    setTimeout(done, ms);
  });
}

function readUrl(pointer: WalrusPointer, strictConsistencyCheck: boolean) {
  const aggregator = endpoint("aggregator") || pointer.aggregatorUrl;
  if (!aggregator) throw new Error("Walrus aggregator endpoint is not configured.");
  const query = strictConsistencyCheck ? "?strict_consistency_check=true" : "";
  return `${aggregator.replace(/\/+$/, "")}/v1/blobs/${pointer.blobId}${query}`;
}

export async function readMemoryWillFromWalrus(pointer: WalrusPointer, options: WalrusReadOptions = {}) {
  const aggregator = endpoint("aggregator") || pointer.aggregatorUrl;
  if (!aggregator) throw new Error("Walrus aggregator endpoint is not configured.");

  const attempts = Math.max(1, options.attempts ?? 1);
  const maxDelayMs = Math.max(250, options.maxDelayMs ?? 5000);
  let delayMs = Math.max(250, options.initialDelayMs ?? 1000);
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(readUrl(pointer, options.strictConsistencyCheck ?? true), {
        method: "GET",
        headers: {
          accept: "application/json",
          "cache-control": "no-cache"
        },
        cache: "no-store"
      });
      const text = await response.text();
      if (!response.ok) throw new Error(`Walrus read failed with HTTP ${response.status}.`);
      return JSON.parse(text) as unknown;
    } catch (err) {
      lastError = err instanceof Error ? err : new Error("Walrus read failed.");
      if (attempt < attempts) {
        await sleep(delayMs);
        delayMs = Math.min(maxDelayMs, Math.round(delayMs * 1.6));
      }
    }
  }

  if (lastError && attempts > 1) {
    throw new Error(`${lastError.message} after ${attempts} read attempts.`);
  }
  throw lastError ?? new Error("Walrus read failed.");
}
