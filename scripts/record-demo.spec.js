import fs from "node:fs/promises";
import path from "node:path";
import { test, chromium } from "@playwright/test";

const root = process.cwd();
const outDir = path.join(root, "artifacts", "video", "capture");
const url = process.env.DEMO_URL || "https://frozen-hamilton-admit-franklin.trycloudflare.com";

test("record Memory Will demo path", async () => {
  await fs.mkdir(outDir, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    recordVideo: { dir: outDir, size: { width: 1440, height: 1000 } }
  });
  const page = await context.newPage();
  const log = {
    url,
    startedAt: new Date().toISOString(),
    consoleErrors: [],
    failedRequests: [],
    actions: [],
    assertions: []
  };

  page.on("console", (msg) => {
    if (msg.type() === "error") log.consoleErrors.push(msg.text());
  });
  page.on("requestfailed", (request) => {
    log.failedRequests.push({
      url: request.url(),
      failure: request.failure()?.errorText || "unknown"
    });
  });

  async function mark(action) {
    log.actions.push({ action, at: new Date().toISOString() });
  }

  async function assertVisible(selector, label, timeout = 30000) {
    await page.locator(selector).first().waitFor({ state: "visible", timeout });
    log.assertions.push({ label, selector, at: new Date().toISOString() });
  }

  try {
    await mark("open live URL");
    await page.goto(url, { waitUntil: "networkidle", timeout: 90000 });
    await assertVisible("[data-hero-text]", "hero loaded");
    await page.screenshot({ path: path.join(outDir, "01-hero.png"), fullPage: false });

    await mark("click Kill Agent");
    await page.getByRole("button", { name: /Kill Agent/i }).click();
    await assertVisible("text=Predecessor killed", "predecessor killed");
    await page.waitForTimeout(900);
    await page.screenshot({ path: path.join(outDir, "02-killed.png"), fullPage: false });

    await mark("select Legal successor");
    await page.getByRole("button", { name: /Legal successor/i }).click();
    await page.waitForTimeout(600);

    await mark("write Memory Will");
    await page.getByRole("button", { name: /Write Memory Will/i }).click();
    await assertVisible("text=Walrus pointer certified", "walrus pointer certified", 120000);
    await assertVisible("[data-memory-will-pointer]", "receipt pointer visible", 30000);
    await page.waitForTimeout(1200);
    await page.screenshot({ path: path.join(outDir, "03-walrus-pointer.png"), fullPage: false });

    await mark("open cold successor");
    await page.getByRole("button", { name: /Open Cold Successor/i }).click();
    await assertVisible("text=Scoped restore complete", "restore complete", 180000);
    await assertVisible("[data-successor-output]", "successor output visible", 30000);
    await page.waitForTimeout(1600);
    await page.screenshot({ path: path.join(outDir, "04-successor.png"), fullPage: false });

    await mark("inspect proof");
    await page.getByRole("button", { name: /Inspect Proof/i }).click();
    await assertVisible("text=Proof inspected", "proof inspected", 120000);
    await assertVisible("[data-proof-status]", "proof status visible", 30000);
    await page.waitForTimeout(1200);
    await page.screenshot({ path: path.join(outDir, "05-proof.png"), fullPage: false });

    await mark("reopen latest receipt in second context");
    const second = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const secondPage = await second.newPage();
    await secondPage.goto(`${url}/?will=latest`, { waitUntil: "networkidle", timeout: 90000 });
    await secondPage.locator("[data-receipt-header]").first().waitFor({ state: "visible", timeout: 30000 });
    await secondPage.screenshot({ path: path.join(outDir, "06-reopen-latest.png"), fullPage: false });
    await second.close();

    log.status = "passed";
    log.completedAt = new Date().toISOString();
  } catch (error) {
    log.status = "failed";
    log.completedAt = new Date().toISOString();
    log.error = error instanceof Error ? error.stack || error.message : String(error);
    await page.screenshot({ path: path.join(outDir, "error.png"), fullPage: false }).catch(() => {});
    throw error;
  } finally {
    const video = page.video();
    await context.close();
    if (video) {
      const rawVideoPath = await video.path();
      const finalVideoPath = path.join(outDir, "app-demo.webm");
      await fs.copyFile(rawVideoPath, finalVideoPath);
      log.video = finalVideoPath;
    }
    await browser.close();
    await fs.writeFile(path.join(outDir, "recording-log.json"), JSON.stringify(log, null, 2));
  }
});
