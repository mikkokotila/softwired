import { expect, it } from "vitest";
import { onRequestGet as status } from "../functions/api/status";
import { onRequestPost as tutor } from "../functions/api/tutor";
import { onRequestPost as unlock } from "../functions/api/unlock";

it("Pages status remains disabled even when a provider secret is supplied later", async () => {
  const r = await status();
  expect(r.status).toBe(200);
  expect(r.headers.get("Cache-Control")).toContain("no-store");
  const body = (await r.json()) as Record<string, unknown>;
  expect(body.configured).toBe(false);
  expect(body.provider).toBe("Meta Model API");
  expect(body.model).toBe("muse-spark-1.3-contributor");
  expect(body.csrf).toBe("");
});

it("public Pages API never initiates an AI call or accepts an unlock token", async () => {
  for (const route of [tutor, unlock]) {
    const r = await route();
    expect(r.status).toBe(route === tutor ? 403 : 503);
    expect(r.headers.get("Cache-Control")).toContain("no-store");
    expect(((await r.json()) as { error: string }).error).toBeTruthy();
  }
});
