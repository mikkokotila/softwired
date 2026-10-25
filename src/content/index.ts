import { mind } from "./mind";
import { substances } from "./substances";
import { nutrition } from "./nutrition";
import { safety } from "./safety";
import { resuscitation } from "./resuscitation";
import { emergencies } from "./emergencies";
import { bleeding } from "./bleeding";
export const sections = [
  ...mind,
  ...substances,
  ...nutrition,
  safety,
  resuscitation,
  emergencies,
  bleeding,
];
export const lessons = sections.flatMap((s) => s.lessons);
export const lessonById = Object.fromEntries(lessons.map((l) => [l.id, l]));
export const glossary = Array.from(
  new Map(
    lessons.flatMap((l) =>
      l.terms.map((t) => [t.word, { ...t, lessonId: l.id }] as const),
    ),
  ).values(),
).sort((a, b) => a.word.localeCompare(b.word, "fi"));
export const commandVerbs = [
  { word: "Määrittele", definition: "Kerro käsitteen täsmällinen merkitys." },
  {
    word: "Kuvaile",
    definition: "Kerro olennaiset piirteet tai toiminnan vaiheet.",
  },
  { word: "Selitä", definition: "Avaa syy-seuraussuhde: miten ja miksi?" },
  {
    word: "Vertaile",
    definition: "Kerro sekä yhtäläisyydet että erot samoista näkökulmista.",
  },
  { word: "Perustele", definition: "Esitä väite ja sitä tukevat syyt." },
  {
    word: "Sovella",
    definition: "Käytä tietoa uuteen tilanteeseen ja perustele valinta.",
  },
  {
    word: "Arvioi",
    definition: "Punnitse väitettä, näyttöä ja päätelmien rajoja.",
  },
];
export const medicalNote = {
  checkedAt: "25.10.2026",
  text: "Ensiavun teoriaa, ei hätätilanteen palvelu. Todellisessa hätätilanteessa soita 112 ja noudata päivystäjän ohjeita. Kirjan vanhoja ohjeita on korjattu 15.10.2026 julkaistuun Käypä hoito -elvytyssuositukseen ja SPR:n ensiapuohjeisiin vertaamalla. Käytännön taidot harjoitellaan ohjatusti. Sisältö odottaa ensiapuammattilaisen toimituksellista hyväksyntää.",
  sources: [
    ["Ensiapuohjeet", "https://www.punainenristi.fi/ensiapu/ensiapuohjeet/"],
    ["Elvytys: Käypä hoito 15.10.2026", "https://www.kaypahoito.fi/hoi17010"],
    ["Elvytyssuosituksen tiivistelmä", "https://www.kaypahoito.fi/kht00112"],
    [
      "Aikuisen elvytys",
      "https://www.punainenristi.fi/ensiapu/ensiapuohjeet/elvytys/aikuisen-elvytys-painelu-puhalluselvytys/",
    ],
    [
      "Lapsen elvytys",
      "https://www.punainenristi.fi/ensiapu/ensiapuohjeet/elvytys/lapsen-elvytys/",
    ],
    [
      "Matala verensokeri",
      "https://www.punainenristi.fi/ensiapu/ensiapuohjeet/diabeetikon-verensokerin-lasku/",
    ],
  ],
};
