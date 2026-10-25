import { lesson, type Section } from "./types";
const wellbeing = {
  pdf: [1, 4] as [number, number],
  book: [8, 11] as [number, number],
};
const family = {
  pdf: [5, 8] as [number, number],
  book: [12, 15] as [number, number],
};
const crisis = {
  pdf: [9, 12] as [number, number],
  book: [20, 23] as [number, number],
};
export const mind: Section[] = [
  {
    id: "1.1",
    title: "Kun mieli voi hyvin",
    description: "Tunteet, vahvuudet ja arjen voimavarat.",
    group: "Mieli ja ihmissuhteet",
    color: "lilac",
    source: wellbeing,
    lessons: [
      lesson("1.1", 1, {
        title: "Hyvinvointi ei tarkoita ikuista hyvää tuulta",
        hook: "Aamu alkoi huonosti, mutta iltapäivällä naurat ystävän kanssa. Voiko mielesi silti voida hyvin?",
        paragraphs: [
          "Mielenterveys on voimavara: se auttaa ajattelemaan, oppimaan, olemaan toisten kanssa ja selviytymään arjen vaikeuksista. Se ei ole sama asia kuin jatkuva onnellisuus tai pelkkä sairauden puuttuminen. Myös suru, pettymys ja jännitys kuuluvat elämään, jossa mieli voi hyvin. Mieliala tarkoittaa pidempään vallitsevaa tunnetilaa; yksittäinen tunne voi vaihtua nopeammin.",
          "Hyvinvointi vaihtelee kuormituksen ja palautumisen mukana. Riittävä uni, ruoka, liike, mielekäs tekeminen ja turvalliset ihmissuhteet vahvistavat voimavaroja. Kiusaaminen, yksinäisyys ja jatkuva stressi voivat heikentää niitä. Vaikeudet eivät ole yksilön syy. Jos paha olo jatkuu tai haittaa arkea, kouluterveydenhoitaja tai muu turvallinen aikuinen voi auttaa. Apua saa pyytää jo ennen kuin tilanne tuntuu vakavalta.",
        ],
        diagram: {
          title: "Voimavarat elävät arjessa",
          steps: [
            "Kuormitus kuluttaa",
            "Lepo ja yhteys palauttavat",
            "Tuki auttaa tasapainoon",
          ],
        },
        example:
          "Kokeesta saatu heikko numero harmittaa. Oppilas puhuu opettajalle ja tekee realistisen harjoittelusuunnitelman. Harmitus ei todista huonoa mielenterveyttä.",
        terms: [
          {
            word: "Mielenterveys",
            definition: "Mielen hyvinvoinnin ja toimintakyvyn voimavara.",
          },
          {
            word: "Mieliala",
            definition:
              "Jonkin aikaa vallitseva tunnetila, esimerkiksi alakuloisuus tai iloisuus.",
          },
        ],
        recall: {
          prompt:
            "Määrittele mielenterveys omin sanoin. Miksi surullinenkin voi voida hyvin?",
          model:
            "Mielenterveys auttaa toimimaan arjessa ja käsittelemään vaikeuksia. Suru on normaali tunne; hyvinvointi ei vaadi jatkuvaa iloisuutta.",
          rubric: [
            "Voimavara ja arjen toimintakyky",
            "Tunteiden vaihtelu kuuluu hyvinvointiin",
          ],
        },
        questions: [
          [
            "Mikä kertoo parhaiten mielen hyvinvoinnista?",
            [
              "En tunne koskaan surua.",
              "Pystyn käsittelemään tunteita ja hakemaan tukea.",
              "Selviän aina yksin.",
            ],
            1,
            "Hyvinvointiin kuuluu tunteiden käsittely ja tukeen turvautuminen. Suruttomuus tai yksin selviytyminen eivät ole sen mittareita.",
          ],
          [
            "Mikä on suojaava tekijä?",
            [
              "Turvallinen ystävyyssuhde",
              "Jatkuva valvominen",
              "Kiusaamisen vähättely",
            ],
            0,
            "Luotettava ihmissuhde vahvistaa kuulumisen tunnetta. Valvominen kuormittaa ja kiusaaminen heikentää turvallisuutta.",
          ],
        ],
        application: {
          prompt:
            "Selitä kaverille, miksi yhden huonon päivän perusteella ei voi päätellä koko mielenterveyden tilaa. Anna myös yksi avun hakemisen peruste.",
          model:
            "Mieliala vaihtelee esimerkiksi unen ja tapahtumien mukaan. Mielenterveys on laajempi voimavara kuin päivän tunnetila. Jos paha olo jatkuu tai koulunkäynti vaikeutuu, kannattaa puhua turvalliselle aikuiselle.",
          rubric: [
            "Erotat mielialan ja mielenterveyden",
            "Perustelet vaihtelun esimerkillä",
            "Nimeät avun tarpeen ja auttajan",
          ],
        },
        source: wellbeing,
      }),
      lesson("1.1", 2, {
        title: "Tunne on viesti, teko on valinta",
        hook: "Ryhmätyösi idea ohitetaan. Suutut ja tekisi mieli lähettää loukkaava viesti. Mitä voit tehdä ennen lähettämistä?",
        paragraphs: [
          "Tunteet kertovat, mikä on meille merkityksellistä. Pelko voi varoittaa vaarasta, viha kertoa koetusta epäoikeudenmukaisuudesta ja suru menetyksestä. Kaikkia tunteita saa tuntea, mutta tunne ei oikeuta vahingoittamaan ketään. Tunne ja käyttäytyminen ovat eri asioita. Tunne voi tuntua kehossa: sydän hakkaa, kädet hikoavat tai hartiat jännittyvät.",
          "Tunnetaito alkaa huomaamisesta ja nimeämisestä. Pysähdy, hengitä rauhallisesti ja kysy, mitä tarvitset. Kun voimakkain kuohu laskee, voit sanoittaa asian minäviestillä: minua harmitti, kun ideaani ei kuunneltu. Toisen tunteen ymmärtäminen on empatiaa; se ei edellytä kaikesta samaa mieltä olemista. Taitoja opitaan harjoittelemalla ja keskustelemalla, eikä onnistuminen vaadi tunteen poistamista.",
        ],
        diagram: {
          title: "Tauko ennen toimintaa",
          steps: [
            "Huomaa kehon viesti",
            "Nimeä tunne",
            "Valitse turvallinen teko",
            "Kerro tarpeesi",
          ],
        },
        example:
          "Sen sijaan että haukkuisi ryhmän, oppilas pyytää minuutin tauon ja sitten puheenvuoron. Viha saa olla olemassa, mutta teko muuttuu.",
        terms: [
          {
            word: "Tunnetaidot",
            definition: "Kyky havaita, nimetä, ilmaista ja säädellä tunteita.",
          },
          {
            word: "Empatia",
            definition: "Toisen kokemuksen ja tunteen ymmärtämisen taito.",
          },
        ],
        recall: {
          prompt: "Miten tunne ja teko eroavat toisistaan?",
          model:
            "Tunne syntyy usein tahtomatta. Tekoon voi vaikuttaa: suuttunutkin voi valita asiallisen viestin loukkaamisen sijaan.",
          rubric: ["Tunne ei ole väärä", "Toimintaa voi säädellä"],
        },
        questions: [
          [
            "Mikä on toimiva minäviesti?",
            [
              "Olet aina itsekäs.",
              "Minua harmitti, kun jäin ilman puheenvuoroa.",
              "Kaikki muutkin vihaavat sinua.",
            ],
            1,
            "Minäviesti kuvaa omaa kokemusta ja tapahtumaa. Syyttävät yleistykset vaikeuttavat kuuntelemista.",
          ],
          [
            "Mitä empatia tarkoittaa riitatilanteessa?",
            [
              "Hyväksyn kaiken, mitä toinen tekee.",
              "Poistan toisen ikävän tunteen.",
              "Yritän ymmärtää, miltä toisesta tuntuu.",
            ],
            2,
            "Ymmärtäminen ja tekojen hyväksyminen ovat eri asioita. Empatia ei myöskään anna valtaa poistaa toisen tunteita.",
          ],
        ],
        application: {
          prompt:
            "Sovella tunnetaitoja tilanteeseen, jossa kaveri peruu tapaamisen ja suututtaa. Kuvaa kolme askelta.",
          model:
            "Huomaan jännittyneet hartiat ja nimeän pettymyksen. Pidän tauon ennen viestiä. Kerron rauhallisesti, että peruminen harmitti, ja kysyn uutta aikaa syyttelyn sijaan.",
          rubric: [
            "Huomaat ja nimeät tunteen",
            "Säätelet toimintaa tauolla",
            "Ilmaiset tarpeen ilman loukkaamista",
          ],
        },
        source: wellbeing,
      }),
      lesson("1.1", 3, {
        title: "Arvosi ei riipu yhdestä numerosta",
        hook: "Sait kokeesta kuutosen. Onko päätelmä ”olen tyhmä” sama asia kuin ”en vielä osannut tätä aihetta”?",
        paragraphs: [
          "Itsetunto tarkoittaa kokemusta omasta arvosta: olen tärkeä ja hyväksyttävä myös keskeneräisenä. Minäkuva taas on käsitys siitä, millainen olen, esimerkiksi millaisena ystävänä tai oppijana näen itseni. Yhden taidon arvio ei ole koko ihmisen arvio. Hyvä itsetunto ei tarkoita paremmuutta muihin nähden eikä sitä, että kaikki sujuu helposti.",
          "Itsetunto vahvistuu hyväksynnästä, realistisesta palautteesta ja kokemuksista, joissa huomaa oppivansa. Vahvuus voi olla kuunteleminen, uteliaisuus tai avun pyytäminen, ei vain näkyvä saavutus. Vertailu valikoituihin somehetkiin voi vääristää minäkuvaa. Kannustava sisäinen puhe on todenmukaista: tämä ei vielä onnistunut, mutta voin harjoitella yhden asian kerrallaan. Oman arvon ei tarvitse odottaa onnistumista.",
        ],
        diagram: {
          title: "Erota ihminen ja suoritus",
          steps: [
            "Tulos: tämä koe ei sujunut",
            "Tulkinta: mikä jäi epäselväksi?",
            "Teko: harjoittelen ja pyydän palautetta",
          ],
        },
        example:
          "”Olen huono kaikessa” muuttuu lauseeksi ”ensiapukäsitteet menivät sekaisin; vertailen niitä seuraavaksi”. Jälkimmäinen on tarkempi ja auttaa toimimaan.",
        terms: [
          {
            word: "Itsetunto",
            definition: "Kokemus omasta arvokkuudesta ja hyväksyttävyydestä.",
          },
          {
            word: "Minäkuva",
            definition:
              "Käsitys omista ominaisuuksista ja siitä, millainen itse on.",
          },
        ],
        recall: {
          prompt:
            "Vertaile itsetuntoa ja minäkuvaa: mitä kumpikin käsite kuvaa?",
          model:
            "Itsetunto liittyy siihen, pidänkö itseäni arvokkaana. Minäkuva kuvaa käsitystäni ominaisuuksistani, esimerkiksi ujoudesta tai taidoista.",
          rubric: ["Oman arvon kokemus", "Ominaisuuksia koskeva käsitys"],
        },
        questions: [
          [
            "Mikä palaute vahvistaa realistista oppimista?",
            [
              "Olet ainoa fiksu oppilas.",
              "Perustelusi selkeni, kun lisäsit esimerkin.",
              "Numero kertoo koko arvosi.",
            ],
            1,
            "Tarkka palaute kertoo, mikä toiminnassa onnistui. Paremmuuteen tai ihmisarvoon sidottu palaute vääristää arviointia.",
          ],
          [
            "Mikä päätelmä seuraa heikosta koetuloksesta?",
            [
              "Ihmisarvoni väheni.",
              "En voi oppia tätä.",
              "Tarvitsen lisää harjoittelua joihinkin asioihin.",
            ],
            2,
            "Tulos kuvaa senhetkistä suoritusta. Se ei määritä ihmisarvoa eikä oppimisen mahdollisuuksia.",
          ],
        ],
        application: {
          prompt:
            "Perustele, miksi sosiaalisen median vertailu voi heikentää minäkuvaa. Ehdota yksi suojaava toimintatapa.",
          model:
            "Somessa näkyvät usein valitut onnistumiset, eivät koko arki. Niihin vertaaminen voi saada omat tavalliset vaikeudet näyttämään poikkeavilta. Voin rajata vertailua ja huomata omat vahvuuteni myös ruudun ulkopuolella.",
          rubric: [
            "Tunnistat valikoituneen aineiston",
            "Selität vaikutuksen omaan käsitykseen",
            "Ehdotat realistisen keinon",
          ],
        },
        source: wellbeing,
      }),
      lesson("1.1", 4, {
        title: "Pärjääminen rakentuu myös tuesta",
        hook: "Koeviikko, myöhäiset treenit ja viestitulva vievät voimat. Mitä muuttaisit ensin?",
        paragraphs: [
          "Arjen rytmi tukee sekä kehoa että mieltä. Säännölliset ateriat, riittävä uni, sopiva liike ja tauot auttavat keskittymään ja säätelemään tunteita. Kuuluminen ryhmään ja mahdollisuus olla oma itsensä lisäävät turvallisuutta. Suojaavat tekijät eivät takaa vaikeudetonta elämää, mutta ne auttavat kestämään kuormitusta ja palautumaan.",
          "Pärjäävyyden tunne syntyy siitä, että kokee voivansa vaikuttaa tilanteeseen ja löytää keinoja vaikeuksissa. Sinnikkyys tarkoittaa tarkoituksenmukaista jatkamista, ei uupumiseen asti suorittamista. Tehtävän pilkkominen, realistinen tavoite ja avun pyytäminen ovat aktiivisia selviytymiskeinoja. Jos kuormaa on liikaa, myös ympäristöä ja odotuksia pitää muuttaa. Hyvinvointi ei ole pelkkä yksilön tahdonvoimakoe.",
        ],
        diagram: {
          title: "Pieni palautumissuunnitelma",
          steps: [
            "Tunnista kuormittaja",
            "Valitse yksi muutos",
            "Pyydä tarvittaessa tukea",
            "Arvioi vaikutusta",
          ],
        },
        example:
          "Oppilas sopii valmentajan kanssa kevyemmästä viikosta ja jättää puhelimen yöksi sivuun. Hän ei luovu tavoitteesta vaan tekee siitä mahdollisen.",
        terms: [
          {
            word: "Suojaava tekijä",
            definition:
              "Ominaisuus tai ympäristön asia, joka tukee hyvinvointia ja selviytymistä.",
          },
          {
            word: "Pärjäävyyden tunne",
            definition:
              "Luottamus siihen, että vaikeuksiin voi löytää keinoja ja apua.",
          },
        ],
        recall: {
          prompt: "Nimeä kaksi suojaavaa tekijää ja selitä yhden vaikutus.",
          model:
            "Turvallinen aikuinen ja säännöllinen uni suojaavat. Aikuiselle voi kertoa huolista ja saada apua, jolloin kuormaa ei tarvitse kantaa yksin.",
          rubric: ["Kaksi konkreettista tekijää", "Yhden vaikutus perusteltu"],
        },
        questions: [
          [
            "Mikä on kestävää sinnikkyyttä?",
            [
              "Jatkan nukkumatta tavoitteen vuoksi.",
              "Pilkon tehtävän ja pyydän tarvittaessa apua.",
              "En muuta suunnitelmaa koskaan.",
            ],
            1,
            "Sinnikkyys sisältää toimivien keinojen etsimisen. Levon ohittaminen heikentää toimintakykyä.",
          ],
          [
            "Mikä auttaa kuulumisen tunnetta?",
            [
              "Kaikkien pakottaminen samanlaisiksi",
              "Ulkopuolelle jätetyn huomioiminen",
              "Vain parhaiden palkitseminen",
            ],
            1,
            "Osallisuus syntyy mahdollisuudesta tulla hyväksytyksi. Yhdenmukaisuus tai pelkkä kilpailu eivät takaa sitä.",
          ],
        ],
        application: {
          prompt:
            "Laadi kuormittuneelle kuvitteelliselle oppilaalle kolmen kohdan arjen suunnitelma. Perustele jokainen kohta.",
          model:
            "Sovitaan säännöllinen nukkumaanmenoaika palautumisen vuoksi. Pilkotaan lukeminen lyhyisiin jaksoihin keskittymisen tueksi. Kerrotaan kuormasta aikuiselle, jotta aikataulua ja odotuksia voidaan muuttaa.",
          rubric: [
            "Lepo ja rytmi mukana",
            "Hallittava opiskeluteko perusteluineen",
            "Sosiaalinen tuki ja kuorman muuttaminen",
          ],
        },
        source: wellbeing,
      }),
    ],
  },
  {
    id: "1.2",
    title: "Perhe, rakkaus ja itsenäistyminen",
    description: "Turvalliset suhteet ja kasvava oma vastuu.",
    group: "Mieli ja ihmissuhteet",
    color: "lilac",
    source: family,
    lessons: [
      lesson("1.2", 1, {
        title: "Perheitä yhdistää huolenpito",
        hook: "Kaverit asuvat yhden vanhemman, kahden vanhemman tai isovanhemman kanssa. Mikä tekee suhteista turvallisia?",
        paragraphs: [
          "Perheen kokoonpano voi vaihdella. Ydinperheessä asuu vanhempia ja heidän lapsiaan, yhden vanhemman perheessä yksi vanhempi ja lapsia, ja uusperheessä ainakin toisella aikuisella on aiemmasta suhteesta lapsi. Sateenkaariperheiden vanhempiin kuuluu seksuaali- tai sukupuolivähemmistöihin kuuluvia ihmisiä. Myös sijaisperheet, adoptioperheet ja muut läheissuhteet kuuluvat perheiden moninaisuuteen.",
          "Perhemuoto ei yksin kerro, miten ihminen voi. Olennaista ovat turvallisuus, huolenpito, kunnioitus ja toimivat ihmissuhteet. Perheessä opitaan esimerkiksi arjen taitoja ja tunteiden käsittelyä, mutta kaikkea tukea ei tarvitse saada yhdestä paikasta. Ystävät, sukulaiset ja koulun aikuiset voivat täydentää turvaverkkoa. Toisen perhettä ei voi päätellä ulkonäöstä, eikä oma tapa elää ole kaikkien mittapuu.",
        ],
        diagram: {
          title: "Monia muotoja, yhteisiä tarpeita",
          steps: [
            "Turvallisuus",
            "Huolenpito",
            "Hyväksyntä",
            "Kuulluksi tuleminen",
          ],
        },
        example:
          "Kahdessa kodissa asuva nuori voi kokea molemmat kodit perheekseen. Ulkopuolinen ei päätä hänen puolestaan, ketkä ovat läheisiä.",
        terms: [
          {
            word: "Uusperhe",
            definition:
              "Perhe, jossa ainakin toisella aikuisella on lapsi aiemmasta suhteesta.",
          },
          {
            word: "Turvaverkko",
            definition: "Ihmiset ja palvelut, joilta voi saada apua ja tukea.",
          },
        ],
        recall: {
          prompt: "Miksi perhemuoto ei yksin kerro perheen hyvinvoinnista?",
          model:
            "Samanlaisissakin perhemuodoissa ihmissuhteet vaihtelevat. Turvallisuus ja huolenpito vaikuttavat enemmän kuin kokoonpanon nimi.",
          rubric: [
            "Kokoonpano ja suhteiden laatu erotettu",
            "Turvallisuus tai huolenpito nimetty",
          ],
        },
        questions: [
          [
            "Mikä on perusteltu päätelmä perheen nimestä?",
            [
              "Uusperheessä on aina riitaa.",
              "Yhden vanhemman perheessä ei voi olla turvallista.",
              "Nimi kuvaa rakennetta, ei automaattisesti ihmissuhteiden laatua.",
            ],
            2,
            "Perherakenne ei ole hyvinvoinnin mittari. Yleistykset peittävät yksilölliset tilanteet.",
          ],
          [
            "Kuka voi kuulua nuoren turvaverkkoon?",
            [
              "Vain samassa kodissa asuva",
              "Luotettava opettaja tai sukulainen",
              "Vain biologinen vanhempi",
            ],
            1,
            "Turvaverkko ulottuu kodin ulkopuolelle. Tukea voivat antaa monet luotettavat ihmiset.",
          ],
        ],
        application: {
          prompt:
            "Arvioi väitettä: ”Kaikilla turvallisilla perheillä on sama kokoonpano.” Perustele kahdella asialla.",
          model:
            "Väite ei pidä paikkaansa. Perheitä on monenlaisia, ja turvallisuus rakentuu kohtelusta ja huolenpidosta. Myös perheen ulkopuoliset läheiset voivat tukea arkea.",
          rubric: [
            "Hylkäät perusteettoman yleistyksen",
            "Nimeät moninaisuuden",
            "Perustelet suhteiden laadulla",
          ],
        },
        source: family,
      }),
      lesson("1.2", 2, {
        title: "Vanhemmuus on muutakin kuin biologinen suhde",
        hook: "Nuorella on biologinen vanhempi eri kaupungissa ja arjen kasvattaja kotona. Miten eri vanhemmuudet voivat näkyä?",
        paragraphs: [
          "Biologinen vanhemmuus tarkoittaa lapsen syntyyn liittyvää geneettistä tai biologista suhdetta. Juridinen eli oikeudellinen vanhemmuus on laissa tunnustettu suhde. Sosiaalinen vanhemmuus tarkoittaa käytännön arjen hoivaa ja kasvattamista. Samalla henkilöllä voi olla kaikki nämä roolit, mutta ne voivat myös jakautua eri ihmisille, kuten adoptioperheessä tai uusperheessä.",
          "Psykologinen vanhemmuus kuvaa lapsen kokemusta läheisestä kasvattajasta ja turvallisesta kiintymyssuhteesta. Sosiaalinen vanhemmuus painottaa arjen tekoja, psykologinen koettua suhdetta; usein ne toteutuvat yhdessä. Pitkäaikainen luotettava hoiva rakentaa perusluottamusta: lapsi oppii, että tarpeisiin vastataan ja että apua on saatavilla. Rakkauden ilmaisut voivat vaihdella perheiden ja kulttuurien välillä; olennaista on turvallisuus ja välittäminen, ei yksi pakollinen tapa osoittaa kiintymystä.",
          "Huoltajuus liittyy lapsen hoitoa, kasvatusta ja tärkeitä asioita koskevaan vastuuseen ja päätöksentekoon. Huoltaja ja vanhempi eivät ole käsitteinä täysin sama asia. Nuoren kokemus läheisyydestä ei aina seuraa juridisia nimikkeitä. Kokeessa käsitteet kannattaa ensin määritellä ja sitten näyttää esimerkillä, miten ne eroavat. Yksittäisten perheiden oikeudellisia ratkaisuja ei voi päätellä tästä oppitunnista.",
        ],
        diagram: {
          title: "Kolme näkökulmaa vanhemmuuteen",
          steps: [
            "Biologinen: synty ja perimä",
            "Juridinen: oikeudellinen suhde",
            "Sosiaalinen: arjen hoiva",
          ],
        },
        example:
          "Adoptiovanhempi on oikeudellinen vanhempi ja usein myös arjen hoivaaja. Biologinen suhde ja oikeudellinen suhde eivät siis aina osu samaan henkilöön.",
        terms: [
          {
            word: "Juridinen vanhemmuus",
            definition:
              "Oikeudellisesti vahvistettu vanhemman ja lapsen suhde.",
          },
          {
            word: "Sosiaalinen vanhemmuus",
            definition:
              "Arjen huolenpidossa ja kasvatuksessa toteutuva vanhemmuus.",
          },
        ],
        recall: {
          prompt: "Määrittele biologinen, juridinen ja sosiaalinen vanhemmuus.",
          model:
            "Biologinen liittyy syntyyn ja perimään, juridinen oikeudelliseen suhteeseen ja sosiaalinen arjen hoivaan ja kasvatukseen.",
          rubric: [
            "Kaikki kolme roolia erotettu",
            "Arjen hoiva ei vaadi biologista yhteyttä",
          ],
        },
        questions: [
          [
            "Mitä sosiaalinen vanhemmuus kuvaa?",
            [
              "Arjen hoivaa ja kasvattamista",
              "Vain yhteistä perimää",
              "Automaattisesti tuomioistuimen päätöstä",
            ],
            0,
            "Sosiaalinen vanhemmuus tarkoittaa käytännön suhdetta. Biologia ja oikeudellinen asema ovat eri näkökulmia.",
          ],
          [
            "Voivatko vanhemmuuden eri muodot olla samalla ihmisellä?",
            [
              "Eivät koskaan.",
              "Kyllä, mutta ne voivat myös jakautua.",
              "Vain biologinen on todellista vanhemmuutta.",
            ],
            1,
            "Käsitteet kuvaavat eri puolia, eivät toisiaan poissulkevia ihmistyyppejä.",
          ],
        ],
        application: {
          prompt:
            "Vertaile biologista ja sosiaalista vanhemmuutta keksityn perheen avulla. Älä käytä omia perhetietojasi.",
          model:
            "Kuvitteellisen Ainon biologinen vanhempi liittyy hänen syntyynsä ja perimäänsä. Kotona asuva kasvattaja huolehtii kouluaamuista ja kuuntelee huolia, joten hänellä on sosiaalisen vanhemman rooli. Roolit voivat myös olla samalla henkilöllä.",
          rubric: [
            "Biologinen suhde oikein",
            "Sosiaalinen rooli konkreettisena",
            "Roolien mahdollinen päällekkäisyys",
          ],
        },
        source: family,
      }),
      lesson("1.2", 3, {
        title: "Huolenpitoon kuuluu oikeuksia ja velvollisuuksia",
        hook: "Nuori haluaa päättää kaiken itse. Aikuinen taas päättää kuuntelematta. Kumpi tapa huomioi kasvun?",
        paragraphs: [
          "Lapsella on oikeus turvalliseen kasvuun, huolenpitoon ja arvostavaan kohteluun. Aikuisen vastuulla on huolehtia lapsen tarpeista ja suojella häntä. Kasvatus ei oikeuta väkivaltaan tai nöyryyttämiseen. Huoltaja osallistuu tärkeisiin päätöksiin, mutta lapsen mielipidettä tulee kuulla iän ja kehitystason mukaisesti. Kuuleminen ei tarkoita vastuun siirtämistä lapselle.",
          "Nuoren vastuu kasvaa vähitellen. Kotitöistä, opiskelusta ja yhteisistä ajoista voidaan sopia ja sopimuksia tarkistaa. Rajojen tarkoitus on turvata kasvua, ei osoittaa aikuisen valtaa. Toimiva perustelu kertoo, mitä suojataan ja miksi. Jos kotona on turvatonta, nuori voi kertoa opettajalle, terveydenhoitajalle tai muulle turvalliselle aikuiselle. Hänen ei tarvitse ratkaista aikuisten ongelmia yksin.",
        ],
        diagram: {
          title: "Vastuu kasvaa vuoropuhelussa",
          steps: [
            "Tarve ja turvallisuus",
            "Nuoren näkökulma",
            "Perusteltu sopimus",
            "Sopimuksen arviointi",
          ],
        },
        example:
          "Kotiintuloajasta sovitaan yhdessä huomioiden matka, uni ja seuraavan päivän koulu. Nuori kertoo suunnitelman, aikuinen perustelee rajat.",
        terms: [
          {
            word: "Huoltajuus",
            definition:
              "Vastuu lapsen hoidosta, kasvatuksesta ja tärkeistä henkilökohtaisista asioista.",
          },
          {
            word: "Kuulluksi tuleminen",
            definition:
              "Mahdollisuus kertoa näkemyksensä niin, että se otetaan huomioon.",
          },
        ],
        recall: {
          prompt:
            "Miksi nuoren kuuleminen ei tarkoita aikuisen vastuun poistumista?",
          model:
            "Nuoren näkökulma kuuluu päätöksiin, mutta aikuinen vastaa edelleen turvallisuudesta ja huolenpidosta.",
          rubric: ["Nuoren mielipiteen merkitys", "Aikuisen vastuu säilyy"],
        },
        questions: [
          [
            "Mikä kuvaa turvallista kasvatusta?",
            [
              "Nöyryytys opettaa tehokkaasti.",
              "Rajoja perustellaan ja nuorta kuunnellaan.",
              "Lapsi vastaa aikuisten ongelmista.",
            ],
            1,
            "Arvostava kuuleminen ja perustellut rajat tukevat kasvua. Nöyryytys tai aikuisvastuun siirtäminen eivät kuulu siihen.",
          ],
          [
            "Mikä on sopiva tapa lisätä itsenäisyyttä?",
            [
              "Sovitaan lisää vastuuta taitojen karttuessa.",
              "Poistetaan kaikki tuki heti.",
              "Pidetään vastuu aina samana.",
            ],
            0,
            "Vastuu ja tuki muuttuvat vähitellen kehityksen myötä, eivät yhdellä kertaa.",
          ],
        ],
        application: {
          prompt:
            "Perustele kaksi asiaa, jotka hyvä kotiintuloaikaa koskeva keskustelu ottaa huomioon.",
          model:
            "Nuoren pitää saada kertoa suunnitelmansa, jotta päätös huomioi hänen tilanteensa. Aikuisen pitää perustella turvallisuuteen ja lepoon liittyvät rajat ja sopia, miten muutoksista ilmoitetaan.",
          rubric: [
            "Nuoren kuuleminen",
            "Turvallisuuden tai levon perustelu",
            "Konkreettinen yhteinen toimintatapa",
          ],
        },
        source: family,
      }),
      lesson("1.2", 4, {
        title: "Itsenäistyminen tarvitsee luottamusta ja rajoja",
        hook: "Kaveri vaatii puhelimesi salasanaa todisteeksi luottamuksesta. Onko vaatimus luottamusta?",
        paragraphs: [
          "Itsenäistyminen on vähittäistä omien arvojen, valintojen ja vastuun rakentamista. Se ei tarkoita kaikkien läheissuhteiden katkaisemista. Nuori tarvitsee tilaa harjoitella ja mahdollisuuden palata tuen äärelle. Eri mieltä oleminen on mahdollista myös välittävässä suhteessa. Yhteisöt, kuten ystäväpiiri ja harrastusryhmä, voivat tarjota kuulumista ja tilaa kasvaa.",
          "Rakkaus ja kiintymys voivat näkyä kuuntelemisena, välittämisenä ja toisen rajojen kunnioittamisena. Luottamus ei tarkoita oikeutta valvoa toista, painostaa tai vaatia yksityisiä tietoja. Suostumuksen pitää olla vapaaehtoinen, ja sitä voi muuttaa. Turvallisessa ystävyys- tai seurustelusuhteessa voi sanoa ei ilman uhkaa. Jos rajoja rikotaan, aikuisen tuki auttaa arvioimaan tilannetta.",
        ],
        diagram: {
          title: "Turvallinen suhde",
          steps: [
            "Kunnioitus",
            "Vapaaehtoisuus",
            "Omat rajat",
            "Mahdollisuus puhua",
          ],
        },
        example:
          "”Välitän sinusta, mutta salasana on yksityinen” on selkeä raja. Toisen loukkaantuminen ei tee rajasta väärää.",
        terms: [
          {
            word: "Itsenäistyminen",
            definition:
              "Omien valintojen ja vastuun asteittainen lisääntyminen.",
          },
          {
            word: "Luottamus",
            definition:
              "Kokemus siitä, että toinen toimii rehellisesti ja kunnioittaa rajoja.",
          },
        ],
        recall: {
          prompt:
            "Miten itsenäisyys ja läheisten tuki voivat toteutua yhtä aikaa?",
          model:
            "Nuori voi tehdä ikäänsä sopivia valintoja ja kantaa vastuuta mutta pyytää neuvoja ja turvaa läheisiltä.",
          rubric: ["Omat valinnat ja vastuu", "Tuki ei estä itsenäisyyttä"],
        },
        questions: [
          [
            "Mikä osoittaa rajojen kunnioitusta?",
            [
              "Hyväksyn toisen kieltäytymisen.",
              "Vaadin salasanan rakkauden merkiksi.",
              "Uhkaan hylätä, jos en saa tahtoani.",
            ],
            0,
            "Kieltäytymisen hyväksyminen tukee vapaaehtoisuutta. Painostus ja uhkailu heikentävät turvallisuutta.",
          ],
          [
            "Mitä itsenäistyminen tarkoittaa?",
            [
              "Avun pyytäminen loppuu.",
              "Omat päätökset ja vastuu lisääntyvät vähitellen.",
              "Kaikki läheiset käyvät tarpeettomiksi.",
            ],
            1,
            "Itsenäistyminen etenee harjoittelun ja tuen avulla. Se ei vaadi yksin jäämistä.",
          ],
        ],
        application: {
          prompt:
            "Sovella turvallisen suhteen periaatteita salasanavaatimukseen. Kirjoita raja ja perustele se.",
          model:
            "En anna salasanaani, koska minulla on oikeus yksityisyyteen. Luottamus näkyy rajojen kunnioittamisessa, ei valvonnassa. Jos painostus jatkuu, puhun turvalliselle aikuiselle.",
          rubric: [
            "Selkeä vapaaehtoinen raja",
            "Luottamus erotettu valvonnasta",
            "Tuki painostuksen jatkuessa",
          ],
        },
        source: family,
      }),
    ],
  },
  {
    id: "1.4",
    title: "Kriisit ja psyykkinen ensiapu",
    description: "Muutosten ymmärtäminen ja turvallinen tukeminen.",
    group: "Mieli ja ihmissuhteet",
    color: "lilac",
    source: crisis,
    lessons: [
      lesson("1.4", 1, {
        title: "Kaikki kriisit eivät ala samalla tavalla",
        hook: "Murrosikä, vanhempien ero ja äkillinen onnettomuus muuttavat elämää eri tavoin. Miten niitä voi jäsentää?",
        paragraphs: [
          "Kriisi on tilanne, jossa tavalliset selviytymiskeinot eivät heti riitä muutoksen käsittelyyn. Kehityskriisi liittyy elämän tavanomaisiin kehitysvaiheisiin, kuten murrosikään. Elämänkriisi voi syntyä suuresta muutoksesta, esimerkiksi erosta tai muutosta. Äkillinen eli traumaattinen kriisi voi seurata yllättävästä järkyttävästä tapahtumasta, kuten vakavasta onnettomuudesta.",
          "Luokittelu auttaa ymmärtämään tilanteita, mutta ei mittaa kenenkään kärsimyksen arvoa. Sama tapahtuma voi vaikuttaa eri ihmisiin eri tavoin riippuen esimerkiksi aiemmista kokemuksista ja saatavilla olevasta tuesta. Kriisi ei ole heikkouden merkki eikä automaattisesti mielenterveyden häiriö. Turvallisuus, arkinen apu ja luotettavat ihmiset tukevat selviytymistä. Apua voi hakea riippumatta siitä, mihin kriisiluokkaan tilanteen sijoittaisi.",
        ],
        diagram: {
          title: "Kriisien jäsentely",
          steps: [
            "Kehitys: kasvun muutos",
            "Elämä: suuri elämäntilanteen muutos",
            "Äkillinen: järkyttävä yllätys",
          ],
        },
        example:
          "Koulun vaihto voi olla yhdelle innostava ja toiselle kriisi. Tuen tarve ratkaistaan ihmisen tilanteen, ei pelkän tapahtuman nimen perusteella.",
        terms: [
          {
            word: "Kriisi",
            definition:
              "Muutos tai tapahtuma, johon aiemmat selviytymiskeinot eivät heti riitä.",
          },
          {
            word: "Äkillinen kriisi",
            definition:
              "Yllättävän ja järkyttävän tapahtuman aiheuttama kriisi.",
          },
        ],
        recall: {
          prompt: "Nimeä kolme kriisityyppiä ja anna kustakin esimerkki.",
          model:
            "Kehityskriisi voi liittyä murrosikään, elämänkriisi vanhempien eroon ja äkillinen kriisi vakavaan onnettomuuteen.",
          rubric: ["Kolme tyyppiä", "Niihin sopivat esimerkit"],
        },
        questions: [
          [
            "Mihin kehityskriisi liittyy?",
            [
              "Tavanomaiseen kasvun vaiheeseen",
              "Aina vakavaan onnettomuuteen",
              "Vain aikuisuuteen",
            ],
            0,
            "Kehityskriisi voi liittyä esimerkiksi murrosikään. Kaikki kriisit eivät synny onnettomuudesta.",
          ],
          [
            "Miksi sama muutos vaikuttaa eri tavoin?",
            [
              "Osa ihmisistä vain liioittelee.",
              "Kokemukset, voimavarat ja tuki eroavat.",
              "Kriisissä ei ole yksilöllisiä eroja.",
            ],
            1,
            "Yksilöllinen tilanne vaikuttaa selviytymiseen. Tunteiden vähättely ei auta arvioimaan tuen tarvetta.",
          ],
        ],
        application: {
          prompt:
            "Vertaile murrosikään liittyvää kriisiä ja äkillisen onnettomuuden aiheuttamaa kriisiä. Kerro myös yhteinen tuen tarve.",
          model:
            "Murrosiän kriisi liittyy kehityksen muutoksiin, onnettomuuskriisi yllättävään järkytykseen. Molemmissa tavalliset keinot voivat hetkeksi olla riittämättömiä, ja turvallinen ihminen sekä arjen tuki auttavat.",
          rubric: [
            "Eri syntytavat",
            "Ei arvojärjestystä kärsimykselle",
            "Yhteinen tukikeino",
          ],
        },
        source: crisis,
      }),
      lesson("1.4", 2, {
        title: "Kriisin vaiheet ovat kartta, eivät aikataulu",
        hook: "Järkyttävän uutisen kuullut ei ensin tunne mitään. Myöhemmin hän itkee. Voiko tämä olla ymmärrettävä reaktio?",
        paragraphs: [
          "Äkillistä kriisiä kuvataan usein neljän vaiheen avulla. Sokkivaiheessa tapahtunutta on vaikea käsittää ja olo voi olla epätodellinen tai tunnoton. Reaktiovaiheessa tunteet ja kehon reaktiot voivat voimistua. Käsittelyvaiheessa tapahtunutta jäsennetään ja sen kanssa opetellaan elämään. Uudelleensuuntautumisessa elämä alkaa saada taas tilaa tapahtuman rinnalla.",
          "Vaiheet eivät ole kaikille samanlaisia tai selvästi peräkkäisiä. Tunteet voivat palata esimerkiksi muistopäivinä. Ulospäin rauhallinen ihminen voi silti tarvita tukea, eikä itkemättömyys kerro välinpitämättömyydestä. Kriisissä ei tarvitse suorittaa oikeaa reaktiota tai toipua tiettyyn määräpäivään mennessä. Pitkittyvät tai arkea vaikeuttavat oireet ovat syy hakea ammattilaisen apua.",
        ],
        diagram: {
          title: "Suuntaa antava kriisimalli",
          steps: [
            "Sokki: vaikea käsittää",
            "Reaktio: tunteet nousevat",
            "Käsittely: jäsentäminen",
            "Uusi suunta: elämä jatkuu rinnalla",
          ],
        },
        example:
          "Aluksi oppilas hoitaa asioita koneenomaisesti ja vasta seuraavana päivänä itkee. Eri ajankohtiin tulevat reaktiot eivät tee kokemuksesta epäaitoa.",
        terms: [
          {
            word: "Sokkivaihe",
            definition:
              "Psyykkinen ensireaktio, jossa tapahtunutta voi olla vaikea ymmärtää.",
          },
          {
            word: "Uudelleensuuntautuminen",
            definition:
              "Elämän ja tulevaisuuden rakentuminen tapahtuman rinnalle.",
          },
        ],
        recall: {
          prompt: "Kuvaile kriisimallin vaiheet ja yksi mallin rajoitus.",
          model:
            "Sokissa tapahtuma tuntuu epätodelliselta, reaktiossa tunteet vahvistuvat, käsittelyssä tapahtumaa jäsennetään ja uudelleensuuntautumisessa elämä avartuu. Kaikki eivät etene samassa järjestyksessä tai ajassa.",
          rubric: [
            "Neljän vaiheen perusidea",
            "Yksilöllinen ja vaihteleva kulku",
          ],
        },
        questions: [
          [
            "Mitä tunteettomuus heti järkytyksen jälkeen voi tarkoittaa?",
            [
              "Henkilö ei välitä.",
              "Se voi olla sokkireaktio.",
              "Henkilö on varmasti jo toipunut.",
            ],
            1,
            "Sokissa tunnereaktio voi viivästyä. Ulkoinen rauhallisuus ei todista kokemuksen puuttumista tai toipumista.",
          ],
          [
            "Miten vaihemallia tulee käyttää?",
            [
              "Kaikkien toipumisen määräaikana",
              "Suuntaa antavana kuvauksena",
              "Diagnoosina yhden reaktion perusteella",
            ],
            1,
            "Malli auttaa ymmärtämään, mutta yksilölliset erot ja vaiheiden limittäisyys ovat tavallisia.",
          ],
        ],
        application: {
          prompt:
            "Kaveri sanoo: ”Hän ei itkenyt, joten tapahtuma ei koskenut häntä.” Arvioi päätelmää kriisimallin avulla.",
          model:
            "Päätelmä on perusteeton. Sokkivaiheessa olo voi olla tunnoton ja reaktiot tulla myöhemmin. Ihmiset reagoivat eri tavoin, joten tukea pitää tarjota ulkoisesta ilmeestä riippumatta.",
          rubric: [
            "Tunnistat virheellisen päätelmän",
            "Selität sokin ja viiveen",
            "Huomioit yksilöllisyyden ja tuen",
          ],
        },
        source: crisis,
      }),
      lesson("1.4", 3, {
        title: "Kuunteleminen on konkreettista ensiapua",
        hook: "Kaveri on järkyttynyt. Tarvitseeko sinun löytää täydellinen lause vai huolehtia ensin turvallisuudesta?",
        paragraphs: [
          "Psyykkinen ensiapu tarkoittaa rauhallista läsnäoloa ja käytännön tukea järkyttävässä tilanteessa. Ensin arvioidaan turvallisuus ja tarvittava kiireellinen apu. Vakavassa vaarassa soitetaan 112. Turvallisessa paikassa voi kysyä, saako jäädä viereen ja mitä toinen juuri nyt tarvitsee. Selkeät lyhyet lauseet ja rauhallinen toiminta helpottavat kuormittunutta oloa.",
          "Kuuntele ilman pakkoa kertoa tapahtumasta yksityiskohtaisesti. Älä vähättele, lupaa varmaa lopputulosta tai kuulustele. Voit auttaa ottamaan yhteyttä läheiseen tai ammattilaiseen ja hoitamaan arkisen asian. Nuoren auttajan ei tarvitse olla terapeutti. Vaaratilanteessa ei pidä luvata salaisuutta, joka estäisi avun saamisen. Tukea voi tarjota niin, että autettavan valinnat ja yksityisyys säilyvät.",
        ],
        diagram: {
          title: "Turva → yhteys → apu",
          steps: [
            "Varmista turvallisuus",
            "Ole rauhallisesti läsnä",
            "Kuuntele ilman painostusta",
            "Yhdistä luotettavaan aikuiseen",
          ],
        },
        example:
          "”Voin olla tässä. Haluatko, että haemme terveydenhoitajan?” antaa valinnan ja konkreettisen seuraavan askeleen.",
        terms: [
          {
            word: "Psyykkinen ensiapu",
            definition:
              "Turvallisuutta, rauhoittumista ja tukeen pääsyä edistävä välitön apu.",
          },
          {
            word: "Aktiivinen kuuntelu",
            definition:
              "Toisen kertomuksen seuraaminen ja ymmärtämisen varmistaminen ilman kiirettä neuvomaan.",
          },
        ],
        recall: {
          prompt: "Nimeä kolme psyykkisen ensiavun periaatetta.",
          model:
            "Varmista turvallisuus, kuuntele painostamatta ja auta luotettavan tuen luo. Vakavassa vaarassa soita 112.",
          rubric: ["Turvallisuus", "Kuunteleminen", "Tuen järjestäminen"],
        },
        questions: [
          [
            "Mikä on tukeva lause?",
            [
              "Unohda koko juttu.",
              "Kerro kaikki heti.",
              "Olen tässä; haluatko apua aikuisen tavoittamiseen?",
            ],
            2,
            "Lause tarjoaa läsnäoloa ja käytännön apua. Pakottaminen ja vähättely eivät tue turvallisuutta.",
          ],
          [
            "Mitä teet, jos kaveri on välittömässä vaarassa mutta vaatii salaisuutta?",
            [
              "Pidän lupauksen hinnalla millä hyvänsä.",
              "Haen kiireellistä apua ja tarvittaessa soitan 112.",
              "Jätän hänet rauhoittumaan yksin.",
            ],
            1,
            "Välitön turvallisuus menee vaarallisen salaisuuden säilyttämisen edelle. Nuoren ei tule kantaa tilannetta yksin.",
          ],
        ],
        application: {
          prompt:
            "Sovella psyykkistä ensiapua kuvitteelliseen tilanteeseen, jossa oppilas on järkyttynyt onnettomuuden nähtyään. Kuvaa toiminta ilman kuulustelua.",
          model:
            "Varmistan paikan turvallisuuden ja tarvittavan hätäavun. Jään rauhallisesti viereen, kysyn mitä hän tarvitsee enkä pakota kertomaan. Autan ottamaan yhteyden turvalliseen aikuiseen ja varmistan, ettei hän jää yksin tuen tarpeen kanssa.",
          rubric: [
            "Turvallisuus ja kiireellinen apu",
            "Rauhallinen painostamaton kohtaaminen",
            "Yhteys aikuiseen tai ammattilaiseen",
          ],
        },
        source: crisis,
      }),
      lesson("1.4", 4, {
        title: "Toipumista tukevat arki ja oikea apu",
        hook: "Vaikean tapahtuman jälkeen uni ei tule ja koulu tuntuu raskaalta. Pitääkö vain odottaa yksin?",
        paragraphs: [
          "Kriisistä selviytymistä tukevat turvalliset ihmiset, ennakoitava arki ja perustarpeista huolehtiminen. Syöminen, nukkuminen, kevyt mielekäs toiminta ja mahdollisuus puhua tai olla hiljaa luovat vakautta. Kaikkia muistoja ei tarvitse käsitellä kerralla. Päihteet tai jatkuva välttely voivat tuoda hetkellisen helpotuksen mutta vaikeuttaa palautumista ja arjen hoitamista.",
          "Tuen tarve voi jatkua ensipäivien jälkeen. Jos uni, keskittyminen tai turvallisuuden tunne häiriintyy pitkään, terveydenhoitaja, kuraattori tai muu ammattilainen auttaa. Kaveri voi huomata muutoksen ja kulkea vastaanotolle mukana, mutta ei vastaa hoidosta. Välittömässä vaarassa tarvitaan 112. Avun pyytäminen ja rajojen asettaminen omalle auttamiselle ovat vastuullista toimintaa.",
        ],
        diagram: {
          title: "Tukea eri tasoilla",
          steps: [
            "Arjen rytmi ja perustarpeet",
            "Läheisten tuki",
            "Koulun ammattilaiset",
            "112 välittömässä vaarassa",
          ],
        },
        example:
          "Ystävä kysyy vielä viikon päästä, miten arki sujuu, ja tarjoutuu mukaan kuraattorille. Tuki ei pääty ensimmäiseen keskusteluun.",
        terms: [
          {
            word: "Palautuminen",
            definition:
              "Voimavarojen ja toimintakyvyn elpyminen kuormituksesta.",
          },
          {
            word: "Selviytymiskeino",
            definition:
              "Tapa käsitellä kuormitusta, kuten puhuminen tai arjen rytmin tukeminen.",
          },
        ],
        recall: {
          prompt: "Milloin kriisin jälkeen kannattaa hakea ammattilaisen apua?",
          model:
            "Apua kannattaa hakea, jos oireet jatkuvat, pahenevat tai haittaavat arkea. Myös epävarmuuden vuoksi saa kysyä neuvoa; välittömässä vaarassa soitetaan 112.",
          rubric: [
            "Arkea haittaava tai pitkittyvä oireilu",
            "Kiireellisen vaaran erottaminen",
          ],
        },
        questions: [
          [
            "Mikä tukee toipumista pitkäjänteisesti?",
            [
              "Päihteillä unohtaminen",
              "Ennakoitava arki ja turvallinen tuki",
              "Kaikkien tunteiden kieltäminen",
            ],
            1,
            "Rytmi ja tuki lisäävät turvallisuutta. Päihteet ja tunteiden pakollinen tukahduttaminen voivat vaikeuttaa selviytymistä.",
          ],
          [
            "Mikä kuuluu kaverin vastuuseen?",
            [
              "Hoidon korvaaminen omilla neuvoilla",
              "Auttaminen tuen äärelle omat rajat huomioiden",
              "Ympärivuorokautinen yksin valvominen",
            ],
            1,
            "Kaveri voi tukea, mutta ammatillinen hoito ja turvallisuus eivät saa jäädä yhden nuoren vastuulle.",
          ],
        ],
        application: {
          prompt:
            "Laadi perusteltu tukisuunnitelma kuvitteelliselle nuorelle, jonka uni ja koulunkäynti vaikeutuvat kriisin jälkeen.",
          model:
            "Arjen rytmiä ja rauhallista iltaa tuetaan, koska ennakoitavuus auttaa palautumaan. Sovitaan yhteys terveydenhoitajaan oireiden haitatessa koulua. Läheinen voi tulla mukaan, mutta hoitovastuu ei jää kaverille.",
          rubric: [
            "Konkreettinen arjen tuki perusteltuna",
            "Ammattilainen mukaan toimintakyvyn heiketessä",
            "Auttajan rajat huomioitu",
          ],
        },
        source: crisis,
      }),
    ],
  },
];
