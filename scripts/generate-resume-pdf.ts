import { spawn, type ChildProcess } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";
import { chromium, type Browser } from "playwright";

const DEFAULT_PORT = 3456;
const DEFAULT_BASE_URL = `http://127.0.0.1:${DEFAULT_PORT}`;
const RESUME_PATH = "/resume";
const OUTPUT_PATH = path.join(process.cwd(), "public", "resume.pdf");
const READY_TIMEOUT_MS = 60_000;
const READY_POLL_MS = 500;

function getBaseUrl(): string {
  return (process.env.RESUME_PDF_BASE_URL ?? DEFAULT_BASE_URL).replace(/\/$/, "");
}

function getPortFromUrl(baseUrl: string): number {
  try {
    const port = Number(new URL(baseUrl).port);
    return port || DEFAULT_PORT;
  } catch {
    return DEFAULT_PORT;
  }
}

async function isResumeReady(baseUrl: string): Promise<boolean> {
  try {
    const response = await fetch(`${baseUrl}${RESUME_PATH}`, {
      method: "GET",
      redirect: "manual",
    });
    return response.ok;
  } catch {
    return false;
  }
}

async function waitForResume(baseUrl: string): Promise<void> {
  const deadline = Date.now() + READY_TIMEOUT_MS;
  while (Date.now() < deadline) {
    if (await isResumeReady(baseUrl)) return;
    await new Promise((resolve) => setTimeout(resolve, READY_POLL_MS));
  }
  throw new Error(
    `Timed out waiting for ${baseUrl}${RESUME_PATH} after ${READY_TIMEOUT_MS}ms`,
  );
}

function startNextServer(port: number): ChildProcess {
  const nextBin = path.join(
    process.cwd(),
    "node_modules",
    "next",
    "dist",
    "bin",
    "next",
  );

  if (!existsSync(nextBin)) {
    throw new Error(`Next.js binary not found at ${nextBin}. Run next build first.`);
  }

  const child = spawn(process.execPath, [nextBin, "start", "-p", String(port)], {
    cwd: process.cwd(),
    env: { ...process.env, PORT: String(port) },
    stdio: ["ignore", "pipe", "pipe"],
  });

  child.stdout?.on("data", (chunk: Buffer) => {
    process.stdout.write(`[next start] ${chunk}`);
  });
  child.stderr?.on("data", (chunk: Buffer) => {
    process.stderr.write(`[next start] ${chunk}`);
  });

  return child;
}

async function stopServer(child: ChildProcess | null): Promise<void> {
  if (!child || child.killed) return;

  await new Promise<void>((resolve) => {
    const forceKill = setTimeout(() => {
      child.kill("SIGKILL");
      resolve();
    }, 5_000);

    child.once("exit", () => {
      clearTimeout(forceKill);
      resolve();
    });

    child.kill("SIGTERM");
  });
}

async function ensureChromium(): Promise<void> {
  const { execFileSync } = await import("node:child_process");
  const playwrightCli = path.join(
    process.cwd(),
    "node_modules",
    "playwright",
    "cli.js",
  );

  execFileSync(process.execPath, [playwrightCli, "install", "chromium"], {
    cwd: process.cwd(),
    stdio: "inherit",
  });
}

async function printResumePdf(baseUrl: string): Promise<void> {
  let browser: Browser | null = null;

  try {
    browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    await page.emulateMedia({ media: "print" });
    await page.goto(`${baseUrl}${RESUME_PATH}`, {
      waitUntil: "networkidle",
    });
    await page.evaluate("document.fonts.ready");

    await page.pdf({
      path: OUTPUT_PATH,
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
    });

    console.log(`Wrote ${OUTPUT_PATH}`);
  } finally {
    await browser?.close();
  }
}

async function main(): Promise<void> {
  const baseUrl = getBaseUrl();
  const port = getPortFromUrl(baseUrl);
  let server: ChildProcess | null = null;
  let startedServer = false;

  try {
    await ensureChromium();

    if (!(await isResumeReady(baseUrl))) {
      console.log(`Starting next start on port ${port}…`);
      server = startNextServer(port);
      startedServer = true;
      await waitForResume(baseUrl);
    } else {
      console.log(`Using existing server at ${baseUrl}`);
    }

    await printResumePdf(baseUrl);
  } finally {
    if (startedServer) {
      await stopServer(server);
    }
  }
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
