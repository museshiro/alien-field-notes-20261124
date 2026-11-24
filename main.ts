// Alien Field Notes: The Two Day Earth Review — entry program.
// Writes one original line of plain text to $MAKEFUN_OUTPUT_DIR/entry.txt.
// Node 22 stdlib only. Deterministic: no clock, no randomness, no network.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Three stars: the locals built a button that delivers any meal in 20 minutes, then spend 40 minutes deciding what to eat.";

const MAX_CHARS = 200;

if (LINE.length > MAX_CHARS) {
  throw new Error(`entry is ${LINE.length} characters, over the ${MAX_CHARS} cap`);
}
if (LINE.includes("\n") || LINE.trim() !== LINE) {
  throw new Error("entry must be a single line with no surrounding whitespace");
}

if (/[\u0000-\u001f]/.test(LINE)) {
  throw new Error("entry must not contain control characters");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) throw new Error("MAKEFUN_OUTPUT_DIR is not set");
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE + "\n", "utf8");

// Read back and verify: the file must hold exactly the line plus one newline.
const written = readFileSync(outPath, "utf8");
if (written !== LINE + "\n") {
  throw new Error("entry.txt does not match the line exactly");
}
