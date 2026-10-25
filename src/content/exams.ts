import type { ExamItem, WrittenTask } from "./types";
import { sections } from "./index";
type ExamSeed = [string, string[], number, string, WrittenTask];
// Unseen transfer prompts: none of these questions repeats a lesson question.
const seeds: ExamSeed[] = [
  [
    "Jännitys ennen esitelmää helpottaa puhumalla opettajalle. Mitä tämä parhaiten osoittaa?",
    [
      "Kaikki jännitys on sairaus.",
      "Avun käyttäminen voi olla toimiva voimavara.",
      "Hyvinvoiva ei koskaan jännitä.",
    ],
    1,
    "Jännitys voi olla tavallista. Tuen hakeminen auttaa säätelemään kuormitusta.",
    {
      prompt:
        "Selitä, miten kouluympäristö voi sekä suojata että kuormittaa mielenterveyttä. Anna molemmista mekanismi ja esimerkki.",
      model:
        "Hyväksyvä ryhmä lisää kuulumista ja antaa tukea. Kiusaaminen heikentää turvallisuutta ja voi kuormittaa unta sekä keskittymistä. Hyvinvointi rakentuu siis myös ympäristöstä.",
      rubric: [
        "Suojaava tekijä ja mekanismi",
        "Kuormittava tekijä ja mekanismi",
        "Ympäristön merkitys yksilön rinnalla",
      ],
    },
  ],
  [
    "Nuori sopii itse bussimatkansa mutta pyytää neuvoa aikuiselta. Mikä tulkinta on paras?",
    [
      "Tuki tarkoittaa epäonnistunutta itsenäistymistä.",
      "Vastuuta voi harjoitella tuen avulla.",
      "Itsenäisyys vaatii läheisten välttämistä.",
    ],
    1,
    "Oma päätös ja tuen käyttäminen voivat toteutua yhtä aikaa.",
    {
      prompt:
        "Vertaile perheen arjen hoivaa ja huoltajan vastuuta. Miksi näitä ei voi päätellä pelkästä biologisesta suhteesta?",
      model:
        "Arjen hoivaa kuvaa sosiaalinen vanhemmuus, huoltajuutta oikeudellinen vastuu lapsen asioista. Biologinen suhde liittyy syntyyn ja perimään; roolit voivat olla samalla tai eri henkilöllä.",
      rubric: [
        "Sosiaalisen hoivan määritelmä",
        "Oikeudellinen vastuu",
        "Biologisen suhteen ja muiden roolien ero",
      ],
    },
  ],
  [
    "Järkytyksen kokenut haluaa välillä puhua, välillä olla hiljaa. Mitä auttaja tekee?",
    [
      "Pakottaa kertomaan kaiken.",
      "Antaa tilaa ja järjestää turvallista tukea.",
      "Päättelee kriisin olevan ohi.",
    ],
    1,
    "Kriisireaktiot vaihtelevat. Tuki ei vaadi pakotettua kertomista.",
    {
      prompt:
        "Arvioi väitettä: ”Kriisistä selviää, kun unohtaa tapahtuman mahdollisimman nopeasti.” Käytä vaihemallia ja tukikeinoja.",
      model:
        "Toipuminen ei ole unohtamisen suoritus. Reaktiot ja käsittely vaihtelevat, ja tapahtuman kanssa voi oppia elämään. Turvalliset ihmiset, arjen rytmi ja tarvittaessa ammattilainen tukevat selviytymistä.",
      rubric: [
        "Vaihtelu ja ei määräaikaa",
        "Käsittely tai uusi suunta",
        "Konkreettiset tukikeinot",
      ],
    },
  ],
  [
    "Käyttö jatkuu pääasiassa huonon olon välttämiseksi. Mikä mekanismi voi selittää?",
    [
      "Riippuvuus on varmasti poistunut.",
      "Käytön tuoma hetkellinen helpotus vahvistaa kehää.",
      "Aine on muuttunut terveelliseksi.",
    ],
    1,
    "Epämukavuuden poistuminen voi ylläpitää toimintaa ilman entistä mielihyvää.",
    {
      prompt:
        "Sovella riippuvuuden kolmea puolta henkilöön, joka kaipaa ainetta, oireilee ilman sitä ja pelkää porukan menettämistä. Ehdota tukea.",
      model:
        "Kaipuu kuvaa psyykkistä, oireilu fyysistä ja porukan pelko sosiaalista riippuvuutta. Tarvitaan ammattilaisen arviota ja hyväksyvää päihteetöntä yhteisöä, ei syyllistämistä.",
      rubric: [
        "Kolme puolta oikein tilanteessa",
        "Yhteisvaikutus tai kehä",
        "Perusteltu turvallinen tuki",
      ],
    },
  ],
  [
    "Verkossa julkaistaan yksi myönteinen kokemus tuntemattomasta tuotteesta. Mitä se todistaa?",
    [
      "Kaikkien tuotteiden turvallisuuden",
      "Koko ikäluokan käyttötavat",
      "Vain kertojan väitteen, ei yleistä turvallisuutta",
    ],
    2,
    "Yksittäinen kertomus ei varmista sisältöä eikä yleistä haitattomuutta.",
    {
      prompt:
        "Selitä kolme erilaista epävarmuutta, jotka tekevät huumausaineen turvallisuuslupauksesta epäluotettavan.",
      model:
        "Sisältö ja vahvuus voivat olla tuntemattomia. Ihmisen terveys ja aiemmat kokemukset muuttavat vaikutusta. Muut aineet ja ympäristö tuovat yhteisvaikutuksia sekä tapaturmariskejä.",
      rubric: [
        "Tuotteen epävarmuus",
        "Ihmisen vaihtelu",
        "Yhteisvaikutus tai ympäristö",
      ],
    },
  ],
  [
    "Keksitty vanha tilasto muuttuu 30 %:sta 24 %:iin. Mikä on oikein?",
    [
      "Lasku on 6 prosenttiyksikköä.",
      "Lasku on 24 prosenttiyksikköä.",
      "Nykyhetken taso on varmasti 24 %.",
    ],
    0,
    "Suora ero on 30 − 24 = 6 prosenttiyksikköä. Vanha luku ei ole nykytilanne.",
    {
      prompt:
        "Arvioi, miten vertaispaine ja väärä käsitys käytön yleisyydestä voivat vahvistaa toisiaan. Ehdota turvallinen katkaisukeino.",
      model:
        "Näkyvä käyttö voi näyttää kaikkien normilta, mikä lisää ulkopuolisuuden pelkoa ja kokeilupainetta. Kun kieltäytyminen hyväksytään ääneen ja tarjotaan muuta tekemistä, turvallinen valinta helpottuu.",
      rubric: [
        "Yleisyyskäsityksen vääristymä",
        "Kuulumisen mekanismi",
        "Konkreettinen suojaava teko",
      ],
    },
  ],
  [
    "Ateriassa on papuja, täysjyvää, kasviksia ja öljyä. Mikä on tarkin arvio?",
    [
      "Vain proteiinilla on merkitystä.",
      "Osat täydentävät energiaa, rakennusaineita ja säätelyä.",
      "Öljy poistaa kaikki muut ravintoaineet.",
    ],
    1,
    "Monipuolinen kokonaisuus tuo eri tehtäviin tarvittavia ravintoaineita.",
    {
      prompt:
        "Selitä, miksi riittävä energiansaanti, proteiini ja D-vitamiini eivät korvaa toisiaan kasvavan nuoren ravinnossa.",
      model:
        "Energia ylläpitää elintoimintoja ja kasvua. Proteiini rakentaa ja korjaa kudoksia. D-vitamiini tukee kalsiumin aineenvaihduntaa ja luustoa mutta ei tuota energiaa. Eri tehtävät vaativat monipuolisuutta.",
      rubric: [
        "Energiantarpeen tehtävä",
        "Proteiinin tehtävä",
        "D-vitamiinin erillinen tehtävä",
      ],
    },
  ],
  [
    "Gluteeniton leivonnainen sisältää maitoa. Kenelle se ei ole automaattisesti sopiva?",
    [
      "Maitoallergiselle",
      "Ihmiselle, joka pitää leivonnaisista",
      "Kaikille, joilla ei ole allergiaa",
    ],
    0,
    "Gluteenittomuus ei tarkoita maidottomuutta. Rajaukset koskevat eri aineita.",
    {
      prompt:
        "Vertaile maitoallergiaa, laktoosi-intoleranssia ja keliakiaa niin, että keittiö ymmärtää, miksi sama merkintä ei riitä kaikille.",
      model:
        "Maitoallergia liittyy proteiiniin, laktoosi-intoleranssi maitosokerin pilkkomiseen ja keliakia gluteenin autoimmuunivaikutukseen. Laktoositon voi sisältää maitoproteiinia ja gluteeniton maitoa; ainesosat ja valmistus on tarkistettava.",
      rubric: [
        "Kolme ainetta ja mekanismia",
        "Merkintöjen erot",
        "Turvallinen tarkistus tai ristikosketus",
      ],
    },
  ],
  [
    "Oppilas vaihtaa pelistä videoon samassa asennossa. Mitä istumisen suhteen tapahtuu?",
    [
      "Paikallaanolo ei välttämättä katkea.",
      "Lihasten työ vastaa automaattisesti kävelyä.",
      "Kaikki kuormitus loppuu.",
    ],
    0,
    "Sisältö vaihtuu, mutta asento ja paikallaanolo voivat jatkua ennallaan.",
    {
      prompt:
        "Suunnittele opiskeluilta, jossa on sekä keskittymistä että paikallaanolon katkaisuja. Perustele ympäristön ja tapojen merkitys.",
      model:
        "Säädän työpisteen sopivaksi ja jaan opiskelun jaksoihin. Jakson vaihto muistuttaa nousemaan tai liikkumaan itselle sopivasti. Näkyvä muistutus ja helpot välineet tukevat tapaa; hyväkin työpiste tarvitsee vaihtelua.",
      rubric: [
        "Konkreettinen työpiste",
        "Tauon vihje ja teko",
        "Vaihtelun ja ympäristön perustelu",
      ],
    },
  ],
  [
    "Veteen joutunutta voi auttaa heittämällä renkaan turvalliselta rannalta. Mikä on tärkein peruste?",
    [
      "Auttaja säilyttää oman turvallisuutensa.",
      "Hätäpuhelua ei enää tarvita koskaan.",
      "Hypotermia ei ole vedessä mahdollinen.",
    ],
    0,
    "Turvallinen välineapu vähentää lisäuhrin riskiä. Se ei poista muun avun tarvetta.",
    {
      prompt:
        "Sovella auttajan turvallisuutta tilanteeseen, jossa kylmässä vedessä oleva henkilö on kaukana rannasta. Perustele hälytys ja omat rajat.",
      model:
        "Soitan 112, kutsun muita ja opastan ammattiavun. En mene vaaralliseen veteen ilman osaamista ja välineitä. Turvallinen välineapu tehdään rannalta, jos mahdollista, koska auttajan hukkuminen pahentaisi tilannetta.",
      rubric: [
        "112 ja avun organisointi",
        "Oman turvallisuuden rajat",
        "Perusteltu välineapu tai opastus",
      ],
    },
  ],
  [
    "AED ilmoittaa, ettei iskua suositella, mutta autettava ei hengitä normaalisti. Mitä teet?",
    [
      "Lopetan ja poistun.",
      "Jatkan elvytystä laitteen ja 112:n ohjeiden mukaan.",
      "Annan vettä.",
    ],
    1,
    "Iskun puuttuminen ei osoita toipumista. Laite ohjaa jatkamaan asianmukaista elvytystä.",
    {
      prompt:
        "Vertaile kahta heräämätöntä aikuista: A hengittää tasaisesti, B vain haukkoo. Kuvaa toiminnan ero ja yhteiset osat.",
      model:
        "Molemmissa varmistan turvallisuuden, soitan 112 ja avaan hengitystien. A käännetään kylkiasentoon ja hengitystä seurataan. B ei hengitä normaalisti, joten aloitan elvytyksen ja käytän saatavilla olevaa AED:tä ohjeilla.",
      rubric: [
        "Yhteinen hälytys ja hengitystie",
        "Normaali hengitys ja kylkiasento",
        "Haukkova hengitys ja elvytys",
      ],
    },
  ],
  [
    "Diabeetikko on sekava eikä pysty nielemään varmasti. Mikä on turvallista?",
    [
      "Juoma väkisin suuhun",
      "112 ja hengityksen sekä tajunnan seuranta ilman suuhun annettavaa",
      "Lisäinsuliini omin päin",
    ],
    1,
    "Turvaton nieleminen aiheuttaa tukehtumisvaaran. Kiireellinen apu on tärkeää.",
    {
      prompt:
        "Arvioi, miksi kohtauksen syytä ei tarvitse tietää varmasti ennen avun hälyttämistä. Käytä FASTia ja kouristelua esimerkkeinä.",
      model:
        "Viivyttely voi vaarantaa aivot ja hengityksen. FAST-merkki riittää 112-soittoon ilman diagnoosia. Tuntemattoman kouristelun syy voi olla vakava, joten hälytän ja suojaan henkilöä sen sijaan että arvaan hoitoa.",
      rubric: [
        "Viivytyksen vaara",
        "FAST-havainto riittää",
        "Tuntematon kouristelu ja turvallinen toiminta",
      ],
    },
  ],
  [
    "Runsaan vuodon jälkeen autettava on kylmänhikinen ja janoinen. Mikä on paras tulkinta?",
    [
      "Jano todistaa, että juoma on tärkein hoito.",
      "Sokki on mahdollinen; hillitse vuoto ja hälytä 112.",
      "Verenvuoto ei enää merkitse mitään.",
    ],
    1,
    "Merkit voivat liittyä verenkierron heikkenemiseen. Vuodon hallinta ja kiireellinen apu ovat keskeisiä.",
    {
      prompt:
        "Selitä, miksi näkyvän vuodon painaminen ja lämpimänä pitäminen ovat hyödyllisiä mutta eivät korvaa 112-soittoa vakavassa tilanteessa.",
      model:
        "Paine vähentää veren menetystä ja lämpö suojaa lisäjäähtymiseltä. Jo menetetty veri tai sisäinen vamma voi silti aiheuttaa sokin. Tarvitaan ammattiapua sekä hengityksen ja voinnin seurantaa.",
      rubric: [
        "Paineen mekanismi",
        "Lämmön tehtävä",
        "Jäljelle jäävä vaara ja ammattiapu",
      ],
    },
  ],
];
export const examItems: ExamItem[] = sections.map((s, i) => {
  const [prompt, options, correct, explanation, written] = seeds[i];
  return {
    id: `exam-${s.id}`,
    sectionId: s.id,
    lessonId: s.lessons[0].id,
    choice: {
      id: `exam-${s.id}-choice`,
      prompt,
      options,
      correct,
      explanation,
    },
    written,
  };
});
export interface ExamQuestion {
  id: string;
  sectionId: string;
  lessonId: string;
  kind: "choice" | "written";
  item: ExamItem;
}
export function makeExam(minutes: 15 | 40, seed: number): ExamQuestion[] {
  const shift = Math.abs(Math.floor(seed)) % sections.length;
  const ordered = [...examItems.slice(shift), ...examItems.slice(0, shift)];
  return ordered.flatMap((item, i) => {
    const common = { sectionId: item.sectionId, lessonId: item.lessonId, item };
    return minutes === 40
      ? [
          { ...common, id: `${item.id}-choice`, kind: "choice" as const },
          { ...common, id: `${item.id}-written`, kind: "written" as const },
        ]
      : [
          {
            ...common,
            id: `${item.id}-${i % 3 === 2 ? "written" : "choice"}`,
            kind: i % 3 === 2 ? ("written" as const) : ("choice" as const),
          },
        ];
  });
}
