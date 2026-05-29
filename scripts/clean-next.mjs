import { rmSync } from "node:fs";
import { join } from "node:path";

const nextDir = join(process.cwd(), ".next");

for (let attempt = 0; attempt < 3; attempt += 1) {
  try {
    rmSync(nextDir, { recursive: true, force: true });
    console.log("Removed .next cache");
    process.exit(0);
  } catch (err) {
    if (attempt === 2) {
      console.error("Could not remove .next — stop `npm run dev` first, then run again.");
      console.error(err);
      process.exit(1);
    }
  }
}
