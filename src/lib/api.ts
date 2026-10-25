import type { TutorReply } from "../../server/tutor";
export interface AIStatus {
  configured: boolean;
  model: string;
  verified: boolean;
  accessRequired: boolean;
  csrf: string;
  message: string;
  paidNotice: string;
}
export interface AIResponse extends TutorReply {
  model: string;
  source: { title: string; book: number[]; pdf: number[] };
}
async function jsonResponse<T>(res: Response): Promise<T> {
  const value = await res.json().catch(() => {
    throw new Error(
      "AI-palvelin ei vastaa JSON-muodossa. Tarkista, että API-palvelin on käynnissä.",
    );
  });
  if (!res.ok)
    throw new Error(
      typeof value.error === "string" ? value.error : "AI-pyyntö epäonnistui.",
    );
  return value as T;
}
export async function getAIStatus(signal?: AbortSignal) {
  return jsonResponse<AIStatus>(
    await fetch("/api/status", {
      cache: "no-store",
      credentials: "same-origin",
      signal: signal ?? AbortSignal.timeout(7000),
    }),
  );
}
export async function unlockAI(token: string, csrf: string) {
  return jsonResponse<{ ok: boolean }>(
    await fetch("/api/unlock", {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-CSRF-Token": csrf },
      credentials: "same-origin",
      body: JSON.stringify({ token }),
      signal: AbortSignal.timeout(10_000),
    }),
  );
}
export async function askTutor(
  body: {
    lessonId: string;
    mode: "explain" | "hint" | "grade" | "dialogue";
    message: string;
    consent: true;
    task?: "recall" | "application" | "exam";
    history: { role: "user" | "assistant"; content: string }[];
  },
  csrf: string,
  signal: AbortSignal,
) {
  return jsonResponse<AIResponse>(
    await fetch("/api/tutor", {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-CSRF-Token": csrf },
      credentials: "same-origin",
      body: JSON.stringify(body),
      signal,
    }),
  );
}
