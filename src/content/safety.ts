import { lesson, type Section } from "./types";
const source = {
  pdf: [45, 49] as [number, number],
  book: [108, 112] as [number, number],
};
export const safety: Section = {
  id: "8.1",
  title: "Sinusta voi tulla hengenpelastaja",
  description: "Turvallisuus, hätäpuhelu, vesipelastus ja kylmä.",
  group: "Ensiapu",
  color: "blue",
  source,
  lessons: [
    lesson("8.1", 1, {
      title: "Auttaja aloittaa turvallisuudesta",
      hook: "Pyöräilijä kaatuu ajotielle. Juoksetko heti liikenteen sekaan vai arvioitko vaaran ensin?",
      paragraphs: [
        "Ensiapu on tapahtumapaikalla annettavaa välitöntä apua. Hätäensiapu turvaa henkeä, erityisesti hengitystä ja verenkiertoa. Ensihoito on ammattilaisten antamaa hoitoa. Auttajan ensimmäinen tehtävä on huomata vaarat: liikenne, sähkö, tuli, vesi tai muu uhka voivat aiheuttaa lisää uhreja. Sankarillinen kiire ei auta, jos auttajakin loukkaantuu.",
        "Arvioi paikka turvallisesta kohdasta, kutsu muita avuksi ja soita tarvittaessa 112. Anna yhdelle ihmiselle selkeä tehtävä, esimerkiksi hätäpuhelu tai ammattilaisten opastus. Autettavaa siirretään välittömästä vaarasta vain omaa turvallisuutta vaarantamatta. Muuten vältetään tarpeetonta liikuttamista ja toimitaan hätäkeskuksen ohjeilla. Suojaa autettavan yksityisyyttä: kuvaaminen ja kuvien jakaminen eivät ole auttamista. Kun ammattilaiset tulevat, kerro havainnot ja anna heille työrauha.",
      ],
      diagram: {
        title: "Tilannearvion järjestys",
        steps: [
          "Pysähdy ja tunnista vaara",
          "Turvaa oma toiminta",
          "Hälytä ja jaa tehtävät",
          "Auta ohjeiden mukaan",
        ],
      },
      example:
        "”Sinä sinisessä takissa, soita 112” on selkeämpi kuin yleinen huuto ”joku soittakoon”. Oma turvallinen sijainti säilytetään.",
      terms: [
        {
          word: "Hätäensiapu",
          definition: "Välitön henkeä ylläpitävä ensiapu.",
        },
        {
          word: "Ensihoito",
          definition: "Ensihoidon ammattilaisten antama kiireellinen hoito.",
        },
      ],
      recall: {
        prompt:
          "Miksi auttajan turvallisuus tarkistetaan ennen autettavan luo menemistä?",
        model:
          "Lisäuhri vaikeuttaa tilannetta ja voi estää kaiken auttamisen. Vaaran arviointi mahdollistaa avun turvallisesti.",
        rubric: ["Lisävammojen ehkäisy", "Avun jatkuvuus"],
      },
      questions: [
        [
          "Mitä teet ensin vaarallisella ajotiellä?",
          [
            "Juoksen suoraan liikenteeseen.",
            "Arvioin liikennevaaran turvallisesta paikasta.",
            "Kuvaan tilanteen someen.",
          ],
          1,
          "Oman turvallisuuden varmistaminen ehkäisee lisäonnettomuuden. Kuvaaminen ei korvaa avun hälyttämistä.",
        ],
        [
          "Mikä tehtävänanto toimii parhaiten?",
          [
            "Joku tehköön jotain.",
            "Sinä punaisessa takissa, soita 112.",
            "Kaikki katsokaa hiljaa.",
          ],
          1,
          "Henkilöity ja tarkka tehtävä vähentää epäselvyyttä siitä, kuka toimii.",
        ],
      ],
      application: {
        prompt:
          "Kuvaile turvallisen auttamisen alku kaatumistilanteessa liikenteen lähellä. Perustele kaksi valintaa.",
        model:
          "Pysyn turvallisessa paikassa ja arvioin liikenteen, jotta en joudu itse vaaraan. Kutsun apua ja annan yhdelle ihmiselle tehtäväksi soittaa 112 tilanteen vaatiessa. Toimin ohjeiden mukaan ja vältän tarpeetonta siirtämistä.",
        rubric: [
          "Vaarojen arviointi",
          "Selkeä avun hälytys",
          "Turvallisuuden ja siirtämisen perustelu",
        ],
      },
      source,
    }),
    lesson("8.1", 2, {
      title: "Hätäpuhelu on yhteistyötä",
      hook: "Aikuinen ei herää bussipysäkillä. Mitä hätäkeskus tarvitsee tietää, ja miksi puhelin kannattaa pitää auki?",
      paragraphs: [
        "Suomessa hätänumero on 112. Sinne soitetaan, kun tarvitaan kiireellistä viranomaisapua esimerkiksi hengen tai terveyden vaaran vuoksi. Sinun ei tarvitse tietää diagnoosia. Kerro mitä on tapahtunut ja tarkka sijainti: kunta, osoite ja tarvittaessa sisäänkäynti tai maamerkki. Kuvaa havaintosi, esimerkiksi herääkö henkilö ja hengittääkö hän normaalisti.",
        "Vastaa kysymyksiin ja toimi päivystäjän ohjeiden mukaan. Kaiutintoiminto vapauttaa käsiä auttamiseen. Lopeta puhelu vasta luvalla ja järjestä mahdollisuuksien mukaan opastus avulle. Jos tilanne muuttuu, kerro siitä. Kysymykset tukevat oikean avun järjestämistä; ne eivät tarkoita, ettei apu olisi tärkeää. Harjoituksessa puhelun sisältöä kirjoitetaan tai näytellään, mutta oikeaan hätänumeroon ei soiteta harjoittelun vuoksi.",
      ],
      diagram: {
        title: "Muista hätäpuhelussa",
        steps: [
          "Mitä tapahtui?",
          "Missä: osoite ja kunta",
          "Mitä havaitset?",
          "Vastaa ja noudata ohjeita",
        ],
      },
      example:
        "”Olemme Koulukatu 4:n pääovella Tampereella. Aikuinen ei herää. Laitan kaiuttimen päälle ja toimin ohjeesi mukaan.” on havaintoihin perustuva alku.",
      terms: [
        {
          word: "Hätäilmoitus",
          definition: "Kiireellisen viranomaisavun pyytäminen hätäkeskuksesta.",
        },
        {
          word: "Tilannearvio",
          definition:
            "Havaintoihin perustuva arvio vaarasta ja avun tarpeesta.",
        },
      ],
      recall: {
        prompt: "Nimeä kolme olennaista tietoa hätäpuheluun.",
        model:
          "Mitä tapahtui, missä tarkalleen ja millainen autettavan tila on. Vastaan kysymyksiin ja jatkan ohjeiden mukaan.",
        rubric: ["Tapahtuma", "Tarkka sijainti", "Havainnot autettavasta"],
      },
      questions: [
        [
          "Pitääkö diagnoosi tietää ennen 112-soittoa?",
          [
            "Kyllä, muuten ei saa soittaa.",
            "Ei; kerrotaan havainnot ja epäilty kiireellinen vaara.",
            "Vain jos mukana on aikuinen.",
          ],
          1,
          "Päivystäjä auttaa arvioinnissa. Nuorikin voi soittaa; epäilty kiireellinen vaara riittää avun pyytämiseen.",
        ],
        [
          "Milloin lopetat hätäpuhelun?",
          [
            "Heti osoitteen sanottuani",
            "Kun päivystäjä antaa luvan",
            "Kun ensimmäinen kysymys tuntuu vaikealta",
          ],
          1,
          "Päivystäjä varmistaa tarvittavat tiedot ja antaa toimintaohjeita. Pelkkä osoitteen kertominen ei päätä puhelua; vaikeaan kysymykseen saa pyytää apua.",
        ],
      ],
      application: {
        prompt:
          "Kirjoita kuvitteellisen hätäpuhelun aloitus. Henkilö ei herää koulun pääovella. Älä soita oikeasti.",
        model:
          "Tarvitsen kiireellistä apua. Olemme kuvitteellisen koulun pääovella osoitteessa Koulukatu 4, Tampere. Henkilö ei herää puhutteluun. Asetan puhelimen kaiuttimelle, tarkistan hengityksen ohjeesi mukaan ja vastaan kysymyksiin.",
        rubric: [
          "Tapahtuma ja kiireellisyys",
          "Osoite, kunta ja tarkennus",
          "Ohjeiden noudattaminen ja havainnot",
        ],
      },
      source,
    }),
    lesson("8.1", 3, {
      title: "Pelasta vedestä vaarantamatta itseäsi",
      hook: "Joku on veden varassa laiturin lähellä. Miksi apuväline voi olla turvallisempi kuin veteen hyppääminen?",
      paragraphs: [
        "Vesipelastuksessa tavoitteena on estää myös auttajan joutuminen hätään. Hälytä apua ja soita 112. Pyri auttamaan turvalliselta alustalta ojentamalla tai heittämällä sopiva kelluttava apuväline. Hätääntynyt voi tarttua auttajaan niin voimakkaasti, että molemmat joutuvat vaaraan. Uimataito ei yksin tee vaarallisesta tilanteesta turvallista.",
        "Älä mene heikolle jäälle tai vaaralliseen veteen ilman asianmukaista osaamista ja välineitä. Ohjaa muita pysymään turvassa ja opasta pelastajat paikalle. Kun henkilö on turvallisesti saatu pois vedestä, tarkistetaan reagointi ja normaali hengitys sekä jatketaan 112:n ohjeiden mukaan. Hukkumiseen liittyvä elvytys poikkeaa aloitukseltaan tavallisesta aikuisen elvytyksestä; se käsitellään elvytysosiossa. Hypotermiaa epäiltäessä ehkäistään lisäjäähtymistä.",
      ],
      diagram: {
        title: "Turvallinen toimintaketju rannalta",
        steps: [
          "Hälytä 112 ja muita avuksi",
          "Ojenna tai heitä apuväline turvasta",
          "Älä muutu toiseksi uhriksi",
          "Pelastamisen jälkeen arvioi hengitys",
        ],
      },
      example:
        "Pelastusrenkaan heittäminen laiturilta antaa kelluttavaa tukea autettavalle. Samalla toinen henkilö voi soittaa ja opastaa ammattiavun.",
      terms: [
        {
          word: "Pelastautumisväline",
          definition:
            "Väline, joka auttaa pysymään pinnalla tai pääsemään vaara-alueelta.",
        },
        {
          word: "Hukkuminen",
          definition:
            "Veteen joutumisen aiheuttama hengityksen häiriintyminen.",
        },
      ],
      recall: {
        prompt:
          "Miksi vedestä auttaessa suositaan apuvälinettä turvalliselta alustalta?",
        model:
          "Apuväline voi tukea autettavaa ilman, että auttaja joutuu veteen tai hätääntyneen otteeseen. Näin vältetään lisäuhri.",
        rubric: [
          "Oma turvallisuus",
          "Kelluttava tai etäisyyttä säilyttävä apu",
        ],
      },
      questions: [
        [
          "Mikä on turvallinen lähtökohta?",
          [
            "Hyppään aina heti perään.",
            "Hälytän apua ja etsin turvallisen tavan ojentaa tai heittää välineen.",
            "Menen heikolle jäälle kokeilemaan.",
          ],
          1,
          "Pelastaminen ei saa aiheuttaa lisäuhreja. Ammattiapu ja rannalta annettu väline ovat turvallisen harkinnan lähtökohtia.",
        ],
        [
          "Mitä tehdään vedestä pelastamisen jälkeen ensin?",
          [
            "Oletetaan kaiken olevan kunnossa.",
            "Tarkistetaan reagointi ja normaali hengitys.",
            "Pakotetaan heti juoksemaan.",
          ],
          1,
          "Hapenpuute ja kylmä voivat olla vaarallisia myös rannalla. Hätäensiapu alkaa tilan arvioinnista.",
        ],
      ],
      application: {
        prompt:
          "Perustele turvallinen toimintasuunnitelma laiturilta havaittuun hätätilanteeseen ilman veteen hyppäämistä.",
        model:
          "Soitan 112 tai annan toiselle tehtävän soittaa. Turvalliselta alustalta heitän sopivan kelluttavan välineen ja kutsun lisää apua. Pysyn itse turvassa, koska hätääntynyt voi vetää auttajan veden alle. Opastan pelastajat paikalle.",
        rubric: [
          "Avun hälytys",
          "Turvallinen välineapu",
          "Lisäuhrin ehkäisy perusteltu",
        ],
      },
      source,
    }),
    lesson("8.1", 4, {
      title: "Kylmä ja sekavuus ovat varoitusmerkkejä",
      hook: "Kylmästä vedestä autettu ei enää vapise vaan on unelias. Tarkoittaako vapinan loppuminen paranemista?",
      paragraphs: [
        "Hypotermia tarkoittaa elimistön ydinlämmön liiallista laskua, tavallisesti alle 35 asteen. Kirjan alle 36 asteen määritelmä on vanha; tässä käytetään nykyistä opetuksellista rajaa. Kylmä vesi, märät vaatteet ja pitkä liikkumattomuus lisäävät jäähtymistä. Aluksi voi esiintyä vapinaa ja palelua, mutta tilanteen pahetessa sekavuutta ja tajunnan heikkenemistä. Vapinan loppuminen ei siksi yksin merkitse toipumista.",
        "Estä lisäjäähtyminen suojaamalla tuulelta ja kylmältä alustalta sekä peittelemällä. Käsittele selvästi alilämpöistä tai heikkokuntoista varovasti; älä pakota kävelemään tai hiero voimakkaasti. Soita 112, jos henkilö on sekava, tajunta heikkenee tai tilanne uhkaa henkeä. Tarkkaile hengitystä ja toimi päivystäjän ohjeilla. Tajuttomalle ei anneta mitään suuhun. Tavoitteena on turvallinen ensiapu, ei lämpötilan mittaamisen odottaminen ennen avun pyytämistä.",
      ],
      diagram: {
        title: "Ehkäise lisäjäähtyminen",
        steps: [
          "Suojaa tuulelta ja alustalta",
          "Peittele ja käsittele varovasti",
          "112 vakavissa oireissa",
          "Seuraa reagointia ja hengitystä",
        ],
      },
      example:
        "Sekavan autettavan pakottaminen liikkeelle ei ole luotettava lämmityskeino. Varovainen käsittely ja ammattiapu ovat tärkeämpiä.",
      terms: [
        {
          word: "Hypotermia",
          definition: "Ydinlämmön lasku liian alas, tavallisesti alle 35 °C.",
        },
        { word: "Ydinlämpö", definition: "Elimistön sisäosien lämpötila." },
      ],
      recall: {
        prompt:
          "Nimeä kaksi vakavan jäähtymisen varoitusmerkkiä ja yksi ensiaputoimi.",
        model:
          "Sekavuus ja tajunnan heikkeneminen ovat vakavia merkkejä. Soitetaan 112 ja estetään lisäjäähtymistä peittelemällä ja suojaamalla alustalta.",
        rubric: ["Vakavat oireet", "Hälytys ja lämmönhukan esto"],
      },
      questions: [
        [
          "Vapina loppuu ja henkilö muuttuu uneliaaksi. Miten tulkitset?",
          [
            "Hän on varmasti lämmennyt.",
            "Tila voi olla pahenemassa; tarvitaan apua.",
            "Hänet pitää jättää nukkumaan ulos.",
          ],
          1,
          "Vapina voi lakata jäähtymisen edetessä. Uneliaisuus ja sekavuus ovat vaaran merkkejä.",
        ],
        [
          "Mikä on sopiva toimi selvästi jäähtyneelle?",
          [
            "Voimakas hieronta ja pakotettu kävely",
            "Varovainen käsittely ja suojaaminen kylmältä",
            "Juoman kaataminen tajuttoman suuhun",
          ],
          1,
          "Varovainen käsittely ja lisäjäähtymisen esto ovat olennaisia. Tajuttomalle ei anneta mitään suuhun.",
        ],
      ],
      application: {
        prompt:
          "Sovella hypotermiatietoa kuvitteelliseen tilanteeseen: kylmästä autettu on sekava eikä jaksa liikkua. Perustele kolme tekoa.",
        model:
          "Soitan 112 vakavien oireiden vuoksi. Peittelen ja eristän kylmästä alustasta estääkseni lisäjäähtymistä. Käsittelen varovasti, en pakota kävelemään ja tarkkailen hengitystä ohjeiden mukaan.",
        rubric: [
          "Vakavuuden tunnistaminen ja 112",
          "Lämmönhukan ehkäisy",
          "Varovaisuus ja seuranta",
        ],
      },
      source,
    }),
  ],
};
