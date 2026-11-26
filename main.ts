import { mkdirSync, writeFileSync } from "node:fs";

const firstHalf = "Earth review: 5/5 stars. At 7:10 a.m. on Tokyo's Yamanote Line I watched a conductor point at the platform and chant,";
const secondHalf = " and I have never felt so supervised by a human who was not there.";
const line = firstHalf + secondHalf;

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", line);
