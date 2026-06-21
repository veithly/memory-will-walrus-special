type KvNamespace = {
  get(key: string, type?: "text"): Promise<string | null>;
  put(key: string, value: string): Promise<void>;
};

export function getMemoryWillKv(): KvNamespace | null {
  try {
    const context = require("@opennextjs/cloudflare") as {
      getCloudflareContext: () => { env?: Record<string, unknown> };
    };
    const binding = context.getCloudflareContext().env?.MEMORY_WILL_STATE;
    return binding && typeof binding === "object" ? (binding as KvNamespace) : null;
  } catch {
    return null;
  }
}
