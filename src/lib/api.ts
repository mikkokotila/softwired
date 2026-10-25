import type { TutorReply } from "../../server/tutor";
export interface AIStatus {
  configured: boolean;
  model: string;
  provider: string;
  contributorMode: boolean;
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
async function fetchAPI(path: string, options: RequestInit): Promise<Response> {
  try {
    return await fetch(path, options);
  } catch (error) {
    if (options.signal?.aborted) throw error;
    throw new Error(
      "AI-palvelimeen ei saatu yhteyttä. Tarkista verkkoyhteys ja palvelimen käynnistys.",
    );
  }
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
    await fetchAPI("/api/status", {
      cache: "no-store",
      credentials: "same-origin",
      signal: signal ?? AbortSignal.timeout(7000),
    }),
  );
}
export async function unlockAI(token: string, csrf: string) {
  return jsonResponse<{ ok: boolean }>(
    await fetchAPI("/api/unlock", {
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
    await fetchAPI("/api/tutor", {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-CSRF-Token": csrf },
      credentials: "same-origin",
      body: JSON.stringify(body),
      signal,
    }),
  );
}
