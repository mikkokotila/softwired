import { lesson, type Section } from "./types";
const addiction = {
  pdf: [15, 17] as [number, number],
  book: [66, 68] as [number, number],
};
const drugs = {
  pdf: [18, 23] as [number, number],
  book: [69, 74] as [number, number],
};
const social = {
  pdf: [24, 26] as [number, number],
  book: [75, 77] as [number, number],
};
export const substances: Section[] = [
  {
    id: "5.1",
    title: "Riippuvuus – mielihyvästä mielipahaa",
    description: "Palkitseminen, tottuminen ja riippuvuuden kehä.",
    group: "Päihteet ja valinnat",
    color: "peach",
    source: addiction,
    lessons: [
      lesson("5.1", 1, {
        title: "Palkitseva kokemus opettaa toistamaan",
        hook: "Pelin palkinto saa palaamaan vielä kerran. Miksi välitön mielihyvä voi ohjata toimintaa?",
        paragraphs: [
          "Aivojen palkitsemisjärjestelmä auttaa oppimaan, mikä kannattaa toistaa. Esimerkiksi ruoka, yhdessäolo ja onnistuminen voivat tuntua palkitsevilta. Dopamiini osallistuu palkkioiden odottamiseen, oppimiseen ja motivaatioon. Se ei ole yksinkertainen onnellisuusmittari. Palkitsevuus on normaali osa elämää eikä jokainen mieluisa tapa ole riippuvuus.",
          "Päihde tai toiminta voi kuitenkin alkaa hallita valintoja, jos nopeaa palkkiota tavoitellaan toistuvasti haitoista huolimatta. Välittömän helpotuksen merkitys voi kasvaa, vaikka koulunkäynti, uni tai ihmissuhteet kärsivät. Nuoren kehittyvät aivot ja ympäristön vaikutus tekevät ehkäisystä tärkeää. Riippuvuutta ymmärretään sekä oppimisen, elimistön että sosiaalisen ympäristön kautta, ei pelkkänä huonona luonteena.",
        ],
        diagram: {
          title: "Oppimisen palkkiokehä",
          steps: [
            "Vihje tai odotus",
            "Toiminta",
            "Nopea palkkio",
            "Toistamisen halu vahvistuu",
          ],
        },
        example:
          "Ilmoitus puhelimessa toimii vihjeenä. Tarkistaminen tuo joskus kiinnostavan viestin, mikä voi vahvistaa jatkuvaa tarkistamista.",
        terms: [
          {
            word: "Palkitsemisjärjestelmä",
            definition:
              "Aivojen verkosto, joka osallistuu motivoitumiseen ja palkkioista oppimiseen.",
          },
          {
            word: "Dopamiini",
            definition:
              "Välittäjäaine, joka osallistuu muun muassa motivaatioon ja palkkio-oppimiseen.",
          },
        ],
        recall: {
          prompt: "Selitä, miten palkitsevuus voi vahvistaa toimintatapaa.",
          model:
            "Nopeasti palkitseva kokemus opettaa odottamaan palkkiota ja toistamaan toimintaa. Toistaminen ei silti yksin tarkoita riippuvuutta.",
          rubric: [
            "Palkkio vahvistaa toistamista",
            "Tapa ja riippuvuus erotettu",
          ],
        },
        questions: [
          [
            "Mikä tekee palkitsemisjärjestelmästä hyödyllisen?",
            [
              "Se estää kaiken toistamisen.",
              "Se auttaa oppimaan hyödyllisiä toimintatapoja.",
              "Se toimii vain päihteitä käytettäessä.",
            ],
            1,
            "Myös tavalliset tarpeet ja onnistumiset ovat palkitsevia. Järjestelmä on normaali osa oppimista.",
          ],
          [
            "Mikä on riippuvuuden kannalta huolestuttavaa?",
            [
              "Harrastuksesta nauttiminen",
              "Toiminnan jatkuminen merkittävistä haitoista huolimatta",
              "Yksittäinen mielihyvän kokemus",
            ],
            1,
            "Haitat ja hallinnan heikentyminen ovat olennaisia. Mielihyvä itsessään ei ole riippuvuuden todiste.",
          ],
        ],
        application: {
          prompt:
            "Selitä pelin palkintoihin liittyvä toistamisen kehä ilman väitettä, että kaikki pelaaminen olisi riippuvuutta.",
          model:
            "Palkinnon odotus voi houkutella avaamaan pelin ja saatu palkinto vahvistaa tapaa. Huolestuttavaa on, jos hallinta katoaa ja uni tai koulu kärsivät. Tavallinen hallittu harrastus ei ole sama asia.",
          rubric: [
            "Odotus, toiminta ja palkkio yhdistetty",
            "Haittojen ja hallinnan merkitys",
            "Ei yleistystä kaikesta pelaamisesta",
          ],
        },
        source: addiction,
      }),
      lesson("5.1", 2, {
        title: "Riippuvuus voi liittyä aineeseen tai toimintaan",
        hook: "Yksi ei pysty lopettamaan nikotiinin käyttöä, toinen jatkaa rahapelaamista haitoista huolimatta. Mikä on yhteistä?",
        paragraphs: [
          "Aineriippuvuus liittyy päihdyttävään tai muuten riippuvuutta aiheuttavaan aineeseen, kuten nikotiiniin. Toiminnallinen riippuvuus liittyy käyttäytymiseen, kuten rahapelaamiseen. Keskeistä on hallinnan heikentyminen: ihminen ei kykene säätelemään toimintaa suunnittelemallaan tavalla, ja toiminta saa liian suuren merkityksen muun elämän kustannuksella.",
          "Runsas tekeminen tai kiinnostus ei yksin riitä riippuvuuden määritelmäksi. Huomio kohdistuu haittoihin, pakonomaisuuteen ja lopettamisen vaikeuteen. Riippuvuus voi vaikuttaa uneen, rahaan, terveyteen ja ihmissuhteisiin. Riippuvuudesta kärsivää kannattaa kohdata arvostavasti ja ohjata avun piiriin. Pelkkä käsky ryhdistäytyä ei huomioi tottumista, opittuja toimintaketjuja tai ympäristön vaikutusta.",
        ],
        diagram: {
          title: "Määrän lisäksi kysy",
          steps: [
            "Säilyykö hallinta?",
            "Syntyykö haittoja?",
            "Jatkuuko toiminta niistä huolimatta?",
          ],
        },
        example:
          "Kaksi nuorta pelaa yhtä kauan. Toinen pystyy lopettamaan sovitusti; toinen menettää toistuvasti yöunensa eikä pysty vähentämään. Aikamäärä ei yksin kerro samaa tilannetta.",
        terms: [
          {
            word: "Aineriippuvuus",
            definition:
              "Riippuvuus, jossa tietyn aineen käyttöä on vaikea hallita.",
          },
          {
            word: "Toiminnallinen riippuvuus",
            definition:
              "Riippuvuus tietystä käyttäytymisestä merkittävistä haitoista huolimatta.",
          },
        ],
        recall: {
          prompt: "Vertaile aineriippuvuutta ja toiminnallista riippuvuutta.",
          model:
            "Aineriippuvuudessa kohteena on aine, toiminnallisessa käyttäytyminen. Molemmissa hallinta voi heikentyä ja toiminta jatkua haitoista huolimatta.",
          rubric: ["Eri kohteet", "Yhteinen hallinnan heikentyminen ja haitat"],
        },
        questions: [
          [
            "Mikä esimerkki kuvaa toiminnallista riippuvuutta?",
            [
              "Hallittu viikoittainen lautapeli",
              "Pakonomaiseksi muuttunut rahapelaaminen",
              "Nikotiinin aiheuttama riippuvuus",
            ],
            1,
            "Rahapelaaminen on toimintaa. Nikotiini liittyy aineeseen, ja hallittu harrastus ei itsessään ole riippuvuus.",
          ],
          [
            "Voiko riippuvuuden päätellä vain ajankäytöstä?",
            [
              "Kyllä, aina yhdellä tuntirajalla.",
              "Ei; hallintaa ja haittoja pitää myös arvioida.",
              "Ei koskaan tarvitse arvioida haittoja.",
            ],
            1,
            "Kokonaisuus ratkaisee. Pelkkä määrä ei osoita, miten toiminta vaikuttaa elämään ja hallintaan.",
          ],
        ],
        application: {
          prompt:
            "Arvioi väitettä: ”Riippuvuus on vain huonoa itsekuria.” Anna kaksi perustetta.",
          model:
            "Väite on liian yksinkertainen. Palkkio-oppiminen ja elimistön tottuminen voivat vahvistaa käyttöä. Myös ympäristö ja sosiaaliset suhteet ylläpitävät tapaa. Tuki ja hoito ovat siksi tärkeämpiä kuin syyllistäminen.",
          rubric: [
            "Torjut yksinkertaistuksen",
            "Biologinen tai oppimisen mekanismi",
            "Ympäristö ja avun merkitys",
          ],
        },
        source: addiction,
      }),
      lesson("5.1", 3, {
        title: "Psyykkinen, fyysinen ja sosiaalinen riippuvuus",
        hook: "Käyttöä jatketaan halun, kehon oireiden ja kaveriporukan vuoksi. Ovatko nämä sama asia?",
        paragraphs: [
          "Psyykkisessä riippuvuudessa aine tai toiminta tuntuu välttämättömältä esimerkiksi mielihyvän, rauhoittumisen tai tunteiden säätelyn vuoksi. Ajatukset voivat kiertyä sen ympärille. Fyysisessä riippuvuudessa elimistö on sopeutunut aineeseen niin, että vähentäminen tai lopettaminen aiheuttaa vieroitusoireita. Oireet vaihtelevat aineen ja tilanteen mukaan; lopettamisen turvallisuuteen voidaan tarvita ammattilaisen neuvoa.",
          "Sosiaalinen riippuvuus liittyy ihmissuhteisiin ja ryhmän tapoihin. Käytöstä luopuminen voi tuntua vaikealta, jos pelkää jäävänsä ulkopuolelle. Kolme puolta voivat esiintyä yhtä aikaa ja vahvistaa toisiaan. Siksi auttaminen voi tarvita sekä terveydenhuoltoa, tunnetaitoja että päihteettömiä yhteisöjä. Fyysisten oireiden puuttuminen ei todista, ettei riippuvuutta voisi olla.",
        ],
        diagram: {
          title: "Kolme toisiaan vahvistavaa puolta",
          steps: [
            "Mieli: kaipuu ja odotukset",
            "Keho: sopeutuminen ja oireet",
            "Yhteisö: tavat ja kuuluminen",
          ],
        },
        example:
          "Nuori kaipaa nikotiinin tuomaa taukoa, kokee ilman sitä ärtyisyyttä ja tapaa kavereita käyttötilanteessa. Sama tilanne sisältää useita riippuvuuden puolia.",
        terms: [
          {
            word: "Vieroitusoire",
            definition:
              "Elimistön sopeutumiseen liittyvä oire käytön vähentyessä tai loppuessa.",
          },
          {
            word: "Sosiaalinen riippuvuus",
            definition:
              "Ryhmän ja ihmissuhteiden ylläpitämä sidonnaisuus käyttöön tai toimintaan.",
          },
        ],
        recall: {
          prompt:
            "Erota riippuvuuden kolme puolta yhdellä esimerkillä kustakin.",
          model:
            "Psyykkinen: kaipaan toimintaa rauhoittuakseni. Fyysinen: lopettamisesta tulee vieroitusoireita. Sosiaalinen: pelkään menettäväni käyttöön liittyvän porukan.",
          rubric: [
            "Mieli ja fyysinen sopeutuminen erotettu",
            "Ryhmän merkitys nimetty",
          ],
        },
        questions: [
          [
            "Käytön lopettamisesta tuleva kehon oire liittyy etenkin…",
            [
              "fyysiseen riippuvuuteen.",
              "vain sosiaaliseen riippuvuuteen.",
              "aina allergiaan.",
            ],
            0,
            "Fyysinen riippuvuus tarkoittaa elimistön sopeutumista ja mahdollisia vieroitusoireita.",
          ],
          [
            "Mikä tukee erityisesti sosiaalisen riippuvuuden purkamista?",
            [
              "Uudet päihteettömät yhdessäolon tavat",
              "Oireiden vähättely",
              "Kaikista ihmisistä eristäytyminen",
            ],
            0,
            "Yhteisö ja hyväksyntä ilman käyttöä vähentävät ulkopuolelle jäämisen pelkoa.",
          ],
        ],
        application: {
          prompt:
            "Kuvitteellinen henkilö sanoo: ”En käytä yksin, joten en voi olla riippuvainen.” Arvioi perustelua.",
          model:
            "Ryhmässä käyttäminen ei sulje riippuvuutta pois. Porukan tavat ja ulkopuolelle jäämisen pelko voivat ylläpitää sosiaalista riippuvuutta. Lisäksi psyykkinen ja fyysinen riippuvuus voivat esiintyä samanaikaisesti.",
          rubric: [
            "Virheellinen johtopäätös tunnistettu",
            "Sosiaalinen mekanismi selitetty",
            "Useat puolet voivat yhdistyä",
          ],
        },
        source: addiction,
      }),
      lesson("5.1", 4, {
        title: "Toleranssi voi ylläpitää haitallista kehää",
        hook: "Sama aine ei enää tunnu samalta kuin alussa. Tarkoittaako tottuminen, että siitä tuli turvallinen?",
        paragraphs: [
          "Toleranssi tarkoittaa vaikutuksen heikkenemistä toistuvan käytön myötä: elimistö sopeutuu aineeseen. Se ei tarkoita suojaa kaikilta haitoilta. Aineen eri vaikutuksiin voi kehittyä erilaista toleranssia, eikä oma kokemus kerro tuotteen koostumuksesta tai turvallisuudesta. Käytön lisääminen voi kasvattaa haittoja, eikä tottuminen tee riskistä hallittavaa.",
          "Riippuvuuden kehässä käyttö voi aluksi tavoitella mielihyvää ja myöhemmin helpottaa käytön puuttumisesta syntyvää huonoa oloa. Helpotus vahvistaa uutta käyttöä, vaikka alkuperäinen ongelma pahenee. Kehää voi katkaista tunnistamalla vihjeitä, muuttamalla tilanteita ja hakemalla ammattilaisen tukea. Retkahdus ei tee ihmisestä toivotonta; se kertoo tarpeesta tarkistaa tukikeinoja. Nuoren ei pidä suunnitella riskialttiin vieroituksen hoitoa yksin.",
        ],
        diagram: {
          title: "Helpotus voi ylläpitää ongelmaa",
          steps: [
            "Käyttö",
            "Sopeutuminen",
            "Ilman käyttöä paha olo",
            "Uusi käyttö helpottaa hetkeksi",
          ],
        },
        example:
          "”Tarvitsen tätä voidakseni normaalisti” voi kuvata kehittynyttä riippuvuutta, ei sitä että aine olisi ratkaisu kaikkiin tarpeisiin.",
        terms: [
          {
            word: "Toleranssi",
            definition:
              "Saman aineen vaikutuksen heikkeneminen elimistön sopeutuessa toistuvaan käyttöön.",
          },
          {
            word: "Vahvistuminen",
            definition:
              "Toiminnan toistumisen lisääntyminen palkkion tai epämukavuuden helpottumisen vuoksi.",
          },
        ],
        recall: {
          prompt: "Miksi toleranssi ei tarkoita turvallisuutta?",
          model:
            "Koettu vaikutus voi heiketä, mutta haitat eivät katoa. Käytön lisääminen voi kasvattaa vaaraa, ja eri vaikutuksiin sopeudutaan eri tavoin.",
          rubric: [
            "Vaikutuksen heikkeneminen määritelty",
            "Haitat ja riski säilyvät",
          ],
        },
        questions: [
          [
            "Toleranssi tarkoittaa, että…",
            [
              "kaikki haitat loppuvat.",
              "sama aine vaikuttaa aiempaa vähemmän.",
              "riippuvuus on varmasti ohi.",
            ],
            1,
            "Sopeutuminen heikentää koettua vaikutusta. Se ei poista haittoja tai riippuvuutta.",
          ],
          [
            "Mikä voi ylläpitää riippuvuutta mielihyvän vähentyessä?",
            [
              "Vieroitusoireiden hetkellinen helpottuminen käytöllä",
              "Varmasti parantunut terveys",
              "Se, että käytöllä ei ole mitään vaikutuksia",
            ],
            0,
            "Epämukavuuden helpottuminen voi vahvistaa käyttöä, vaikka varsinainen mielihyvä olisi vähentynyt.",
          ],
        ],
        application: {
          prompt:
            "Selitä syy-seurausketjuna, miksi käyttö voi jatkua vaikka se ei enää tuota entistä iloa. Nimeä yksi turvallinen tukikeino.",
          model:
            "Elimistö sopeutuu ja ilman ainetta voi tulla huono olo. Käyttö helpottaa sitä hetkeksi, mikä vahvistaa toimintaa. Kouluterveydenhoitajalta tai päihdetyön ammattilaiselta voi hakea apua kierteen katkaisemiseen.",
          rubric: [
            "Sopeutuminen ja huono olo",
            "Helpotus vahvistaa käyttöä",
            "Turvallinen avun lähde",
          ],
        },
        source: addiction,
      }),
    ],
  },
  {
    id: "5.2",
    title: "Arvaamattomat huumausaineet",
    description: "Vaikutusryhmät, haitat ja kriittinen arviointi.",
    group: "Päihteet ja valinnat",
    color: "peach",
    source: drugs,
    lessons: [
      lesson("5.2", 1, {
        title: "Vaikutusryhmä ei ennusta koko riskiä",
        hook: "Viestissä luvataan, että tietty aine ”vain rentouttaa”. Miksi tämä tieto ei riitä turvallisuuden arviointiin?",
        paragraphs: [
          "Huumausaineet vaikuttavat keskushermostoon eli aivoihin ja selkäytimeen. Vaikutuksia kuvataan esimerkiksi lamaavina, kiihdyttävinä ja aistimuksia muuttavina. Luokittelu on karkea: sama aine voi aiheuttaa useita vaikutuksia, ja ihmisen tila sekä käytön olosuhteet muuttavat niitä. Vaikutusryhmä ei tarkoita turvallisuusluokkaa.",
          "Muuntohuume tarkoittaa kemiallisesti muokattua päihdyttävää ainetta; nimi ei lupaa tutkittua turvallisuutta tai lain ulkopuolelle jäämistä. Myös lääkkeiden käyttö vastoin hoito-ohjetta voi olla vaarallista. Haihtuvien aineiden päihdekäyttö eli imppaaminen voi vaurioittaa hermostoa ja aiheuttaa hengenvaarallisia hengityksen tai sydämen toiminnan häiriöitä. Näitä aineita ei kokeilla päihtymistarkoituksessa.",
          "Laittomasti hankitun tuotteen sisältöä tai vahvuutta ei voi varmistaa nimestä, ulkonäöstä tai myyjän lupauksesta. Myös yhteisvaikutukset voivat olla arvaamattomia. Haittoja voivat olla riippuvuus, mielenterveyden ongelmat, tapaturmat ja hengenvaaralliset myrkytykset. Tuntemattoman aineen kokeileminen ei ole luotettava tutkimuskeino. Jos henkilö ei herää tai hengitys on poikkeavaa, kyse on kiireellisestä avun tarpeesta: soita 112.",
        ],
        diagram: {
          title: "Riski on usean asian summa",
          steps: [
            "Aine ja tuntematon sisältö",
            "Ihmisen terveydentila",
            "Muut aineet",
            "Tilanne ja ympäristö",
          ],
        },
        example:
          "Kaksi samannäköistä tuotetta ei välttämättä sisällä samoja aineita. Toisen kokemus ei varmista seuraavan tilanteen turvallisuutta.",
        terms: [
          {
            word: "Keskushermosto",
            definition:
              "Aivot ja selkäydin, jotka käsittelevät tietoa ja ohjaavat toimintaa.",
          },
          {
            word: "Yhteisvaikutus",
            definition:
              "Aineiden samanaikaisen vaikutuksen muuttuminen verrattuna yksittäisiin vaikutuksiin.",
          },
        ],
        recall: {
          prompt:
            "Nimeä kolme syytä, miksi huumausaineen vaikutusta on vaikea ennustaa.",
          model:
            "Sisältö tai vahvuus voi olla tuntematon, ihmisten terveydentila vaihtelee ja muut aineet voivat muuttaa vaikutusta.",
          rubric: ["Tuotteen epävarmuus", "Ihmisen ja tilanteen vaihtelu"],
        },
        questions: [
          [
            "Mitä aineen vaikutusryhmä kertoo?",
            [
              "Kaikki riskit varmasti",
              "Karkean päävaikutuksen, ei koko turvallisuutta",
              "Sen, että tuotteen sisältö tunnetaan",
            ],
            1,
            "Luokittelu auttaa jäsentämään, mutta ei varmista sisältöä tai yksilöllistä vaikutusta.",
          ],
          [
            "Kaveri ei herää tuntemattoman aineen jälkeen. Mitä teet?",
            [
              "Odotan yön yli.",
              "Annan hänen nukkua yksin.",
              "Soitan 112 ja noudatan ohjeita.",
            ],
            2,
            "Heräämättömyys voi olla hengenvaarallinen myrkytys. Avun saamista ei saa viivyttää.",
          ],
        ],
        application: {
          prompt:
            "Arvioi väitettä: ”Tuotteen nimi kertoo varmasti, mitä tapahtuu.” Käytä kahta eri perustetta.",
          model:
            "Nimi ei varmista sisältöä tai vahvuutta. Lisäksi ihmisen terveydentila ja yhteisvaikutukset muuttavat vaikutusta. Siksi kokemuksiin tai myyjän lupaukseen ei voi perustaa turvallisuutta.",
          rubric: [
            "Sisällön epävarmuus",
            "Yksilöllisyys tai yhteisvaikutukset",
            "Perusteltu johtopäätös",
          ],
        },
        source: drugs,
      }),
      lesson("5.2", 2, {
        title: "Lamaava ja kiihdyttävä eivät kumoa toisiaan",
        hook: "Joku väittää, että kaksi vastakkaista vaikutusta tasapainottaa riskin. Miksi väite on vaarallinen?",
        paragraphs: [
          "Keskushermostoa lamaavat aineet hidastavat hermoston toimintaa. Esimerkiksi opioidit voivat heikentää tajuntaa ja hengitystä. Kiihdyttävät aineet eli stimulantit voivat lisätä vireyttä mutta myös kuormittaa sydäntä, nostaa kehon lämpöä ja lisätä levottomuutta. Se, että ihminen kokee olonsa energiseksi, ei tarkoita elimistön olevan turvassa.",
          "Eri tavoin vaikuttavat aineet eivät tee toisistaan turvallisia. Yksi vaikutus voi peittää toisen tuntomerkkejä, samalla kun haitat jatkuvat. Haittoihin vaikuttavat myös terveydentila ja tuntematon sisältö. Oppitunnin tarkoitus on tunnistaa vaarallisia väitteitä, ei opettaa käyttöä. Vakavissa oireissa, kuten tajunnan heikkenemisessä, poikkeavassa hengityksessä tai rintakivussa, tarvitaan nopeasti ammattiapua numerosta 112.",
        ],
        diagram: {
          title: "Kaksi eri riskisuuntaa",
          steps: [
            "Lamaava: tajunta ja hengitys voivat heikentyä",
            "Kiihdyttävä: sydän ja lämmönsäätely kuormittuvat",
            "Yhdistelmä: riski ei nollaannu",
          ],
        },
        example:
          "Vireältä näyttävä henkilö voi silti olla vaarassa. Ulkoinen vaikutelma ei mittaa hengityksen tai verenkierron turvallisuutta.",
        terms: [
          {
            word: "Opioidi",
            definition:
              "Aineryhmä, jonka vaikutuksiin voi kuulua kivunlievitys sekä vaarallinen hengityksen lamaantuminen.",
          },
          {
            word: "Stimulantti",
            definition: "Keskushermostoa kiihdyttävä aine.",
          },
        ],
        recall: {
          prompt:
            "Vertaile lamaavien ja kiihdyttävien aineiden keskeisiä vaaroja.",
          model:
            "Lamaavat aineet voivat heikentää tajuntaa ja hengitystä. Kiihdyttävät voivat kuormittaa sydäntä ja lämmönsäätelyä. Yhdistäminen ei kumoa vaaroja.",
          rubric: [
            "Hengityksen ja tajunnan heikkeneminen",
            "Sydämen kuormitus",
            "Ei kumoutumista",
          ],
        },
        questions: [
          [
            "Mikä on opioidien vakava riski?",
            [
              "Hengityksen lamaantuminen",
              "Varmasti parantunut keskittyminen",
              "Kaikkien myrkytysten estyminen",
            ],
            0,
            "Hengityksen heikkeneminen voi johtaa hengenvaaralliseen hapenpuutteeseen.",
          ],
          [
            "Miksi vastakkaisten vaikutusten yhdistäminen on vaarallista?",
            [
              "Vaikutukset poistavat aina toisensa.",
              "Oireet voivat peittyä, mutta haitat jatkuvat.",
              "Yhdistelmän sisältö muuttuu tunnetuksi.",
            ],
            1,
            "Koettu olo ei mittaa kaikkia vaikutuksia. Yhdistelmä ei takaa turvallisuutta.",
          ],
        ],
        application: {
          prompt:
            "Kumoa perustellusti väite ”virkistävä aine korjaa lamaavan aineen haitat” ilman käyttöohjeita.",
          model:
            "Aineet eivät toimi turvallisina vastalääkkeinä. Virkeä olo voi peittää vaaran tunteen, vaikka hengitys tai verenkierto on kuormittunut. Vakavat oireet vaativat 112:n apua, eivät uutta ainetta.",
          rubric: [
            "Ei turvallista vastavaikutusta",
            "Koettu olo ja elimistön tila erotettu",
            "Turvallinen avun hakeminen",
          ],
        },
        source: drugs,
      }),
      lesson("5.2", 3, {
        title: "Aistien muuttuminen voi tehdä tilanteesta turvattoman",
        hook: "Luonnosta peräisin olevaa ainetta mainostetaan vaarattomana. Takaako alkuperä turvallisuuden?",
        paragraphs: [
          "Hallusinogeenit voivat muuttaa aistihavaintoja, ajantajua ja kokemusta ympäristöstä. Hallusinaatio tarkoittaa aistimusta ilman vastaavaa ulkoista ärsykettä. Kokemus voi aiheuttaa pelkoa, paniikkia ja vaarallisia toimintavalintoja. Vaikutusta ei voi ennustaa pelkän odotuksen tai aiemman kokemuksen perusteella.",
          "Kannabis voi vaikuttaa muun muassa tarkkaavaisuuteen, muistiin, koordinaatioon ja mielialaan. Osalle se voi aiheuttaa voimakasta ahdistusta tai psykoottisia oireita; riippuvuuden riski on myös olemassa. Nuoren oppiminen ja turvallinen liikkuminen voivat heikentyä. Luonnollisuus ei tarkoita haitattomuutta, ja tuotteiden pitoisuudet vaihtelevat. Oppikirjan vanhoista kuvauksista ei pidä päätellä nykyisten tuotteiden vahvuutta tai tämänhetkisiä oikeudellisia yksityiskohtia.",
        ],
        diagram: {
          title: "Havainto → tulkinta → teko",
          steps: [
            "Aistimus muuttuu",
            "Tilanne voidaan tulkita väärin",
            "Tapaturman ja paniikin riski kasvaa",
          ],
        },
        example:
          "Jos etäisyys tai ajankulku koetaan väärin, tien ylittäminen voi muuttua vaaralliseksi, vaikka ihminen itse kokisi olevansa hallinnassa.",
        terms: [
          {
            word: "Hallusinaatio",
            definition: "Aistimus, jolle ei ole vastaavaa ulkoista ärsykettä.",
          },
          {
            word: "Koordinaatio",
            definition:
              "Liikkeiden ja eri toimintojen sujuva yhteensovittaminen.",
          },
        ],
        recall: {
          prompt: "Miksi luonnollisuus ei ole päihteen turvallisuuden peruste?",
          model:
            "Myös luonnosta peräisin olevat aineet vaikuttavat aivoihin ja voivat aiheuttaa haittoja. Vaikutus, pitoisuus ja yksilöllinen tilanne ratkaisevat, eivät markkinointisanat.",
          rubric: [
            "Alkuperä ei poista vaikutuksia",
            "Haitat tai vaihtelu perusteltu",
          ],
        },
        questions: [
          [
            "Mikä on hallusinaatio?",
            [
              "Tarkka havainto todellisesta vaarasta",
              "Aistimus ilman vastaavaa ulkoista ärsykettä",
              "Aina pelkkä muistikuva",
            ],
            1,
            "Hallusinaatiossa aistimuksen taustalla ei ole vastaavaa ulkoista ärsykettä.",
          ],
          [
            "Mikä väite kannabiksesta on perusteltu?",
            [
              "Se ei voi aiheuttaa riippuvuutta.",
              "Luonnollinen alkuperä poistaa riskit.",
              "Se voi heikentää muistia ja tarkkaavaisuutta.",
            ],
            2,
            "Aivoihin kohdistuvat vaikutukset voivat haitata oppimista ja toimintaa. Riippuvuus ja muut haitat ovat mahdollisia.",
          ],
        ],
        application: {
          prompt:
            "Selitä, miksi aistien tai tarkkaavaisuuden muutos kasvattaa tapaturmariskiä. Liitä mukaan esimerkki.",
          model:
            "Ympäristön arviointi ja reagointi heikkenevät, jolloin vaaroja ei huomata ajoissa. Esimerkiksi liikenteessä etäisyyden väärä tulkinta tai hidastunut huomio voi johtaa onnettomuuteen.",
          rubric: [
            "Havainnon tai huomion muutos",
            "Syy-yhteys toimintaan",
            "Konkreettinen turvallisuusesimerkki",
          ],
        },
        source: drugs,
      }),
      lesson("5.2", 4, {
        title: "Päihdeväitteen arviointi tarvitsee näyttöä",
        hook: "”Kaikki käyttävät eikä kenellekään tapahdu mitään.” Miten purat lauseen kahdeksi tutkittavaksi väitteeksi?",
        paragraphs: [
          "Päihdemyytissä vähäinen havainto muuttuu usein suureksi yleistykseksi. Kaveripiirin kokemus ei edusta kaikkia nuoria, ja näkyvä oireettomuus ei sulje pois myöhemmin ilmeneviä haittoja. Arvioi, kuka väittää, mihin tieto perustuu, miltä ajalta se on ja onko kertojalla hyötyä väitteen uskomisesta. Kokemuskertomus voi olla tosi mutta silti huono peruste yleiselle turvallisuuspäätelmälle.",
          "Huumausaineisiin liittyy terveysriskien lisäksi sosiaalisia ja oikeudellisia seurauksia. Lainsäädäntö ja tuotemarkkinat voivat muuttua, joten vanhan oppikirjan oikeudelliset yksityiskohdat eivät ole ajantasainen lakilähde. Tässä kurssissa ei opetella vanhoja rangaistusmääriä. Turvallinen valinta on olla kokeilematta ja hakea apua huoleen. Käyttäneen ihmisen avun tarve tulee ottaa vakavasti ilman leimaamista.",
        ],
        diagram: {
          title: "Väitteen neljä tarkistusta",
          steps: [
            "Kuka kertoo?",
            "Mihin näyttöön perustuu?",
            "Milloin tieto tuotettiin?",
            "Mikä jää väitteestä pois?",
          ],
        },
        example:
          "”Tunnen kolme käyttäjää” ei osoita kaikkien nuorten käyttöosuutta eikä aineen turvallisuutta. Otos on pieni ja valikoitunut.",
        terms: [
          {
            word: "Yleistys",
            definition:
              "Päätelmä, jossa yksittäisiä havaintoja sovelletaan laajempaan joukkoon.",
          },
          {
            word: "Lähdekritiikki",
            definition:
              "Tiedon alkuperän, perustelujen, ajankohdan ja luotettavuuden arviointi.",
          },
        ],
        recall: {
          prompt:
            "Mitä tarkistat, kun arvioit päihteitä koskevaa turvallisuusväitettä?",
          model:
            "Tarkistan lähteen, näytön, ajankohdan ja mahdollisen tarkoituksen. Pelkkä kaverin kokemus ei osoita yleistä turvallisuutta.",
          rubric: ["Lähde ja näyttö", "Ajankohta tai tarkoitus"],
        },
        questions: [
          [
            "Mikä on paras peruste väestöä koskevalle päätelmälle?",
            [
              "Yksi anonyymi someviesti",
              "Ajantasainen ja menetelmänsä kuvaava tutkimus",
              "Myyjän lupaus",
            ],
            1,
            "Tutkimuksen menetelmä ja ajankohta mahdollistavat arvioinnin. Myyntiväite tai yksittäinen viesti ei siihen riitä.",
          ],
          [
            "Miten käsittelet vanhan kirjan lakitietoa?",
            [
              "Oletan sen aina nykyiseksi.",
              "Tarkistan nykytilan virallisesta lähteestä.",
              "Päätän lain kaverin kokemuksesta.",
            ],
            1,
            "Lait voivat muuttua. Vanha oppikirja on historiallinen lähde, ei varma nykytilan kuvaus.",
          ],
        ],
        application: {
          prompt:
            "Arvioi väitettä ”kaverilleni ei käynyt mitään, joten aine on turvallinen”. Käytä käsitteitä otos ja haitta.",
          model:
            "Yhden ihmisen kokemus on liian pieni ja valikoitunut otos. Haitta voi myös jäädä näkymättä tai tulla myöhemmin. Siksi havainto ei todista yleistä turvallisuutta.",
          rubric: [
            "Pieni tai valikoitunut otos",
            "Näkymättömät tai viivästyvät haitat",
            "Johtopäätöksen rajat",
          ],
        },
        source: drugs,
      }),
    ],
  },
  {
    id: "5.3",
    title: "Sosiaaliset paineet ja päihteet",
    description: "Omat rajat, nuorten terveys ja historialliset kuviot.",
    group: "Päihteet ja valinnat",
    color: "peach",
    source: social,
    lessons: [
      lesson("5.3", 1, {
        title: "Ryhmän tapa ei ole kaikkien tapa",
        hook: "Porukassa sanotaan ”kaikkihan näin tekevät”. Miksi lause voi tuntua todelta, vaikkei se kuvaa koko ikäluokkaa?",
        paragraphs: [
          "Sosiaalinen paine on ryhmän odotusten vaikutusta omiin valintoihin. Se voi olla suoraa, kuten yllyttämistä, tai epäsuoraa: ihminen arvelee, mitä muut odottavat. Normi on käsitys tavallisesta tai hyväksytystä toiminnasta. Oman ryhmän näkyvät tavat voivat saada käytön näyttämään yleisemmältä kuin se on.",
          "Kuulumisen tarve on tavallinen ja tärkeä, mutta hyväksyntää ei pitäisi joutua ostamaan vaarallisella valinnalla. Ryhmä voi myös suojata: ystävä voi tukea kieltäytymistä ja ehdottaa päihteetöntä tekemistä. Valintaa ohjaavat siis sekä yksilön tiedot että ympäristön mahdollisuudet ja odotukset. Kokeessa hyvä selitys kuvaa mekanismin eikä syyllistä nuorta heikkoluonteiseksi.",
        ],
        diagram: {
          title: "Paine voi olla näkymätöntä",
          steps: [
            "Näen muutaman toimivan",
            "Oletan kaikkien odottavan samaa",
            "Pelkään ulkopuolisuutta",
            "Valintaan syntyy paine",
          ],
        },
        example:
          "Kaksi äänekästä yllyttäjää voi luoda vaikutelman koko ryhmän kannasta, vaikka muutkin haluaisivat kieltäytyä.",
        terms: [
          {
            word: "Sosiaalinen paine",
            definition:
              "Muiden todellisten tai oletettujen odotusten vaikutus omaan toimintaan.",
          },
          {
            word: "Normi",
            definition:
              "Ryhmän käsitys tavallisesta tai hyväksyttävästä toiminnasta.",
          },
        ],
        recall: {
          prompt: "Vertaile suoraa ja epäsuoraa sosiaalista painetta.",
          model:
            "Suorassa paineessa yllytetään tai vaaditaan. Epäsuorassa ihminen arvelee muiden odottavan tiettyä valintaa ilman suoraa käskyä.",
          rubric: ["Suora vaatimus", "Oletettu odotus"],
        },
        questions: [
          [
            "Mikä on epäsuoraa painetta?",
            [
              "Kaveri sanoo ”sinun on pakko”.",
              "Ajattelen, etten kuulu joukkoon ilman kokeilua.",
              "Kaveri hyväksyy kieltäytymiseni.",
            ],
            1,
            "Odotus voi vaikuttaa ilman ääneen lausuttua vaatimusta. Suora käsky on suoraa painetta, kun taas oletettu hyväksynnän ehto on epäsuoraa.",
          ],
          [
            "Miten ryhmä voi suojata?",
            [
              "Tukemalla päihteetöntä valintaa",
              "Nolaamalla kieltäytyjän",
              "Väittämällä kaikkien käyttävän",
            ],
            0,
            "Hyväksyntä ilman ehtoa pienentää painetta ja tekee turvallisesta valinnasta helpomman.",
          ],
        ],
        application: {
          prompt:
            "Selitä, miksi ”kaikki tekevät näin” voi lisätä päihteiden kokeilupainetta, vaikka väite olisi väärä.",
          model:
            "Lause luo oletuksen ryhmän normista. Nuori voi pelätä ulkopuolisuutta ja toimia odotuksen mukaan. Näkyvä käytös ei silti edusta koko ikäluokkaa, ja ryhmän tuki kieltäytymiselle voi purkaa painetta.",
          rubric: [
            "Oletettu normi",
            "Kuulumisen tarve valinnan mekanismina",
            "Yleistyksen raja tai suojaava keino",
          ],
        },
        source: social,
      }),
      lesson("5.3", 2, {
        title: "Jämäkkä ei tarvitsee vain oman rajan",
        hook: "Kaveri jatkaa tarjoamista ensimmäisen kieltäytymisen jälkeen. Miten voit pitää rajasi ilman väittelyä?",
        paragraphs: [
          "Jämäkkyys tarkoittaa omien tarpeiden ja rajojen ilmaisemista selkeästi toista loukkaamatta. Kieltäytymiseen ei tarvita pitkää todistelua. Lyhyt ei, rajan rauhallinen toistaminen ja turvallisesta tilanteesta huolehtiminen ovat toimivia keinoja. Et ole vastuussa siitä, hyväksyykö painostaja päätöksesi heti.",
          "Tilanteesta voi poistua ystävän kanssa tai ottaa yhteyttä turvalliseen aikuiseen. Ennakkoon sovittu viesti tai hakumahdollisuus voi helpottaa lähtemistä. Kaveria voi tukea sanomalla ääneen, ettei kenenkään tarvitse osallistua. Jos tilanteeseen liittyy uhkaa, turvallisuus on tärkeämpää kuin keskustelun voittaminen. Jämäkkä toiminta ei ole hyökkäävyyttä eikä vaarallisessa tilanteessa paikalle jäämistä.",
        ],
        diagram: {
          title: "Kieltäytymisen neljä keinoa",
          steps: [
            "Sano selkeästi ei",
            "Toista raja",
            "Ehdota muuta tai poistu",
            "Hae tarvittaessa tukea",
          ],
        },
        example:
          "”En halua. Lähden nyt kotiin.” on riittävä vastaus. Kaverin kanssa sovittu yhteinen lähtö voi tehdä siitä helpompaa.",
        terms: [
          {
            word: "Jämäkkyys",
            definition:
              "Omien oikeuksien ja rajojen selkeä, toisia kunnioittava ilmaiseminen.",
          },
          {
            word: "Painostus",
            definition:
              "Toiminta, jolla pyritään taivuttamaan toinen vastoin hänen tahtoaan.",
          },
        ],
        recall: {
          prompt:
            "Kirjoita lyhyt jämäkkä kieltäytyminen ja turvallinen jatkotoimi tilanteeseen, jossa tarjotaan päihdettä.",
          model:
            "En halua käyttää, ja päätökseni pysyy. Lähden kaverin kanssa turvallisesti pois ja tarvittaessa soitan luotettavalle aikuiselle. Minun ei tarvitse jäädä väittelemään.",
          rubric: ["Selkeä raja", "Turvallinen seuraava teko"],
        },
        questions: [
          [
            "Mikä on jämäkkä vastaus?",
            [
              "No ehkä, jos vielä vaadit.",
              "En halua, päätökseni pysyy.",
              "Olette kaikki tyhmiä.",
            ],
            1,
            "Jämäkkä vastaus on selkeä ja kunnioittava. Myöntyminen paineeseen tai loukkaaminen ei kuvaa sitä.",
          ],
          [
            "Mikä on tärkeintä uhkaavassa tilanteessa?",
            [
              "Voitan väittelyn.",
              "Pysyn paikalla todistaakseni rohkeuteni.",
              "Pääsen turvaan ja haen apua.",
            ],
            2,
            "Oma turvallisuus menee keskustelun tai maineen edelle. Uhkaavaan tilanteeseen ei jäädä todistamaan rohkeutta tai voittamaan väittelyä.",
          ],
        ],
        application: {
          prompt:
            "Sovella jämäkkyyttä tilanteeseen, jossa kaksi tuttua painostaa kokeilemaan päihdettä. Tee toimintasuunnitelma.",
          model:
            "Sanon rauhallisesti, etten halua. Toistan rajan ilman pitkää väittelyä. Lähden luotettavan kaverin kanssa ja otan yhteyttä aikuiseen, jos poistuminen tuntuu turvattomalta.",
          rubric: [
            "Selkeä kieltäytyminen",
            "Rajan säilyttäminen",
            "Turvallinen poistuminen ja tuki",
          ],
        },
        source: social,
      }),
      lesson("5.3", 3, {
        title: "Nuoren keho ei ole valmis riskisuojaksi",
        hook: "”Nuorena keho kestää kaiken.” Miten nikotiini ja alkoholi haastavat tämän väitteen?",
        paragraphs: [
          "Nikotiini voi aiheuttaa riippuvuutta ja kuormittaa elimistöä. Tupakansavu sisältää myös muita haitallisia aineita, jotka vahingoittavat muun muassa keuhkoja ja verenkiertoa. Pitkäaikainen tupakointi kasvattaa useiden sairauksien riskiä. Savuton tuote ei tarkoita nikotiinitonta tai riskitöntä tuotetta, eikä oppikirjan tupakointikuvaus kata kaikkia uusia tuotteita.",
          "Alkoholi heikentää arviointia, koordinaatiota ja reagointia. Nuorella tämä voi lisätä tapaturmien, väkivallan ja muiden vaaratilanteiden riskiä; voimakas päihtymys voi olla hengenvaarallinen. Toistuva käyttö voi haitata oppimista, unta ja kehittyvien aivojen toimintaa. Haittoja on sekä välittömiä että pitkän ajan haittoja. Huonosti heräävää päihtynyttä ei jätetä nukkumaan yksin, vaan soitetaan 112 ja seurataan hengitystä ohjeiden mukaan.",
        ],
        diagram: {
          title: "Aikajänne erottaa haittoja",
          steps: [
            "Heti: arviointi ja koordinaatio heikkenevät",
            "Toistuvasti: uni ja oppiminen kärsivät",
            "Pitkään: sairastumisriski kasvaa",
          ],
        },
        example:
          "”Ei tullut tänään sairautta” ei osoita tupakoinnin turvallisuutta. Osa haitoista kertyy vuosien aikana.",
        terms: [
          {
            word: "Nikotiini",
            definition:
              "Riippuvuutta aiheuttava aine, jota on esimerkiksi tupakka- ja nikotiinituotteissa.",
          },
          {
            word: "Välitön haitta",
            definition:
              "Lyhyessä ajassa syntyvä haitta, esimerkiksi päihtymiseen liittyvä tapaturma.",
          },
        ],
        recall: {
          prompt: "Nimeä yksi välitön ja yksi pitkän ajan päihdehaitta.",
          model:
            "Alkoholi voi heti heikentää koordinaatiota ja lisätä tapaturmia. Pitkäaikainen tupakointi kasvattaa esimerkiksi keuhko- ja verenkiertosairauksien riskiä.",
          rubric: ["Välitön mekanismi", "Pitkän ajan riski"],
        },
        questions: [
          [
            "Miksi alkoholi voi lisätä tapaturmia?",
            [
              "Arviointi ja koordinaatio heikkenevät.",
              "Kaikki refleksit paranevat.",
              "Väsymys katoaa pysyvästi.",
            ],
            0,
            "Päihtyminen heikentää vaarojen tunnistamista ja kehon hallintaa. Energinen olo ei tarkoita parempaa reagointikykyä tai levon tarpeen poistumista.",
          ],
          [
            "Mikä väite nikotiinista on oikein?",
            [
              "Riippuvuutta voi syntyä myös savuttomasta tuotteesta.",
              "Vain savu voi aiheuttaa riippuvuutta.",
              "Nuoruus estää riippuvuuden.",
            ],
            0,
            "Nikotiini on itsessään riippuvuutta aiheuttava aine. Savuttomuus ei poista tätä vaikutusta.",
          ],
        ],
        application: {
          prompt:
            "Perustele, miksi nuoren päihdehaittoja arvioitaessa tarvitaan sekä lyhyt että pitkä aikaväli.",
          model:
            "Heti voi syntyä tapaturma arvioinnin heikentyessä. Toistuva käyttö voi vaikeuttaa unta ja oppimista, ja pitkä käyttö kasvattaa sairauksien riskiä. Oireeton yksittäinen kerta ei siis todista turvallisuutta.",
          rubric: [
            "Välitön seuraus mekanismeineen",
            "Kertyvä tai pitkäaikainen haitta",
            "Turvallisuuspäätelmän raja",
          ],
        },
        source: social,
      }),
      lesson("5.3", 4, {
        title: "Vanha kuvaaja kertoo omasta ajastaan",
        hook: "Kirjan kuvaajan viimeinen vuosi on 2014. Voitko kirjoittaa kokeeseen ”nuoret käyttävät nykyään näin paljon”?",
        paragraphs: [
          "Oppikirjan nuorten päihteitä kuvaavat aikasarjat ulottuvat vuoteen 2014. Ne ovat historiallista aineistoa, eivät tämän vuoden tilasto. Kuvaajaa lukiessa tarkista ensin otsikko, kohderyhmä, vaaka-akselin vuodet ja pystyakselin mittayksikkö. Prosenttiosuus kertoo osan tutkituista, ei kaikkien ihmisten lukumäärää. Myös kysymyksen sanamuoto vaikuttaa siihen, mitä mitataan.",
          "Erottele havainto ja tulkinta. Havainto voi olla, että osuus pieneni kahden mittausvuoden välillä. Syyksi ei voi todistaa yhtä tekijää pelkän kuvaajan perusteella. Jos osuus muuttuu 20 prosentista 15 prosenttiin, ero on 5 prosenttiyksikköä; suhteellinen lasku on 25 prosenttia. Nämä luvut ovat tässä keksitty laskuesimerkki, eivät kirjan kuvaajasta luettuja arvoja. Ajantasainen väite vaatisi uudemman lähteen.",
        ],
        diagram: {
          title: "Kuvaajan lukujärjestys",
          steps: [
            "Mitä ja keitä mitataan?",
            "Milloin ja missä yksikössä?",
            "Mikä muutos näkyy?",
            "Mitä ei voi päätellä?",
          ],
        },
        example:
          "Keksitty sarja: 2000: 20 %, 2010: 15 %. Voit sanoa osuuden laskeneen, mutta et päätellä, että kaikki päihdehaitat vähenivät tai että sama suunta jatkuu nyt.",
        terms: [
          {
            word: "Aikasarja",
            definition: "Saman ilmiön mittauksia eri ajankohdista.",
          },
          {
            word: "Prosenttiyksikkö",
            definition: "Kahden prosenttiosuuden välinen suora erotus.",
          },
        ],
        recall: {
          prompt:
            "Miksi vuoteen 2014 päättyvä kuvaaja ei yksin tue nykyhetken väitettä?",
          model:
            "Se mittaa mennyttä aikaa. Tilanne ja mittaustavat voivat muuttua, joten nykyhetki vaatii ajantasaisen lähteen.",
          rubric: [
            "Ajallinen rajaus",
            "Nykyväitteeseen tarvitaan uutta tietoa",
          ],
        },
        questions: [
          [
            "Keksityssä aineistossa osuus laskee 20 %:sta 15 %:iin. Kuinka monta prosenttiyksikköä?",
            ["5", "25", "35"],
            0,
            "Prosenttiyksikköero on 20 − 15 = 5. Suhteellinen lasku on eri lasku: 5/20 = 25 %.",
          ],
          [
            "Mitä vuosien 1986–2014 kuvaajasta voi varmasti rajata?",
            [
              "Se kuvaa suoraan vuoden 2026 tilannetta.",
              "Se kuvaa mittaamiaan historiallisia ajankohtia.",
              "Se todistaa muutoksen yhden ainoan syyn.",
            ],
            1,
            "Kuvaaja kertoo mitatuista vuosista. Nykytilanne tai syy-yhteys ei seuraa siitä automaattisesti.",
          ],
        ],
        application: {
          prompt:
            "Arvioi väitettä ”kirjan vuoden 2014 kuvaaja todistaa, että nykyiset nuoret käyttävät vähemmän päihteitä harrastusten vuoksi”.",
          model:
            "Väite ylittää aineiston rajat kahdesti: vuoden 2014 tieto ei kuvaa suoraan nykyhetkeä, eikä pelkkä muutos todista harrastuksia syyksi. Tarvittaisiin uusi tilasto ja syy-yhteyttä tutkivaa näyttöä.",
          rubric: [
            "Historiallinen rajaus",
            "Havainto ja syy erotettu",
            "Lisänäytön tarve",
          ],
        },
        source: social,
      }),
    ],
  },
];
