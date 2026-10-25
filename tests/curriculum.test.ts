import { describe, expect, it } from "vitest";
import { validateCurriculum } from "../scripts/validate-content";
import { lessons, sections } from "../src/content";
import { makeExam } from "../src/content/exams";
describe("self-sufficient curriculum", () => {
  it("has substantive nonduplicate teaching and assessments across every mapped section", () =>
    expect(validateCurriculum()).toEqual([]));
  it("uses the exact PDF/book section map", () =>
    expect(
      sections.map((s) => [s.id, ...s.source.pdf, ...s.source.book]),
    ).toEqual([
      ["1.1", 1, 4, 8, 11],
      ["1.2", 5, 8, 12, 15],
      ["1.4", 9, 12, 20, 23],
      ["5.1", 15, 17, 66, 68],
      ["5.2", 18, 23, 69, 74],
      ["5.3", 24, 26, 75, 77],
      ["6.1", 28, 35, 80, 87],
      ["6.2", 36, 39, 88, 91],
      ["7.3", 40, 43, 102, 105],
      ["8.1", 45, 49, 108, 112],
      ["8.2", 50, 54, 113, 117],
      ["8.3", 55, 59, 118, 122],
      ["8.4", 60, 62, 123, 125],
    ]));
  it.each([15, 40] as const)(
    "%i-minute exam covers all sections and includes written transfer",
    (minutes) => {
      const qs = makeExam(minutes, 12345);
      expect(new Set(qs.map((q) => q.sectionId)).size).toBe(13);
      expect(new Set(qs.map((q) => q.id)).size).toBe(qs.length);
      expect(qs.filter((q) => q.kind === "written").length).toBe(
        minutes === 15 ? 4 : 13,
      );
      expect(qs.length).toBe(minutes === 15 ? 13 : 26);
      expect(qs).toEqual(makeExam(minutes, 12345));
    },
  );
  it("explicitly labels historical graphs and corrects dangerous old guidance", () => {
    expect(
      lessons.find((l) => l.id === "5.3-4")!.paragraphs.join(" "),
    ).toContain("historiallista");
    expect(
      lessons.find((l) => l.id === "8.3-4")!.paragraphs.join(" "),
    ).toContain("ei anneta mitään suuhun");
    expect(
      lessons.find((l) => l.id === "8.2-1")!.paragraphs.join(" "),
    ).toContain("haukkovat vedot eivät ole normaalia hengitystä");
  });
});

it("distinguishes current CPR by rescuer training instead of a universal ratio", () => {
  const adult = lessons.find((l) => l.id === "8.2-2")!;
  const child = lessons.find((l) => l.id === "8.2-4")!;
  expect(adult.paragraphs.join(" ")).toContain(
    "Ilman niitä jatketaan keskeytymätöntä painelua",
  );
  expect(adult.recall.model).toContain("koulutetulle");
  expect(child.paragraphs.join(" ")).toContain("15:2");
  expect(child.paragraphs.join(" ")).toContain("kouluttamatonta");
});
