import type { WrittenTask } from "../content/types";
import { isUnsureAnswer } from "./answer-flow";

export type AnswerFeedback = {
  kind: "empty" | "unsure" | "brief" | "substantive";
  introduction: string;
  sharedTerms: string[];
  nextStep: string;
  focus: string;
};

/**
 * Offline, transparent formative feedback. It does NOT grade correctness.
 * A substring-based check can identify words, never reasoning or meaning.
 * The supplied task/rubric always comes from the authored syllabus.
 */
const COMMON = new Set([
  "aina",
  "asia",
  "asian",
  "että",
  "hyvin",
  "joka",
  "jokin",
  "jolloin",
  "kannattaa",
  "kanssa",
  "koko",
  "koska",
  "kuin",
  "kuten",
  "kyllä",
  "miten",
  "miksi",
  "myös",
  "näin",
  "noin",
  "olla",
  "ovat",
  "pitää",
  "sekä",
  "sen",
  "siksi",
  "silloin",
  "sillä",
  "siitä",
  "sitä",
  "tämä",
  "tämän",
  "tässä",
  "täytyy",
  "vaan",
  "vain",
  "voivat",
  "vuoksi",
  "yhden",
  "esimerkiksi",
]);
function terms(text: string) {
  return (text.toLocaleLowerCase("fi-FI").match(/\p{L}{4,}/gu) ?? []).filter(
    (w) => !COMMON.has(w),
  );
}
function root(word: string) {
  const normalized = word.normalize("NFD").replace(/\p{M}/gu, "");
  return normalized.slice(0, normalized.length >= 7 ? 5 : 4);
}
export function analyzeWrittenAnswer(
  answer: string,
  task: WrittenTask,
): AnswerFeedback {
  const raw = answer.trim();
  const startingFocus = task.rubric[0] ?? "Tehtävän ydinkäsite ja perustelu";
  if (!raw)
    return {
      kind: "empty",
      introduction:
        "Et vielä kirjoittanut vastausta. Lue mallivastaus ja kokeile seuraavalla kerralla muotoilla yksi oma ajatus.",
      sharedTerms: [],
      nextStep: "Aloita tästä: " + startingFocus + ".",
      focus: startingFocus,
    };
  if (isUnsureAnswer(raw))
    return {
      kind: "unsure",
      introduction:
        "Kirjoitit, ettet vielä tiedä. Tämä ei ole virhe eikä onnistunut koevastaus. Ota mallista yksi ydinasia ja palauta se myöhemmin mieleen omin sanoin.",
      sharedTerms: [],
      nextStep: "Harjoittele ensin tätä: " + startingFocus + ".",
      focus: startingFocus,
    };

  const answerTerms = terms(raw);
  const answerRoots = new Set(answerTerms.map(root));
  // Prioritize a rubric criterion with fewer lexical overlaps. This is
  // ONLY a suggestion about what to verify, not a claim it was omitted.
  const focus =
    task.rubric.find(
      (criterion) =>
        !terms(criterion).some((word) => answerRoots.has(root(word))),
    ) ??
    task.rubric[0] ??
    "Tehtävän ydinkäsite ja perustelu";
  const sharedTerms: string[] = [];
  const seen = new Set<string>();
  for (const word of terms(task.model)) {
    const r = root(word);
    if (answerRoots.has(r) && !seen.has(r)) {
      seen.add(r);
      sharedTerms.push(word);
    }
    if (sharedTerms.length === 4) break;
  }

  if (answerTerms.length < 8) {
    return {
      kind: "brief",
      introduction:
        "Vastasit lyhyesti. Tämä on alku, mutta kokeessa tarvitset yleensä myös käsitteen selityksen ja tehtävän pyytämän perustelun tai esimerkin.",
      sharedTerms,
      nextStep:
        "Kun harjoittelet uudelleen, täydennä tämä kohta: " + focus + ".",
      focus,
    };
  }
  return {
    kind: "substantive",
    introduction:
      "Kirjoitit oman vastauksen. Seuraava askel on tarkistaa, että käsitteet, syyt ja tehtävän kaikki osat ovat mukana — pelkkä tekstin pituus ei kerro oikeellisuudesta.",
    sharedTerms,
    nextStep: "Vertaa omaa perusteluasi arviointikohtaan: " + focus + ".",
    focus,
  };
}
