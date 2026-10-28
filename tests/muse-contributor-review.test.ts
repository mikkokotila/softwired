import { beforeEach, describe, expect, it, vi } from "vitest";

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

import {
  adultReviewRequestSchema,
  buildAdultReviewInstructions,
  containsObviousPersonalData,
  createMuseContributorAdultReviewer,
  MuseModelMismatchError,
} from "../server/muse-contributor-review";
import {
  MUSE_CONTRIBUTOR_MODEL,
  MUSE_API_BASE_URL,
} from "../src/config/muse-model";

const request = {
  adultConfirmed: true as const,
  syntheticContentConfirmed: true as const,
  lessonId: "1.1-1",
  task: "application" as const,
  mode: "grade" as const,
  message:
    "Yksi huono päivä ei yksin kuvaa hyvinvointia, sillä mieliala muuttuu. Jos vaikeudet jatkuvat, voi hakea tukea turvalliselta aikuiselta.",
  history: [],
};
const reply = {
  reply:
    "Yksi keskeinen osa oikein. Perustele myös mielenterveyden ja mielialan ero.",
  score: 2,
  strengths: ["Mielialan vaihtelu"],
  improvements: ["Mielenterveyden käsite"],
  nextQuestion: "Miten mieliala eroaa mielenterveydestä?",
};

beforeEach(() => {
  create.mockReset();
  construct.mockReset();
  create.mockResolvedValue({
    status: "completed",
    model: MUSE_CONTRIBUTOR_MODEL,
    output_text: JSON.stringify(reply),
  });
});

describe("hard-pinned, private Muse Spark 1.3 Contributor", () => {
  it("has no alternate-model argument, uses the Meta endpoint, store:false and exact model", async () => {
    const reviewer = createMuseContributorAdultReviewer("private-server-key");
    const signal = new AbortController().signal;
    const response = await reviewer(request, signal);
    expect(response.model).toBe("muse-spark-1.3-contributor");
    expect(response.provider).toBe("Meta Model API");
    expect(response.score).toBe(2);
    expect(construct).toHaveBeenCalledWith({
      apiKey: "private-server-key",
      baseURL: MUSE_API_BASE_URL,
      timeout: 45_000,
      maxRetries: 0,
    });
    const [payload, options] = create.mock.calls[0];
    expect(payload.model).toBe(MUSE_CONTRIBUTOR_MODEL);
    expect(payload.store).toBe(false);
    expect(payload.text.format.type).toBe("json_schema");
    expect(payload.text.format.strict).toBe(true);
    expect(payload.input[0].content).not.toContain("private-server-key");
    expect(options.signal).toBe(signal);
  });

  it("fails closed if an upstream response identifies any other model", async () => {
    create.mockResolvedValueOnce({
      status: "completed",
      model: "muse-spark-1.3",
      output_text: JSON.stringify(reply),
    });
    await expect(
      createMuseContributorAdultReviewer("key")(request),
    ).rejects.toBeInstanceOf(MuseModelMismatchError);
    expect(create).toHaveBeenCalledTimes(1);
  });

  it("rejects incomplete responses and invalid structured grading", async () => {
    create.mockResolvedValueOnce({
      status: "incomplete",
      model: MUSE_CONTRIBUTOR_MODEL,
      output_text: "",
    });
    await expect(
      createMuseContributorAdultReviewer("key")(request),
    ).rejects.toThrow("MUSE_RESPONSE_INCOMPLETE");
    create.mockResolvedValueOnce({
      status: "completed",
      model: MUSE_CONTRIBUTOR_MODEL,
      output_text: JSON.stringify({ ...reply, score: null }),
    });
    await expect(
      createMuseContributorAdultReviewer("key")(request),
    ).rejects.toThrow("MUSE_RESPONSE_SCORE_INVALID");
  });

  it("requires explicit adult, synthetic-data confirmations", () => {
    expect(
      adultReviewRequestSchema.safeParse({
        ...request,
        adultConfirmed: false,
      }).success,
    ).toBe(false);
    expect(
      adultReviewRequestSchema.safeParse({
        ...request,
        syntheticContentConfirmed: false,
      }).success,
    ).toBe(false);
    expect(adultReviewRequestSchema.safeParse(request).success).toBe(true);
  });

  it("refuses obvious identifying inputs before any paid request", async () => {
    expect(containsObviousPersonalData("adult@example.com")).toBe(true);
    expect(containsObviousPersonalData("+358 401234567")).toBe(true);
    const reviewer = createMuseContributorAdultReviewer("private-key");
    await expect(
      reviewer({
        ...request,
        message:
          "This sentence includes adult@example.com and private records.",
      }),
    ).rejects.toThrow("PERSONAL_DATA_NOT_ALLOWED");
    expect(create).not.toHaveBeenCalled();
  });

  it("keeps the trusted lesson and rubric separate from untrusted sample data", () => {
    const content = buildAdultReviewInstructions(request);
    expect(content).toContain("TRUSTED_CURRICULUM");
    expect(content).toContain("rubric");
    expect(content).not.toContain(request.message);
    expect(content).toContain("private adult-only");
  });
});
