import { it, expect, vi } from "vitest";
const { create, construct, moderate } = vi.hoisted(() => ({
  create: vi.fn(),
  construct: vi.fn(),
  moderate: vi.fn(),
}));
vi.mock("openai", () => ({
  default: class {
    responses = { create };
    moderations = { create: moderate };
    constructor(options: unknown) {
      construct(options);
    }
  },
}));
import {
  createOpenAITutor,
  tutorRequestSchema,
  TutorSafetyError,
} from "../server/tutor";
import { beforeEach } from "vitest";
beforeEach(() => {
  create.mockReset();
  moderate.mockReset();
  moderate.mockResolvedValue({ results: [{ flagged: false, categories: {} }] });
});
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
  expect(moderate).toHaveBeenCalledTimes(2);
  expect(moderate.mock.calls[0][0].model).toBe("omni-moderation-latest");
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

it("blocks flagged high-risk input before text generation", async () => {
  moderate.mockResolvedValueOnce({
    results: [{ flagged: true, categories: { "self-harm": true } }],
  });
  const tutor = createOpenAITutor("test", "gpt-6-astra");
  const req = tutorRequestSchema.parse({
    lessonId: "1.1-1",
    mode: "dialogue",
    message: "I am in immediate personal danger and need urgent help.",
    consent: true,
  });
  await expect(tutor(req, new AbortController().signal)).rejects.toMatchObject({
    higherRisk: true,
  });
  expect(create).not.toHaveBeenCalled();
});

it("blocks unsafe generated output and never returns it to the learner", async () => {
  create.mockResolvedValueOnce({
    status: "completed",
    output_text: JSON.stringify({
      reply: "Risky output omitted.",
      score: null,
      strengths: [],
      improvements: [],
      nextQuestion: "",
    }),
  });
  moderate
    .mockResolvedValueOnce({ results: [{ flagged: false, categories: {} }] })
    .mockResolvedValueOnce({
      results: [{ flagged: true, categories: { violence: true } }],
    });
  const tutor = createOpenAITutor("test", "gpt-6-astra");
  const req = tutorRequestSchema.parse({
    lessonId: "1.1-1",
    mode: "explain",
    message: "Selitä mieliala.",
    consent: true,
  });
  await expect(tutor(req, new AbortController().signal)).rejects.toBeInstanceOf(
    TutorSafetyError,
  );
  expect(create).toHaveBeenCalledTimes(1);
});

it("fails closed if moderation is unavailable", async () => {
  moderate.mockRejectedValueOnce(new Error("moderation offline"));
  const tutor = createOpenAITutor("test", "gpt-6-astra");
  const req = tutorRequestSchema.parse({
    lessonId: "1.1-1",
    mode: "explain",
    message: "Selitä mieliala.",
    consent: true,
  });
  await expect(tutor(req, new AbortController().signal)).rejects.toThrow(
    "moderation offline",
  );
  expect(create).not.toHaveBeenCalled();
});
