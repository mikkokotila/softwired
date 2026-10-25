import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

const roots = ["dist", "dist-server"];
const errors: string[] = [];
const files: string[] = [];
function walk(folder: string) {
  for (const name of readdirSync(folder)) {
    const p = path.join(folder, name);
    if (statSync(p).isDirectory()) walk(p);
    else files.push(p);
  }
}
for (const root of roots) {
  if (!existsSync(root)) errors.push("Missing build output: " + root);
  else walk(root);
}
if (!files.some((f) => f.endsWith(".webmanifest")))
  errors.push("PWA manifest missing");
if (!files.some((f) => f.endsWith("/sw.js")))
  errors.push("Offline service worker missing");
for (const file of files) {
  if (/\.pdf$/i.test(file)) errors.push("Textbook PDF shipped: " + file);
  if (!/\.(?:js|html|css|json|webmanifest)$/i.test(file)) continue;
  const text = readFileSync(file, "utf8");
  if (/api\.meta\.ai|https:\/\/api\.meta\.ai|MUSE_API_KEY/.test(text))
    errors.push("Forbidden under-18 Meta API reference in " + file);
  if (/LLM_[0-9]+_[A-Za-z0-9_-]{24,}/.test(text))
    errors.push("Potential legacy provider credential in " + file);
}
if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log(
    "Release artefacts verified:",
    files.length,
    "files; no Meta endpoint, keys, or source PDF in distributed output.",
  );
}
