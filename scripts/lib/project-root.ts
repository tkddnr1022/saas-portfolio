import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const scriptsDir = dirname(fileURLToPath(import.meta.url));

/** Repository root (`saas-portfolio/`) */
export const projectRoot = join(scriptsDir, "..", "..");
