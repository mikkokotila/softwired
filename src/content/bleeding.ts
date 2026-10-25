import { lesson, type Section } from "./types";
const source = {
  pdf: [60, 62] as [number, number],
  book: [123, 125] as [number, number],
};
export const bleeding: Section = {
  id: "8.4",
  title: "Verenvuoto",
  description: "Vuodon tunnistaminen, painaminen, suojaus ja sokki.",
  group: "Ensiapu",
  color: "blue",
  source,
  lessons: [
    lesson("8.4", 1, {
      title: "Kaikki vaarallinen vuoto ei näy ulospäin",
      hook: "Onnettomuuden jälkeen ihminen on kalpea ja heikko, mutta suurta haavaa ei näy. Voiko verta silti vuotaa vaarallisesti?",
      paragraphs: [
        "Veri kuljettaa happea ja ravintoaineita, osallistuu puolustukseen ja hyytymiseen. Valtimot kuljettavat verta sydämestä poispäin ja laskimot takaisin sydämeen. Vaurioituneesta suonesta voi vuotaa verta ihon ulkopuolelle tai kehon sisään. Pienen pintahaavan ja suuren suonivaurion vakavuus voi erota paljon, mutta ulkonäöstä ei voi aina päätellä kokonaisuutta.",
        "Ulkoinen verenvuoto näkyy, kun veri tulee haavasta ulos. Sisäinen vuoto voi jäädä näkymättömäksi esimerkiksi vatsan tai rintakehän vamman jälkeen. Vakavan tapaturman jälkeinen heikotus, kalpeus, kylmänhikisyys tai sekavuus voivat viitata verenkierron heikkenemiseen. Epäillyssä vakavassa sisäisessä vuodossa soitetaan 112. Tarkka verisuonityyppi tai arvio litroista ei ole ensiavun aloittamisen edellytys. Arvioi myös tapahtumamekanismi ja yleisvointi.",
      ],
      diagram: {
        title: "Näkyminen ei ratkaise vakavuutta",
        steps: [
          "Ulkoinen: veri näkyy haavasta",
          "Sisäinen: veri jää kudoksiin tai onteloihin",
          "Molemmat voivat heikentää verenkiertoa",
        ],
      },
      example:
        "Pieni otsahaava voi näyttää sotkuiselta, kun taas vakavan vatsavamman vuoto ei näy. Pelkkä näkyvän veren määrä ei riitä arvioksi.",
      terms: [
        {
          word: "Sisäinen verenvuoto",
          definition: "Veren vuotaminen verisuonesta elimistön sisään.",
        },
        {
          word: "Valtimo",
          definition: "Verisuoni, joka kuljettaa verta sydämestä poispäin.",
        },
      ],
      recall: {
        prompt:
          "Vertaile sisäistä ja ulkoista verenvuotoa. Miksi näkyvä veri ei yksin kerro vakavuutta?",
        model:
          "Ulkoisessa vuoto tulee näkyviin, sisäisessä se jää kehon sisään. Suuri sisäinen vuoto voi olla hengenvaarallinen ilman näkyvää haavaa.",
        rubric: ["Vuodon sijainnin ero", "Näkymättömänkin vuodon vaara"],
      },
      questions: [
        [
          "Vakavan iskun jälkeen ei näy verta. Mitä voit päätellä?",
          [
            "Sisäinen vuoto on varmasti poissuljettu.",
            "Yleisvointi ja tapahtuma on silti arvioitava.",
            "Kalpeudella ei voi olla merkitystä.",
          ],
          1,
          "Sisäinen vuoto ei näy. Tapahtuman vakavuus ja verenkierron häiriön merkit voivat paljastaa vaaran.",
        ],
        [
          "Mitä valtimot tekevät?",
          [
            "Kuljettavat verta sydämestä poispäin",
            "Kuljettavat aina vain laskimoverta",
            "Ovat vain ihon pinnassa",
          ],
          0,
          "Suonen suunta suhteessa sydämeen määrittää valtimon. Suuret suonet kulkevat usein syvällä.",
        ],
      ],
      application: {
        prompt:
          "Perustele, miksi vakavan kaatumisen jälkeen kalpea ja sekava henkilö tarvitsee apua ilman näkyvää haavaakin.",
        model:
          "Sisäinen vuoto voi jäädä piiloon ja vähentää kiertävää verimäärää. Kalpeus ja sekavuus voivat olla verenkierron häiriön merkkejä. Soitan 112 ja seuraan hengitystä sekä vointia ohjeiden mukaan.",
        rubric: [
          "Sisäisen vuodon mahdollisuus",
          "Oireiden yhteys verenkiertoon",
          "Kiireellinen hälytys ja seuranta",
        ],
      },
      source,
    }),
    lesson("8.4", 2, {
      title: "Runsasta vuotoa painetaan heti",
      hook: "Haavasta vuotaa runsaasti verta. Odotatko täydellistä sidetarvikesarjaa ennen auttamista?",
      paragraphs: [
        "Runsas verenvuoto voi nopeasti vähentää kiertävää verimäärää. Ulkoisen vuodon tärkeä ensiapu on suora, tiukka painaminen vuotokohdasta. Autettavaa voi pyytää painamaan itse, jos hän pystyy. Käytä mahdollisuuksien mukaan suojaa ja puhdasta sidosta, mutta henkeä uhkaavan vuodon tyrehdyttämistä ei viivytetä täydellisten välineiden etsimiseksi.",
        "Hälytä vakavassa vuodossa 112 ja pyydä muita avuksi. Auta autettava lepoon, jatka painetta ja tee paineside, jos osaat ja välineitä on. Seuraa, tyrehdyttääkö paine vuodon. Haavassa kiinni olevaa vierasesinettä ei poisteta, vaan toimitaan hätäkeskuksen ohjeiden mukaan. Pidä henkilö lämpimänä ja tarkkaile vointia. Näyttävä puhdistaminen ei korvaa painetta silloin, kun verenvuoto on runsasta. Käytännön sidontatekniikka harjoitellaan ohjatusti.",
      ],
      diagram: {
        title: "Tyrehdyttämisen ydin",
        steps: [
          "Paina suoraan ja tiukasti",
          "112 vakavassa vuodossa",
          "Ylläpidä painetta ja side",
          "Lämpö, lepo ja seuranta",
        ],
      },
      example:
        "Jos paikalla on kaksi auttajaa, toinen ylläpitää painetta ja toinen soittaa. Näin vuodon hillintä ja avun hälytys voivat tapahtua rinnakkain.",
      terms: [
        {
          word: "Suora paine",
          definition:
            "Vuotokohdan painaminen mekaanisesti verenvuodon hillitsemiseksi.",
        },
        {
          word: "Paineside",
          definition: "Sidos, joka ylläpitää painetta vuotokohdassa.",
        },
      ],
      recall: {
        prompt: "Mikä on runsaan ulkoisen verenvuodon keskeinen ensiapu?",
        model:
          "Painan suoraan vuotokohtaa tiukasti, hälytän 112 vakavassa vuodossa ja ylläpidän painetta seuraten vointia.",
        rubric: ["Suora paine", "Hälytys ja paineen jatkuminen"],
      },
      questions: [
        [
          "Mikä on ensisijainen teko runsaassa ulkoisessa vuodossa?",
          [
            "Pitkä haavan pesu ennen kaikkea muuta",
            "Suora tiukka paine vuotokohtaan",
            "Vuodon kuvaaminen",
          ],
          1,
          "Suora paine hillitsee veren menetystä. Kiireellisessä tilanteessa pesu ei saa viivyttää sitä.",
        ],
        [
          "Haavassa on kiinni vierasesine. Mitä teet?",
          [
            "Vedän sen aina irti.",
            "En poista sitä; hälytän apua ja noudatan ohjeita.",
            "Työnnän sen syvemmälle.",
          ],
          1,
          "Poistaminen voi pahentaa vuotoa tai vauriota. Tilanteeseen tarvitaan ohjattu ensiapu ja jatkohoito.",
        ],
      ],
      application: {
        prompt:
          "Kuvaile kahden auttajan työnjako runsaassa ulkoisessa verenvuodossa ja perustele järjestys.",
        model:
          "Ensimmäinen painaa vuotokohtaa heti suojan avulla ja jatkaa painetta. Toinen soittaa 112 ja hakee tarvikkeita. Henkilö autetaan lepoon ja pidetään lämpimänä. Painetta ei keskeytetä välineiden etsimiseksi, koska veren menetys jatkuu muuten.",
        rubric: [
          "Paine välittömästi",
          "Hälytys rinnakkain",
          "Jatkuvuuden ja levon perustelu",
        ],
      },
      source,
    }),
    lesson("8.4", 3, {
      title: "Suojaus kuuluu auttamiseen",
      hook: "Sinulla on pieni haava kädessä ja toisella vuotava haava. Miksi suojakäsine on hyödyllinen molemmille?",
      paragraphs: [
        "Veri voi välittää taudinaiheuttajia, vaikka henkilö vaikuttaisi terveeltä. Suojakäsineet ja omien haavojen peittäminen vähentävät veren pääsyä rikkoutuneelle iholle tai limakalvoille. Puhtaat sidokset vähentävät myös lian pääsyä autettavan haavaan. Turvallinen auttaminen suojaa siis sekä auttajaa että autettavaa.",
        "Jos mahdollista, pyydä tajuissaan olevaa autettavaa painamaan haavaansa itse samalla kun järjestät suojan ja avun. Henkeä uhkaavan vuodon tyrehdyttäminen on kiireellistä; toiminta sovitetaan välineisiin ja 112:n ohjeisiin. Suojakäsineet eivät korvaa käsien pesua auttamisen jälkeen. Jos verta päätyy rikkoutuneelle iholle tai limakalvolle, puhdista altistunut kohta ja kysy terveydenhuollosta nopeasti toimintaohje. Altistumista ei pidä salata häpeän vuoksi.",
      ],
      diagram: {
        title: "Kaksi suojaussuuntaa",
        steps: [
          "Auttajan suoja: käsineet ja peitetyt haavat",
          "Autettavan suoja: puhdas sidos",
          "Jälkeen: käsihygienia ja altistuksen arvio",
        ],
      },
      example:
        "Ensiapulaukussa olevat käsineet löytyvät nopeasti, jos niiden paikka on tarkistettu etukäteen. Varautuminen pienentää viivettä.",
      terms: [
        {
          word: "Verialtistus",
          definition:
            "Tilanne, jossa toisen verta pääsee esimerkiksi rikkoutuneelle iholle tai limakalvolle.",
        },
        {
          word: "Suojakäsine",
          definition:
            "Auttamisessa käytettävä suoja, joka vähentää suoraa kosketusta vereen ja eritteisiin.",
        },
      ],
      recall: {
        prompt: "Miten suojaat sekä auttajaa että autettavaa verenvuodossa?",
        model:
          "Käytän käsineitä ja peitän omat haavat. Autettavan vuotoon käytän mahdollisuuksien mukaan puhdasta sidosta. Lopuksi huolehdin käsihygieniasta.",
        rubric: ["Auttajan suoja", "Puhtaus ja jälkihygienia"],
      },
      questions: [
        [
          "Voiko terveen näköisen veri sisältää taudinaiheuttajia?",
          [
            "Kyllä, siksi suojaudutaan.",
            "Ei koskaan.",
            "Vain jos veri näyttää tummalta.",
          ],
          0,
          "Ulkonäkö ei kerro kaikkia infektioita. Veren väri ei ole tartuntariskin mittari.",
        ],
        [
          "Miksi käsien pesu tarvitaan käsineiden jälkeenkin?",
          [
            "Käsineet eivät korvaa käsihygieniaa.",
            "Pesu poistaa tarpeen hälyttää apua.",
            "Käsineet tekevät kaiken lian näkyväksi.",
          ],
          0,
          "Käsineiden käyttö ja poistaminen eivät takaa käsien täydellistä puhtautta.",
        ],
      ],
      application: {
        prompt:
          "Suunnittele koulun ensiapupisteeseen kaksi varautumistoimea ja perustele ne veren kanssa toimimisen näkökulmasta.",
        model:
          "Varmistetaan helposti löytyvät suojakäsineet, jotta veren kosketusta rikkoutuneeseen ihoon voi vähentää nopeasti. Säilytetään puhtaita sidoksia saatavilla, jotta painaminen onnistuu ja haavaan joutuva lika vähenee.",
        rubric: [
          "Nopeasti saatava auttajan suoja",
          "Puhdas painamiseen sopiva materiaali",
          "Molempien perustelu",
        ],
      },
      source,
    }),
    lesson("8.4", 4, {
      title: "Vuotosokki on verenkierron hätätila",
      hook: "Runsaasti vuotanut on kalpea, kylmänhikinen ja levoton. Onko kyse vain säikähtämisestä?",
      paragraphs: [
        "Verenkiertosokissa kudokset eivät saa riittävästi verta ja happea. Runsas sisäinen tai ulkoinen verenvuoto voi aiheuttaa vuotosokin, kun kiertävä verimäärä vähenee. Elimistö yrittää korjata tilannetta muun muassa nopeuttamalla sykettä. Oireita voivat olla kalpeus, kylmänhikisyys, tihentynyt hengitys, heikotus, levottomuus ja myöhemmin sekavuus.",
        "Verenkiertosokki on eri asia kuin kriisin psyykkinen sokkivaihe, vaikka sanat muistuttavat toisiaan. Vakavassa vuodossa tyrehdytä näkyvä vuoto ja soita 112. Auta henkilö makuulle, pidä lämpimänä ja rauhoita. Älä tarjoa syötävää tai juotavaa, vaikka hän valittaisi janoa. Seuraa reagointia ja normaalia hengitystä sekä jatka hätäkeskuksen ohjeiden mukaan. Kylmälle alustalle eristäminen auttaa vähentämään lämmönhukkaa. Sokin epäilyä ei tarvitse varmistaa mittarilla ennen hälytystä.",
      ],
      diagram: {
        title: "Vuotosokin ketju",
        steps: [
          "Veren menetys",
          "Kiertävä verimäärä vähenee",
          "Kudosten hapensaanti heikkenee",
          "112, vuodon hallinta, lämpö ja seuranta",
        ],
      },
      example:
        "Janoinen vuotopotilas ei saa juomaa ensiapuna. Kiireellistä on vuodon hillintä ja ammattiapu, ei janontunteen hoitaminen.",
      terms: [
        {
          word: "Verenkiertosokki",
          definition:
            "Hengenvaarallinen tila, jossa kudosten veren- ja hapensaanti on riittämätöntä.",
        },
        {
          word: "Vuotosokki",
          definition: "Veren menetyksen aiheuttama verenkiertosokki.",
        },
      ],
      recall: {
        prompt:
          "Miten vuotosokki syntyy ja miten se eroaa psyykkisestä sokista?",
        model:
          "Veren menetys vähentää kiertävää verimäärää ja kudosten hapensaantia. Se on verenkierron hätätila, kun taas psyykkinen sokki on järkytyksen ensireaktio.",
        rubric: [
          "Verimäärä ja hapensaanti",
          "Fyysinen ja psyykkinen käsite erotettu",
        ],
      },
      questions: [
        [
          "Mikä yhdistelmä sopii verenkiertosokin epäilyyn?",
          [
            "Kalpeus, kylmänhikisyys ja heikotus vamman jälkeen",
            "Pelkkä tavallinen ilo",
            "Aina täysin normaali vointi",
          ],
          0,
          "Verenkierron heikkeneminen voi näkyä ihossa, hengityksessä ja tajunnassa.",
        ],
        [
          "Mitä teet janoiselle, jolla epäillään vuotosokkia?",
          [
            "Annan runsaasti juotavaa.",
            "Soitan 112, hillitsen vuotoa ja pidän lämpimänä ilman suun kautta annettavaa.",
            "Pyydän juoksemaan verenkierron lisäämiseksi.",
          ],
          1,
          "Sokki vaatii kiireellistä apua, lepoa ja seurantaa. Syömistä tai juomista ei tarjota.",
        ],
      ],
      application: {
        prompt:
          "Selitä runsaan verenvuodon, kalpeuden ja sekavuuden syy-yhteys. Kuvaa turvallinen ensiapu.",
        model:
          "Vuoto vähentää kiertävää verimäärää, joten kudosten hapensaanti heikkenee ja sokin oireita voi syntyä. Painan näkyvää vuotoa, soitan 112, autan makuulle ja pidän lämpimänä. En anna suuhun mitään ja seuraan hengitystä.",
        rubric: [
          "Verimäärän ja hapensaannin ketju",
          "Paine ja 112",
          "Lepo, lämpö ja seuranta ilman juotavaa",
        ],
      },
      source,
    }),
  ],
};
