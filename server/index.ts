import "dotenv/config";
import { createApp } from "./app";
const host = process.env.HOST ?? "127.0.0.1";
const port = Number(process.env.PORT ?? 3001);
const production = process.env.NODE_ENV === "production";
const model = process.env.MUSE_MODEL?.trim() || "muse-spark-1.3-contributor";
const dailyLimit = Number(process.env.AI_DAILY_LIMIT ?? 100);
if (
  !Number.isInteger(port) ||
  port < 1 ||
  port > 65535 ||
  !Number.isInteger(dailyLimit) ||
  dailyLimit < 1
)
  throw new Error("Invalid PORT or AI_DAILY_LIMIT.");
const app = createApp({
  apiKey: process.env.MUSE_API_KEY?.trim(),
  model,
  appOrigin:
    process.env.APP_ORIGIN ??
    (production ? `http://127.0.0.1:${port}` : "http://127.0.0.1:5173"),
  production,
  publicBind: !["127.0.0.1", "localhost", "::1"].includes(host),
  accessToken: process.env.APP_ACCESS_TOKEN,
  cookieSecret: process.env.SESSION_SECRET,
  editorialNote: process.env.MEDICAL_EDITORIAL_NOTE,
  dailyLimit,
});
const server = app.listen(port, host, () =>
  console.log(
    `Kipinä API ${host}:${port} · ${model} · ${process.env.MUSE_API_KEY ? "avain määritetty, ei vielä varmennettu" : "AI odottaa avainta"}`,
  ),
);
server.requestTimeout = 60_000;
for (const signal of ["SIGTERM", "SIGINT"])
  process.on(signal, () => {
    server.close(() => process.exit(0));
  });
