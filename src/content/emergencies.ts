import { lesson, type Section } from "./types";
const source = {
  pdf: [55, 59] as [number, number],
  book: [118, 122] as [number, number],
};
export const emergencies: Section = {
  id: "8.3",
  title: "Sairauskohtaus voi yllättää",
  description: "FAST, hengitysvaikeus, kouristelu ja matala verensokeri.",
  group: "Ensiapu",
  color: "blue",
  source,
  lessons: [
    lesson("8.3", 1, {
      title: "FAST: yksikin merkki riittää hälytykseen",
      hook: "Kesken keskustelun toisen suupieli alkaa roikkua ja puhe puuroutuu. Odotatko, että kipu alkaa?",
      paragraphs: [
        "Aivoverenkierron häiriössä aivokudoksen verenkierto voi estyä tukoksen vuoksi tai verisuoni voi vuotaa. Aivot tarvitsevat jatkuvasti happea, joten nopeasti aloitettu hoito on tärkeää. Oire voi olla kivuton. Äkillinen toispuolinen heikkous tai puheen vaikeutuminen on otettava vakavasti myös nuorella ihmisellä.",
        "FAST auttaa tunnistamaan tavallisia merkkejä. Face: onko hymy epäsymmetrinen tai suupieli roikkuu? Arms: pysyvätkö molemmat kädet ylhäällä? Speech: onko puhe epäselvää tai vaikeaa? Time: soita heti 112 ja kerro oireiden alkamisaika, jos tiedät sen. Yksikin äkillinen merkki riittää, vaikka oire menisi ohi. Testi ei kata kaikkia oireita eikä sen läpäisy sulje vaaraa pois. Autettavaa ei viedä itse odottamaan seuraavaa päivää.",
      ],
      diagram: {
        title: "F · A · S · T",
        steps: [
          "Face: kasvot",
          "Arms: käsivarret",
          "Speech: puhe",
          "Time: heti 112, alkamisaika talteen",
        ],
      },
      example:
        "Jos vain puhe muuttuu äkillisesti vaikeaksi, kaikkia kolmea merkkiä ei odoteta. Hälytys tehdään jo epäilyn perusteella.",
      terms: [
        {
          word: "Aivoverenkierron häiriö",
          definition:
            "Aivojen verenkierron äkillinen häiriö, esimerkiksi tukos tai verenvuoto.",
        },
        {
          word: "FAST",
          definition:
            "Kasvojen, käsivarsien, puheen ja nopean toiminnan muistisana.",
        },
      ],
      recall: {
        prompt: "Avaa FAST-kirjaimet ja kerro, milloin soitetaan 112.",
        model:
          "Face on kasvot, Arms käsivarret, Speech puhe ja Time kiireellinen toiminta. Yksikin äkillinen merkki on syy soittaa 112, myös oireen mennessä ohi.",
        rubric: ["Kirjainten merkitykset", "Yksikin merkki ja välitön 112"],
      },
      questions: [
        [
          "Äkillinen puheen puuroutuminen loppuu minuutissa. Mitä teet?",
          [
            "Unohdan asian.",
            "Soitan silti 112 epäillyn aivoverenkierron häiriön vuoksi.",
            "Odotan kaikki FAST-merkit.",
          ],
          1,
          "Ohimeneväkin oire voi olla vakava. Kaikkia merkkejä ei odoteta, koska nopea hoito voi suojata aivokudosta ja oireiden ohittuminen ei sulje vaaraa pois.",
        ],
        [
          "Mitä FASTin T korostaa?",
          [
            "Testin tekemistä huomenna",
            "Aikaa: nopea hälytys ja oireiden alkaminen",
            "Tarvetta antaa ruokaa",
          ],
          1,
          "Nopea toiminta auttaa hoitoon pääsyä. Alkamisaika on tärkeä tieto ammattilaisille.",
        ],
      ],
      application: {
        prompt:
          "Perustele, miksi äkillisesti roikkuva suupieli ja puheen vaikeus vaativat apua ilman kipuakin.",
        model:
          "Ne ovat FASTin mukaisia aivoverenkierron häiriön merkkejä. Aivojen hapensaanti voi vaarantua kivuttomastikin. Soitan heti 112, kerron havainnot ja alkamisen sekä noudatan ohjeita.",
        rubric: [
          "FAST-merkkien tunnistus",
          "Hapenpuute ja kivuttomuus",
          "Välitön hälytys ja tieto",
        ],
      },
      source,
    }),
    lesson("8.3", 2, {
      title: "Hengitysvaikeudessa asento ja oma lääke voivat auttaa",
      hook: "Astmaa sairastavan kaverin hengitys vinkuu eikä puhe kulje normaalisti. Miksi häntä ei pakoteta makaamaan?",
      paragraphs: [
        "Astma on pitkäaikainen hengitysteiden tulehdussairaus, jossa keuhkoputket voivat supistua ja hengitys vaikeutua. Kohtauksen laukaisijoita voivat olla esimerkiksi rasitus, infektio tai allergisoiva altiste. Vinkuva uloshengitys, hengenahdistus ja puhumisen vaikeus ovat merkkejä, jotka pitää ottaa vakavasti. Kaikki hengitysvaikeus ei kuitenkaan johdu astmasta.",
        "Rauhoita tilannetta ja auta tajuissaan oleva asentoon, jossa hänen on helpoin hengittää, usein eteenpäin nojaavaan istuma-asentoon. Kysy omasta kohtauslääkkeestä ja auta sen ottamisessa henkilökohtaisen ohjeen mukaan. Älä lainaa satunnaisia lääkkeitä. Vakavassa hengitysvaikeudessa tai jos oire ei helpotu, soita 112. Jos henkilö menettää tajuntansa, arvioidaan normaali hengitys ja toimitaan sen mukaan. Oma diagnoosiarvaus ei saa viivyttää avun pyytämistä.",
      ],
      diagram: {
        title: "Hengityksen tukeminen",
        steps: [
          "Rauhoita ja kysy avun tarve",
          "Helppo hengitysasento",
          "Oma lääke oman ohjeen mukaan",
          "112 jos vaikea tai ei helpota",
        ],
      },
      example:
        "Kaveri kertoo, missä hänen oma inhalaattorinsa on. Auttaja tuo sen ja auttaa oman suunnitelman mukaan, ei keksi annosta itse.",
      terms: [
        {
          word: "Astma",
          definition:
            "Hengitysteiden pitkäaikainen tulehdussairaus, johon voi liittyä keuhkoputkien supistumista.",
        },
        {
          word: "Kohtauslääke",
          definition:
            "Henkilökohtaisen hoito-ohjeen mukaan käytettävä lääke äkilliseen oireeseen.",
        },
      ],
      recall: {
        prompt: "Nimeä kolme auttamisen periaatetta astmaoireessa.",
        model:
          "Autan helppoon hengitysasentoon, autan ottamaan oman lääkkeen oman ohjeen mukaan ja soitan 112 vakavassa tai helpottumattomassa oireessa.",
        rubric: ["Asento", "Oma lääke ohjeella", "Kiireellisen avun ehto"],
      },
      questions: [
        [
          "Mikä asento sopii tajuissaan olevan hengitysvaikeuteen?",
          [
            "Pakotettu selinmakuu aina",
            "Asento, jossa hengitys helpottuu, usein eteen nojaava istuma-asento",
            "Pää alaspäin riippuminen",
          ],
          1,
          "Autettavan hengitystä helpottava asento on ensisijainen. Kaikille ei pakoteta samaa asentoa.",
        ],
        [
          "Mitä lääkkeen suhteen tehdään?",
          [
            "Keksitään uusi annos itse.",
            "Autetaan oman lääkkeen ottamisessa oman ohjeen mukaan.",
            "Annetaan toisen ihmisen satunnainen lääke.",
          ],
          1,
          "Auttaja tukee henkilökohtaista hoito-ohjetta eikä määrää uutta hoitoa.",
        ],
      ],
      application: {
        prompt:
          "Sovella toimintamallia kuvitteelliseen astmaoireeseen, joka ei helpota oman lääkkeen jälkeen.",
        model:
          "Autan mukavaan hengitysasentoon ja pysyn rauhallisesti lähellä. Koska oire ei helpotu, soitan 112 ja kerron hengitysvaikeudesta ja jo käytetystä omasta lääkkeestä. Seuraan reagointia ja hengitystä ohjeiden mukaan.",
        rubric: [
          "Asento ja rauhoittaminen",
          "112 helpottumattomuuden vuoksi",
          "Seuranta ja havaintojen välitys",
        ],
      },
      source,
    }),
    lesson("8.3", 3, {
      title: "Kouristelevaa suojataan, ei pidetä väkisin",
      hook: "Henkilö kaatuu ja alkaa kouristella. Miksi käsien sitominen tai esineen työntäminen suuhun pahentaa vaaraa?",
      paragraphs: [
        "Kouristuskohtauksessa lihasliikkeitä ei hallita tahdonalaisesti. Taustalla voi olla epilepsia tai muu syy, kuten aineenvaihdunnan häiriö, myrkytys tai vamma. Kaikki kouristelu ei siis todista epilepsiaa, eikä kaikkia kohtauksia voi tunnistaa samalla tavalla. Auttajan tehtävä on turvata henkilö ja hälyttää apua tarpeen mukaan, ei ratkaista diagnoosia.",
        "Poista läheltä vaaralliset esineet ja suojaa päätä pehmeästi. Älä estä liikkeitä voimalla äläkä laita suuhun mitään. Seuraa kohtauksen kestoa. Soita 112 heti, jos syy on tuntematon; myös tunnetun epilepsian pitkittyvä tai uusiutuva kohtaus vaatii kiireellistä apua. Tarkistettu SPR-ohje neuvoo hälyttämään, jos epileptikon kohtaus kestää yli kaksi minuuttia tai uusiutuu. Kun liikkeet sallivat, varmista hengitys ja käännä normaalisti hengittävä tajuton kylkiasentoon.",
      ],
      diagram: {
        title: "Suojaa ja seuraa",
        steps: [
          "Tilaa ympärille ja pään suoja",
          "Ei voimaa, ei mitään suuhun",
          "Seuraa aikaa, 112 tarvittaessa heti",
          "Kohtauksen jälkeen hengitys ja kylkiasento",
        ],
      },
      example:
        "Ensimmäistä kertaa nähty kohtaus on syy soittaa 112 heti. Auttaja voi samalla siirtää tuolin pois pään läheltä.",
      terms: [
        {
          word: "Epilepsia",
          definition:
            "Neurologinen sairaus, johon liittyy alttius toistuville epileptisille kohtauksille.",
        },
        {
          word: "Kouristuskohtaus",
          definition:
            "Tahdosta riippumattomia lihasliikkeitä sisältävä kohtaus, jolla voi olla useita syitä.",
        },
      ],
      recall: {
        prompt:
          "Mitä kahta asiaa kouristelevalle ei tehdä, ja mitä tarkistetaan jälkeenpäin?",
        model:
          "Liikkeitä ei estetä voimalla eikä suuhun laiteta mitään. Kohtauksen jälkeen tarkistetaan normaali hengitys ja tuetaan tajuton tarvittaessa kylkiasentoon.",
        rubric: ["Kaksi vältettävää tekoa", "Hengityksen arviointi"],
      },
      questions: [
        [
          "Mikä on turvallinen toimi?",
          [
            "Pidän raajat väkisin paikallaan.",
            "Laitan lusikan suuhun.",
            "Poistan vaaralliset esineet ja suojaan päätä.",
          ],
          2,
          "Väkisin estäminen voi vahingoittaa ja esine suussa voi tukkia hengityksen tai rikkoa hampaita.",
        ],
        [
          "Et tiedä kohtauksen syytä. Milloin hälytät?",
          [
            "Heti 112",
            "Vasta seuraavana päivänä",
            "Vain jos autettava itse käskee kohtauksen aikana",
          ],
          0,
          "Tuntematon kouristuskohtaus voi olla vakava. Hälyttämistä ei tarvitse lykätä diagnoosin varmistamiseksi.",
        ],
      ],
      application: {
        prompt:
          "Kuvaile turvallinen auttaminen tuntemattoman henkilön kouristuskohtauksessa ja sen päätyttyä.",
        model:
          "Soitan 112, poistan vaaralliset esineet ja suojaan päätä. En estä liikkeitä enkä laita mitään suuhun. Seuraan aikaa ja kohtauksen jälkeen normaalia hengitystä; normaalisti hengittävä tajuton käännetään kyljelleen. Epänormaalissa hengityksessä aloitan elvytyksen ohjeilla.",
        rubric: [
          "Turva ja hälytys",
          "Ei rajoittamista tai suuhun laitettavaa",
          "Hengityksen mukainen jatkotoimi",
        ],
      },
      source,
    }),
    lesson("8.3", 4, {
      title: "Sokeria vain turvallisesti nielevälle",
      hook: "Diabeetikko on hikinen ja vapisee. Hän on ensin hereillä, mutta sitten ei enää reagoi. Miten toiminta muuttuu?",
      paragraphs: [
        "Hypoglykemia tarkoittaa liian matalaa verensokeria. Diabetes on ryhmä sairauksia, joissa verensokerin säätely on häiriintynyt; osa tarvitsee insuliinihoitoa. Hoitoon nähden liian vähäinen ruoka tai muu muutos voi laskea verensokeria liikaa. Oireita voivat olla vapina, hikoilu, heikotus, ärtyisyys ja sekavuus. Oireinen henkilö tarvitsee apua, ei syytöstä huonosta käytöksestä.",
        "Kun henkilö on hereillä ja pystyy nielemään turvallisesti, annetaan nopeasti sokeripitoista syötävää tai juotavaa hänen ohjeensa mukaan ja seurataan vointia. Jos hän ei pysty nielemään, tajunta heikkenee tai tila on vakava, soita 112. Tajuttomalle ei anneta mitään suuhun, ei myöskään hunajaa; kirjan vanha ehdotus on vaarallinen. Avaa hengitystie, arvioi normaali hengitys ja valitse kylkiasento tai elvytys sen mukaan. Insuliinia ei anneta matalan verensokerin ensiavuksi.",
      ],
      diagram: {
        title: "Tajunta ja nieleminen ratkaisevat",
        steps: [
          "Hereillä ja nielee turvallisesti → sokeria",
          "Ei niele / tajunta heikkenee → 112",
          "Tajuton → ei mitään suuhun",
          "Normaali hengitys → kylkiasento; muuten elvytys",
        ],
      },
      example:
        "Sokeriton juoma ei korjaa matalaa verensokeria. Tajuttomalle tavallinenkaan mehu ei ole turvallinen, koska se voi joutua hengitysteihin.",
      terms: [
        {
          word: "Hypoglykemia",
          definition: "Liian matala veren glukoosipitoisuus.",
        },
        {
          word: "Insuliini",
          definition:
            "Hormoni, joka auttaa glukoosia siirtymään verestä solujen käyttöön ja laskee verensokeria.",
        },
      ],
      recall: {
        prompt:
          "Mikä ratkaisee, voiko matalan verensokerin ensiavuksi antaa sokeria suun kautta?",
        model:
          "Henkilön pitää olla hereillä ja pystyä nielemään turvallisesti. Tajuttomalle tai huonosti nielevälle ei anneta mitään suuhun vaan hälytetään apua.",
        rubric: [
          "Hereillä ja turvallinen nieleminen",
          "Ei mitään tajuttoman suuhun ja 112",
        ],
      },
      questions: [
        [
          "Mitä teet tajuttomalle, jolla epäillään matalaa verensokeria?",
          [
            "Sivelen hunajaa suuhun.",
            "Kaadan mehua suuhun.",
            "Soitan 112 ja turvaan hengityksen; en anna mitään suuhun.",
          ],
          2,
          "Suun kautta annettu aine voi joutua tajuttoman hengitysteihin. Hunajakin on tässä vaarallinen.",
        ],
        [
          "Mikä auttaa hereillä olevaa turvallisesti nielevää matalassa verensokerissa?",
          [
            "Sokeripitoinen juoma oman ohjeen mukaan",
            "Lisäinsuliini omin päin",
            "Pelkkä sokeriton juoma",
          ],
          0,
          "Sokeri nostaa verensokeria. Insuliini voi laskea sitä lisää, eikä sokeriton juoma tuo tarvittavaa sokeria.",
        ],
      ],
      application: {
        prompt:
          "Vertaile hereillä olevan ja tajuttoman hypoglykemian ensiapua. Perustele ero hengitysteiden turvallisuudella.",
        model:
          "Hereillä olevalle turvallisesti nielevälle voi antaa sokeria suun kautta. Tajuttoman nieleminen ei ole turvallista, joten suuhun ei laiteta mitään. Soitan 112, arvioin normaalin hengityksen ja annan kylkiasento- tai elvytysavun sen mukaan.",
        rubric: [
          "Hereillä olevan sokeriapu ehdollisena",
          "Tajuttoman tukehtumisvaara",
          "112 ja hengityksen mukainen toiminta",
        ],
      },
      source,
    }),
  ],
};
