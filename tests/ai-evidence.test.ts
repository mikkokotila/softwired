import { describe, expect, it } from "vitest";
import { recordIndependentTransfer } from "../src/lib/ai-evidence";
import { freshState, type StudyState } from "../src/lib/storage";

function state(): StudyState {
  const s = freshState();
  s.drafts["1.1-1"] = {
    stage: 4,
    recall: "Aiheen muistin itse.",
    written: "Tunteiden vaihtelu kuuluu elämään ja tukea voi hakea aikuisilta.",
    choiceIndex: 1,
    answers: {},
    recallSubmitted: true,
    writtenSubmitted: true,
    rubricViewed: false,
    helpUsed: false,
  };
  return s;
}
const answer = state().drafts["1.1-1"].written;

describe("independent AI grading evidence", () => {
  it("credits an unassisted locked answer", () => {
    const result = recordIndependentTransfer(state(), "1.1-1", answer, 3, 1000);
    expect(result.objectives["1.1-1"].transfer).toEqual({
      at: 1000,
      score: 3,
      method: "ai",
    });
  });

  it.each([
    {
      name: "opened the model answer while AI was processing",
      changes: { rubricViewed: true },
    },
    {
      name: "requested a hint while AI was processing",
      changes: { helpUsed: true },
    },
    { name: "unlocked the draft", changes: { writtenSubmitted: false } },
    {
      name: "changed answer",
      changes: { written: "Another answer with substantial text." },
    },
    { name: "admitted not knowing", changes: { written: "En tiedä?" } },
    { name: "very short input", changes: { written: "Joo" } },
  ])("does not credit when student $name", ({ changes }) => {
    const s = state();
    Object.assign(s.drafts["1.1-1"], changes);
    const result = recordIndependentTransfer(s, "1.1-1", answer, 4);
    expect(result).toBe(s);
  });

  it.each([-1, 5, 2.5, NaN])("rejects an invalid score %s", (score) => {
    const s = state();
    expect(recordIndependentTransfer(s, "1.1-1", answer, score)).toBe(s);
  });
});
