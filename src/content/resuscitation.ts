import { lesson, type Section } from "./types";
const source = {
  pdf: [50, 54] as [number, number],
  book: [113, 117] as [number, number],
};
export const resuscitation: Section = {
  id: "8.2",
  title: "Elvyttämällä happea aivoille",
  description: "Tunnista elottomuus, turvaa hengitys ja käytä sydäniskuria.",
  group: "Ensiapu",
  color: "blue",
  source,
  lessons: [
    lesson("8.2", 1, {
      title: "Haukkova hengitys ei ole normaalia",
      hook: "Maassa oleva aikuinen ei herää ja haukkoo ilmaa harvakseltaan. Riittääkö havainto ”hän hengittää jotenkin”?",
      paragraphs: [
        "Aivot tarvitsevat jatkuvasti happea, joka kulkee keuhkoista veren mukana kudoksiin. Kun verenkierto pysähtyy, aika on ratkaiseva. Elottomuutta epäillään, jos ihminen ei herää eikä hengitä normaalisti. Yksittäiset haukkovat vedot eivät ole normaalia hengitystä. Maallikon ei pidä hukata aikaa pulssin etsimiseen.",
        "Varmista paikan turvallisuus ja kokeile herättää puhuttelemalla ja hartioista ravistamalla. Jos henkilö ei herää, soita 112 ja laita kaiutin päälle. Avaa hengitystie päätä taakse taivuttamalla ja leukaa nostamalla, ja arvioi normaalia hengitystä lyhyesti, enintään kymmenen sekuntia. Jos hengitys ei ole normaalia tai olet epävarma, aloita elvytys päivystäjän ohjeilla. Nykyohjeessa hätäpuhelu tehdään heti heräämättömyyden toteamisen jälkeen, eikä kirjan vanhaa järjestystä pidä käyttää viivytyksen syynä.",
      ],
      diagram: {
        title: "Ratkaiseva haara",
        steps: [
          "Ei herää → 112 kaiuttimelle",
          "Avaa hengitystie ja tarkista hengitys",
          "Normaali hengitys → kylkiasento",
          "Ei normaalia / epävarma → elvytys",
        ],
      },
      example:
        "”Hän haukkoo vain silloin tällöin” ei ole peruste odottaa. Päivystäjälle kerrotaan havainto ja toimitaan elvytysohjeen mukaan.",
      terms: [
        {
          word: "Elottomuus",
          definition: "Tila, jossa henkilö ei reagoi eikä hengitä normaalisti.",
        },
        {
          word: "Agonaalinen hengitys",
          definition:
            "Sydänpysähdyksen yhteydessä esiintyvä poikkeava, usein haukkova hengitys.",
        },
      ],
      recall: {
        prompt: "Millaiset kaksi havaintoa saavat epäilemään elottomuutta?",
        model:
          "Henkilö ei herää eikä hengitä normaalisti. Haukkova hengitys ei ole normaalia, ja epävarmuudessa toimitaan 112:n elvytysohjeilla.",
        rubric: [
          "Heräämättömyys",
          "Normaalin hengityksen puute tai epävarmuus",
        ],
      },
      questions: [
        [
          "Heräämätön haukkoo harvakseltaan. Mikä on oikea tulkinta?",
          [
            "Normaali hengitys on varmistettu.",
            "Elottomuutta on epäiltävä ja elvytys aloitettava ohjeilla.",
            "Hänet jätetään nukkumaan.",
          ],
          1,
          "Haukkovat hengitysvedot eivät takaa hapensaantia. Ne voivat liittyä sydänpysähdykseen.",
        ],
        [
          "Milloin 112 soitetaan?",
          [
            "Vasta pitkän pulssin etsimisen jälkeen",
            "Heti kun henkilö ei herää",
            "Vasta puolen tunnin seurannan jälkeen",
          ],
          1,
          "Varhainen hätäpuhelu tuo ohjeet ja ammattiavun. Pulssin etsimisellä ei viivytetä maallikon elvytystä.",
        ],
      ],
      application: {
        prompt:
          "Sovella tunnistamista: aikuinen ei reagoi ja hengittää vain haukkoen. Kuvaa ensimmäiset päätökset perusteluineen.",
        model:
          "Varmistan turvallisuuden, totean heräämättömyyden ja soitan 112 kaiuttimelle. Avaan hengitystien ja arvioin hengitystä lyhyesti. Haukkova hengitys ei ole normaalia, joten aloitan elvytyksen ohjeiden mukaan.",
        rubric: [
          "Turvallisuus ja varhainen 112",
          "Hengitystien avaaminen",
          "Haukkovan hengityksen oikea tulkinta",
        ],
      },
      source,
    }),
    lesson("8.2", 2, {
      title: "Painelu liikuttaa verta, puhallus tuo happea",
      hook: "Miksi elvytyksessä tarvitaan sekä veren liikettä että happea keuhkoihin?",
      paragraphs: [
        "Aikuisen painelu-puhalluselvytyksessä rintakehän painelu auttaa veren virtausta ja puhallukset tuovat happea keuhkoihin. Vuoden 2026 Käypä hoito -suosituksessa aikuisen 30 painelun ja 2 puhalluksen rytmi edellyttää puhalluskoulutusta ja riittävää osaamista. Ilman niitä jatketaan keskeytymätöntä painelua 112:n ohjeilla. Aikuinen on selällään kovalla alustalla. Kämmentyvet asetetaan keskelle rintalastaa, käsivarret pidetään suorina ja rintakehän annetaan palautua painallusten välissä.",
        "Aikuisella painelutiheys on 100–120 minuutissa ja syvyys 5–6 senttimetriä. Puhallus on rauhallinen ja nostaa rintakehää; tauot pidetään lyhyinä. Jos puhallukset eivät onnistu tai niitä ei voi antaa, jatka ainakin painelua ja noudata 112:n ohjeita. Jatka, kunnes ammattilaiset ottavat vastuun tai saat ohjeen lopettaa. Tämä on teoriatunti: painelu ja puhallukset harjoitellaan ensiapunukella ohjauksessa, ei terveeseen kaveriin.",
      ],
      diagram: {
        title: "Aikuisen elvytys osaamisen mukaan",
        steps: [
          "112 ja painelu viivyttelemättä",
          "Puhalluskoulutus ja osaaminen: 30:2",
          "Ilman puhallusosaamista: jatkuva painelu",
          "112 ohjaa koko ajan",
        ],
      },
      example:
        "Yksi auttaja elvyttää, toinen soittaa ja järjestää sydäniskurin. Tehtävät vähentävät taukoja ja auttavat jaksamaan.",
      terms: [
        {
          word: "Painelu-puhalluselvytys",
          definition:
            "Rintakehän painelun ja puhallusten yhdistelmä verenkierron ja hapensaannin tukemiseksi.",
        },
        {
          word: "Rintalasta",
          definition: "Rintakehän etuosan keskellä oleva luu.",
        },
      ],
      recall: {
        prompt:
          "Mitä painelu ja puhallus tekevät, ja milloin aikuisella käytetään rytmiä 30:2?",
        model:
          "Painelu auttaa veren virtausta ja puhallus tuo happea keuhkoihin. Aikuisen 30:2 sopii puhalluksiin koulutetulle ja osaavalle auttajalle. Muutoin painellaan keskeytyksettä 112:n ohjeilla.",
        rubric: [
          "Verenkierto ja hapensaanti erotettu",
          "30:2:n koulutus- ja osaamisehto",
          "Jatkuva painelu ilman puhallusosaamista",
        ],
      },
      questions: [
        [
          "Mikä on aikuisen painelutiheys?",
          ["30 minuutissa", "100–120 minuutissa", "Mahdollisimman hidas"],
          1,
          "Nykyisessä maallikko-ohjeessa painelutiheys on 100–120 minuutissa. Painelusarjan 30 ei tarkoita minuuttitiheyttä.",
        ],
        [
          "Jos puhalluksia ei pysty antamaan, mitä teet?",
          [
            "Lopetan kaiken auttamisen.",
            "Jatkan ainakin painelua ja noudatan 112:n ohjeita.",
            "Odotan, että joku muu varmasti tulee.",
          ],
          1,
          "Pelkkä painelu on parempi kuin viivyttely. Hätäkeskus ohjaa tilanteessa.",
        ],
      ],
      application: {
        prompt:
          "Selitä, miksi elvytyksessä vältetään pitkiä taukoja ja annetaan rintakehän palautua.",
        model:
          "Painelu ylläpitää veren virtausta aivoihin, joten pitkä tauko heikentää tukea. Rintakehän palautuminen sallii sydämen täyttymistä painallusten välissä. Siksi tavoitellaan tasaista tehokasta painelua ja lyhyitä taukoja.",
        rubric: [
          "Veren virtauksen jatkuvuus",
          "Palautumisen merkitys",
          "Yhteys tehokkaaseen elvytykseen",
        ],
      },
      source,
    }),
    lesson("8.2", 3, {
      title: "Kylkiasento kuuluu normaalisti hengittävälle",
      hook: "Henkilö ei herää mutta hengittää tasaisesti hengitystien avaamisen jälkeen. Miksi häntä ei jätetä selälleen yksin?",
      paragraphs: [
        "Tajuton ei pysty suojaamaan hengitystietään tavallisesti. Kieli tai oksennus voi estää ilman kulkua. Kun heräämätön henkilö hengittää normaalisti, kylkiasento auttaa pitämään hengitystiet avoimina ja antaa eritteen valua suusta ulos. Elvytys taas kuuluu henkilölle, joka ei hengitä normaalisti. Pelkkä tajuttomuus ei siis määrää samaa toimintaa kaikille.",
        "Soita 112, avaa hengitystie ja varmista normaali hengitys. Käännä normaalisti hengittävä kyljelleen, tue asentoa ja pidä hengitystie avoinna. Huolehdi lämmöstä ja seuraa hengitystä jatkuvasti. Jos hengitys muuttuu epänormaaliksi, aloita elvytys ohjeiden mukaan. Suuhun ei laiteta mitään eikä sitä kaiveta sokkona sormin. Kylkiasennon käytännön tekniikka kannattaa harjoitella ohjaajan kanssa turvallisessa ympäristössä.",
      ],
      diagram: {
        title: "Sama seuranta jatkuu",
        steps: [
          "Heräämätön mutta normaali hengitys",
          "112 ja kylkiasento",
          "Avoin hengitystie ja lämpö",
          "Jatkuva seuranta: muutos → uudet toimet",
        ],
      },
      example:
        "”Hän hengitti viisi minuuttia sitten” ei riitä. Tajuttoman vieressä seurataan, että hengitys pysyy normaalina.",
      terms: [
        {
          word: "Kylkiasento",
          definition:
            "Tajuttoman normaalisti hengittävän asento, joka auttaa turvaamaan hengitystien.",
        },
        {
          word: "Hengitystie",
          definition: "Ilman kulkureitti suusta ja nenästä keuhkoihin.",
        },
      ],
      recall: {
        prompt: "Milloin valitaan kylkiasento ja milloin elvytys?",
        model:
          "Kylkiasento valitaan heräämättömälle, joka hengittää normaalisti. Jos normaali hengitys puuttuu tai siitä ei olla varmoja, aloitetaan elvytys 112:n ohjeilla.",
        rubric: [
          "Normaali hengitys kylkiasennon ehtona",
          "Epänormaali hengitys ja elvytys",
        ],
      },
      questions: [
        [
          "Kylkiasennon jälkeen…",
          [
            "hengitystä seurataan jatkuvasti.",
            "autettavan voi jättää heti yksin.",
            "suuhun annetaan juotavaa.",
          ],
          0,
          "Tila voi muuttua. Tajutonta ei jätetä yksin eikä hänelle anneta mitään suuhun.",
        ],
        [
          "Heräämättömän hengitys muuttuu haukkovaksi. Mitä teet?",
          [
            "Pidän vain peiton lämpimänä.",
            "Aloitan elvytyksen hätäkeskuksen ohjeilla.",
            "Annan hänen toipua yön yli.",
          ],
          1,
          "Haukkova hengitys ei ole normaalia. Toiminta muuttuu tilan mukana: kylkiasento ei yksin riitä, jos normaali hengitys lakkaa.",
        ],
      ],
      application: {
        prompt:
          "Perustele kylkiasento ja seuranta normaalisti hengittävälle tajuttomalle. Kerro, mikä muuttaisi toimintasi.",
        model:
          "Kylkiasento auttaa pitämään hengitystien auki ja eritteen pois hengitysteistä. Seuraan hengitystä ja pidän lämpimänä. Jos hengitys ei enää ole normaalia tai olen epävarma, aloitan elvytyksen 112:n ohjeiden mukaan.",
        rubric: [
          "Asennon mekanismi",
          "Seuranta ja lämpö",
          "Elvytykseen johtava muutos",
        ],
      },
      source,
    }),
    lesson("8.2", 4, {
      title: "Sydäniskuri neuvoo, lapsen aloitus eroaa",
      hook: "Paikalle tuodaan AED-laite. Voiko tavallinen auttaja käyttää sitä, ja mitä lapsen elvytyksestä pitää erottaa?",
      paragraphs: [
        "AED eli neuvova sydäniskuri analysoi sydämen rytmiä ja ohjaa käyttäjää ääni- tai kuvaohjein. Kuka tahansa voi käyttää sitä elvytyksen yhteydessä. Kytke laite päälle ja noudata ohjeita elektrodien kiinnittämisestä paljaalle rintakehälle. Kukaan ei koske autettavaan rytmin analyysin tai iskun aikana. Elvytystä jatketaan laitteen ohjeiden mukaan. Toinen auttaja voi hakea laitteen, jotta painelu ei turhaan keskeydy.",
        "Lapsen elottomuus liittyy usein hapenpuutteeseen. Soita heti 112 ja käytä kaiutinta. Vuoden 2026 suosituksessa lapsen elvytykseen kouluttamatonta ohjataan viiteen alkupuhallukseen ja sen jälkeen rytmiin 30:2. Jos puhallus ei onnistu, painelu aloitetaan viivyttelemättä. Lasten elvytykseen koulutetun terveydenhuollon ammattilaisen rytmi on 15:2. Ohjeet eivät siis ole kaikille sama numerojono. Painelun syvyys on noin kolmasosa rintakehän paksuudesta ja tiheys 100–120 minuutissa; toiminta sovitetaan lapsen kokoon. Myös hukkuneelle alkupuhallukset ovat tärkeitä. Vauvan tekniikka vaatii oman ohjatun harjoittelun.",
      ],
      diagram: {
        title: "Erota nämä tilanteet",
        steps: [
          "AED: käynnistä ja seuraa ohjeita",
          "Analyysi ja isku: irti autettavasta",
          "Lapsi / hukkunut: 5 alkupuhallusta",
          "Maallikko: 112 ohjaa; koulutetulla lapsiohje eroaa",
        ],
      },
      example:
        "Laite ei anna iskua joka tilanteessa. ”Iskua ei suositella” ei tarkoita, että autettava olisi varmasti toipunut; jatketaan laitteen ohjeilla.",
      terms: [
        {
          word: "AED",
          definition:
            "Neuvova sydäniskuri, joka analysoi rytmin ja ohjaa mahdollista sähköiskua.",
        },
        {
          word: "Alkupuhallukset",
          definition:
            "Elvytyksen alkuun annettavat puhallukset esimerkiksi lapsen ja hukkuneen elvytyksessä.",
        },
      ],
      recall: {
        prompt:
          "Mikä on AED:n tärkeä turvallisuussääntö ja lapsen elvytyksen aloitusero?",
        model:
          "Autettavaan ei kosketa analyysin tai iskun aikana. Lapselle ohjataan viisi alkupuhallusta ja 30:2; koulutetun ammattilaisen lapsiohje on 15:2. Jos puhallus ei onnistu, aloitetaan painelu 112:n ohjeilla.",
        rubric: [
          "Koskemattomuus analyysin ja iskun aikana",
          "Viisi alkupuhallusta",
        ],
      },
      questions: [
        [
          "Kuka voi käyttää neuvovaa sydäniskuria?",
          [
            "Vain sydänkirurgi",
            "Tavallinen auttaja laitteen ohjeilla",
            "Vain laitteen omistaja",
          ],
          1,
          "AED on tarkoitettu ohjaamaan myös maallikkoa. Laite arvioi rytmiä ja neuvoo.",
        ],
        [
          "Miten lapsen maallikkoelvytys alkaa, kun normaali hengitys puuttuu?",
          [
            "Viidellä alkupuhalluksella 112:n ohjeiden mukaan",
            "Vain odottamalla",
            "Samalla voimalla kuin suurikokoisen aikuisen painelu",
          ],
          0,
          "112 ohjaa maallikolle viisi alkupuhallusta ja jatkotoimet. Jos puhallus ei onnistu, aloitetaan painelu. Odottelu tai aikuisen voiman käyttäminen ei ole oikea ratkaisu.",
        ],
      ],
      application: {
        prompt:
          "Vertaile tavallisen aikuisen ja lapsen maallikkoelvytyksen aloitusta. Lisää AED:n turvallisuussääntö.",
        model:
          "Molemmilla hälytetään 112 ja arvioidaan normaali hengitys. Aikuisella aloitetaan painelu; puhalluksiin koulutettu ja osaava käyttää 30:2. Lapsella päivystäjä ohjaa viisi alkupuhallusta ja 30:2, mutta puhalluksen estyessä aloitetaan painelu. Lasten elvytykseen koulutetun ammattilaisen 15:2 on eri ohje. AED:n analyysin ja iskun aikana ei kosketa autettavaan.",
        rubric: [
          "Yhteinen varhainen hälytys ja arvio",
          "Alkupuhallusten ero ja 112:n ohjaus",
          "Koulutus ja osaaminen huomioitu",
          "AED:n koskemattomuussääntö",
        ],
      },
      source,
    }),
  ],
};
