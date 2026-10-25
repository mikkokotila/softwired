import { expect, it } from "vitest";
import fs from "node:fs";
import postcss from "postcss";

it("keeps all color literals isolated in theme tokens, not feature CSS", () => {
  const files = ["src/styles.css", "src/design/command-center.css"];
  for (const f of files) {
    const src = fs.readFileSync(f, "utf8");
    expect(src).not.toMatch(/#[\da-fA-F]{3,8}\b/);
  }
});

it("resolves every referenced semantic token from the central theme package", () => {
  const files = [
    "src/design/tokens.css",
    "src/styles.css",
    "src/design/command-center.css",
  ];
  const defined = new Set<string>();
  const used = new Set<string>();
  for (const file of files) {
    const root = postcss.parse(fs.readFileSync(file, "utf8"));
    root.walkDecls((decl) => {
      if (decl.prop.startsWith("--")) defined.add(decl.prop);
      for (const hit of decl.value.matchAll(/var\((--[\w-]+)/g))
        used.add(hit[1]);
    });
  }
  expect([...used].filter((name) => !defined.has(name))).toEqual([]);
  expect(defined.has("--accent")).toBe(true);
  expect(defined.has("--page-bg")).toBe(true);
  expect(defined.has("--font-heading")).toBe(true);
  expect(defined.has("--layout-rail")).toBe(true);
});

it("contains distinct orbit, nebula and daybreak palettes", () => {
  const src = fs.readFileSync("src/design/tokens.css", "utf8");
  for (const theme of ["orbit", "nebula", "daybreak"]) {
    expect(src).toContain('data-theme="' + theme + '"');
  }
});
