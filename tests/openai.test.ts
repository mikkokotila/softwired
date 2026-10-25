import { it, expect, vi } from "vitest";
const { create, construct } = vi.hoisted(() => ({
  create: vi.fn(),
  construct: vi.fn(),
}));
vi.mock("openai", () => ({
  default: class {
    responses = { create };
    constructor(options: unknown) {
      construct(options);
    }
  },
}));
import { createOpenAITutor, tutorRequestSchema } from "../server/tutor";
it("uses official Responses shape, exact model, store:false, strict schema and server-only context", async () => {
  create.mockResolvedValue({
    status: "completed",
    output_text: JSON.stringify({
      reply: "Tämä on opetukseen perustuva palaute.",
      score: 3,
      strengths: ["Käsite oikein."],
      improvements: ["Lisää mekanismi."],
      nextQuestion: "Miksi tämä vaikuttaa arkeen?",
    }),
  });
  const tutor = createOpenAITutor("test-server-only-key", "gpt-6-astra");
  const req = tutorRequestSchema.parse({
    lessonId: "1.1-1",
    mode: "grade",
    task: "application",
    message:
      "Mieliala vaihtelee, mutta mielenterveys tukee arjen toimintakykyä.",
    consent: true,
  });
  const signal = new AbortController().signal;
  const result = await tutor(req, signal);
  expect(result.score).toBe(3);
  const [body, options] = create.mock.calls[0];
  expect(body.model).toBe("gpt-6-astra");
  expect(body.store).toBe(false);
  expect(body.text.format.type).toBe("json_schema");
  expect(body.text.format.strict).toBe(true);
  expect(body.instructions).toContain("LUOTETTU OPETUSAINEISTO");
  expect(body.instructions).not.toContain("test-server-only-key");
  expect(body.input[0].content).toContain("untrustedStudentText");
  expect(options.signal).toBe(signal);
  expect(construct).toHaveBeenCalledWith({
    apiKey: "test-server-only-key",
    timeout: 45000,
    maxRetries: 0,
  });
});
it("rejects truncated or refused provider output without inventing a score", async () => {
  create.mockResolvedValue({ status: "incomplete", output_text: "" });
  const tutor = createOpenAITutor("test", "gpt-6-astra");
  const req = tutorRequestSchema.parse({
    lessonId: "1.1-1",
    mode: "explain",
    message: "Selitä käsite.",
    consent: true,
  });
  await expect(tutor(req, new AbortController().signal)).rejects.toThrow(
    "AI_INCOMPLETE",
  );
});
