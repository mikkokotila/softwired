import { lesson, type Section } from "./types";
const nutrients = {
  pdf: [28, 35] as [number, number],
  book: [80, 87] as [number, number],
};
const diets = {
  pdf: [36, 39] as [number, number],
  book: [88, 91] as [number, number],
};
const sitting = {
  pdf: [40, 43] as [number, number],
  book: [102, 105] as [number, number],
};
export const nutrition: Section[] = [
  {
    id: "6.1",
    title: "Ravintoaineet ja energiantarve",
    description: "Energiaa, rakennusaineita ja elimistön säätelyä.",
    group: "Ravinto ja liike",
    color: "lime",
    source: nutrients,
    lessons: [
      lesson("6.1", 1, {
        title: "Keho tarvitsee energiaa myös levossa",
        hook: "Vaikka makaat paikallasi, sydän lyö ja keho kasvaa. Mihin ruokaa tarvitaan liikunnan lisäksi?",
        paragraphs: [
          "Energiaa kuluu peruselintoimintoihin, kuten hengitykseen, lämmön ylläpitoon ja sydämen työhön. Kasvu, liikkuminen ja ruoan käsittely lisäävät tarvetta. Energiantarve vaihtelee muun muassa kasvuvaiheen, kehon koon ja aktiivisuuden mukaan. Nuoren tehtävä ei ole tavoitella kaikille samaa kalorimäärää tai laihduttaa tämän kurssin perusteella. Säännöllinen ja riittävä syöminen tukee kasvua ja oppimista.",
          "Energiaravintoaineita ovat hiilihydraatit, rasvat ja proteiinit. Proteiineja tarvitaan erityisesti kudosten rakentamiseen ja korjaamiseen, esimerkiksi kasvuun ja lihaksiin. Niitä saa muun muassa pavuista, linsseistä, kalasta, kananmunasta ja maitovalmisteista tai sopivista vaihtoehdoista. Riittävä energiansaanti auttaa käyttämään proteiinia rakennustyöhön. Energiatasapainoa tarkastellaan pitkällä aikavälillä, eikä yhden aterian tarvitse vastata täsmälleen sen jälkeistä kulutusta.",
        ],
        diagram: {
          title: "Ruoan kolme tehtävää",
          steps: [
            "Energia elintoimintoihin",
            "Rakennusaineet kasvuun ja korjaamiseen",
            "Suojaravintoaineet säätelyyn",
          ],
        },
        example:
          "Koululounas tukee keskittymistä myös lepopäivänä. Kasvava keho tarvitsee ruokaa riippumatta siitä, onko tänään harjoituksia.",
        terms: [
          {
            word: "Perusaineenvaihdunta",
            definition:
              "Energiankulutus välttämättömien elintoimintojen ylläpitämiseen levossa.",
          },
          {
            word: "Proteiini",
            definition:
              "Aminohapoista koostuva ravintoaine, jota tarvitaan esimerkiksi kudosten ja entsyymien rakentamiseen.",
          },
        ],
        recall: {
          prompt:
            "Nimeä kaksi energiankulutuksen kohdetta ja proteiinin keskeinen tehtävä.",
          model:
            "Energiaa kuluu peruselintoimintoihin ja liikkeeseen, nuorella myös kasvuun. Proteiinia tarvitaan kudosten rakentamiseen ja korjaamiseen.",
          rubric: ["Kaksi kulutuskohdetta", "Proteiinin rakennustehtävä"],
        },
        questions: [
          [
            "Mihin energiaa kuluu levossa?",
            [
              "Vain lihasten kasvattamiseen",
              "Esimerkiksi hengitykseen ja lämmön ylläpitoon",
              "Ei mihinkään",
            ],
            1,
            "Peruselintoiminnot jatkuvat myös levossa. Liikunta on vain osa kokonaiskulutusta.",
          ],
          [
            "Mikä aterian osa on hyvä proteiinin lähde?",
            ["Linssikastike", "Pelkkä vesi", "Pelkkä ruokaöljy"],
            0,
            "Linssit sisältävät proteiinia. Vesi ei anna energiaa, ja öljy on rasvan lähde.",
          ],
        ],
        application: {
          prompt:
            "Perustele kuvitteelliselle nuorelle, miksi koululounaan väliin jättäminen lepopäivänä ei ole hyvä tapa vastata energiantarpeeseen.",
          model:
            "Keho käyttää energiaa levossakin elintoimintoihin ja kasvuun. Lounas antaa myös proteiinia, vitamiineja ja kivennäisaineita. Säännöllinen riittävä syöminen tukee keskittymistä eikä riipu vain liikuntasuorituksista.",
          rubric: [
            "Peruselintoiminnot ja kasvu",
            "Muut ravintoaineet",
            "Säännöllisyys ja oppiminen",
          ],
        },
        source: nutrients,
      }),
      lesson("6.1", 2, {
        title: "Hiilihydraatin laatu ratkaisee enemmän kuin nimi",
        hook: "Kaura ja makea juoma sisältävät molemmat hiilihydraatteja. Miksi ne eivät silti ole ravitsemuksellisesti samanlaisia?",
        paragraphs: [
          "Hiilihydraatit ovat tärkeä energian lähde. Sokereita ja tärkkelystä hajotetaan ruoansulatuksessa pienemmiksi osiksi, joita elimistö käyttää energiaksi. Täysjyväviljassa, kasviksissa, marjoissa ja hedelmissä on hiilihydraattien lisäksi kuitua ja muita ravintoaineita. Nopeaksi ja hitaaksi kutsuttu hiilihydraatti kuvaa karkeasti imeytymisen nopeutta, mutta koko aterian koostumus vaikuttaa siihen.",
          "Ravintokuitu ei hajoa ohutsuolessa tavallisten hiilihydraattien tapaan. Se tukee suoliston toimintaa ja osaltaan kylläisyyttä sekä tasaisempaa aterian jälkeistä verensokerivastetta. Sokerijuoma voi antaa energiaa nopeasti, mutta siinä ei ole täysjyväaterian kuitua ja rakennetta. Yhtä ruokaa ei tarvitse kutsua kielletyksi: olennaista on ruokavalion kokonaisuus, säännölliset ateriat ja ravintoaineita sisältävien vaihtoehtojen suosiminen.",
        ],
        diagram: {
          title: "Vertaa kokonaisia ruokia",
          steps: [
            "Täysjyvä: energiaa ja kuitua",
            "Kasvikset ja marjat: myös mikroravintoaineita",
            "Sokerijuoma: energiaa, vähän muita ravintoaineita",
          ],
        },
        example:
          "Kaurapuuro, marjat ja proteiinin lähde muodostavat monipuolisemman välipalan kuin pelkkä makea juoma.",
        terms: [
          {
            word: "Ravintokuitu",
            definition:
              "Kasviperäinen ruoan osa, joka ei hajoa ohutsuolessa ja tukee suoliston toimintaa.",
          },
          {
            word: "Täysjyvä",
            definition: "Vilja, jossa jyvän ravintorikkaat osat ovat mukana.",
          },
        ],
        recall: {
          prompt:
            "Miksi täysjyvä on usein parempi arkinen hiilihydraatin lähde kuin sokerijuoma?",
          model:
            "Täysjyvä tuo energian lisäksi kuitua ja muita ravintoaineita. Kuitu tukee suolistoa ja kylläisyyttä, kun taas sokerijuoma sisältää vähän näitä.",
          rubric: ["Energia ei ainoa vertailuperuste", "Kuitu ja sen tehtävä"],
        },
        questions: [
          [
            "Mikä kuidun tehtävä on?",
            [
              "Se korvaa kaiken proteiinin.",
              "Se tukee suoliston toimintaa.",
              "Se on elimistölle tarpeeton.",
            ],
            1,
            "Kuitu on tärkeä suolistolle. Se ei kuitenkaan korvaa muita ravintoaineita.",
          ],
          [
            "Mikä väite hiilihydraateista on tarkin?",
            [
              "Kaikki hiilihydraattiruoat ovat samanlaisia.",
              "Kaikki hiilihydraatit tulee välttää.",
              "Ruoan laatu ja koko ateria vaikuttavat.",
            ],
            2,
            "Hiilihydraatit kuuluvat monipuoliseen ruokavalioon. Lähde, kuitu ja aterian kokonaisuus vaikuttavat ravitsemukselliseen arvoon.",
          ],
        ],
        application: {
          prompt:
            "Vertaile kaurapuuroa marjoilla ja pelkkää sokerijuomaa välipalana. Käytä käsitteitä energia ja kuitu.",
          model:
            "Molemmista saa energiaa, mutta kaurapuuro ja marjat tuovat myös kuitua ja mikroravintoaineita. Kuitu tukee suolistoa ja kylläisyyttä. Monipuolisuutta voi täydentää proteiinin lähteellä.",
          rubric: [
            "Molempien energia tunnistettu",
            "Kuidun ero ja vaikutus",
            "Kokonaisuus ja monipuolisuus",
          ],
        },
        source: nutrients,
      }),
      lesson("6.1", 3, {
        title: "Rasvaa tarvitaan, mutta laadulla on väliä",
        hook: "Jos rasva antaa paljon energiaa, pitäisikö kaikki rasva poistaa kasvavan nuoren ruoasta?",
        paragraphs: [
          "Rasvat ovat energian lähde ja solujen rakenteiden osa. Niitä tarvitaan myös välttämättömien rasvahappojen saantiin ja rasvaliukoisten vitamiinien imeytymiseen. Kaikkea rasvaa ei siis pidä poistaa. Pehmeässä rasvassa on paljon tyydyttymättömiä rasvahappoja; sitä saa esimerkiksi kasviöljyistä, pähkinöistä ja kalasta.",
          "Kovassa rasvassa on paljon tyydyttyneitä rasvahappoja. Sitä on muun muassa voissa ja monissa rasvaisissa eläinperäisissä tuotteissa, mutta myös eräissä kasvirasvoissa. Siksi eläin vastaan kasvi ei ole täydellinen sääntö. Pehmeän rasvan suosiminen kovan sijaan tukee verenkiertoelimistön terveyttä osana ruokavalion kokonaisuutta. Yksittäinen ruoka ei ratkaise terveyttä, ja myös määrä sekä muun ruokavalion monipuolisuus merkitsevät.",
        ],
        diagram: {
          title: "Korvaaminen, ei kaiken poistaminen",
          steps: [
            "Tarvitsemme rasvaa",
            "Suosi tyydyttymättömiä lähteitä",
            "Korvaa osa kovasta pehmeällä",
          ],
        },
        example:
          "Leivälle valittu pehmeä kasvirasvalevite ja aterian kasviöljy ovat tapoja parantaa rasvan laatua ilman kaikkien rasvojen välttämistä.",
        terms: [
          {
            word: "Tyydyttymätön rasva",
            definition:
              "Rasva, jota on runsaasti esimerkiksi monissa kasviöljyissä ja kalassa; usein pehmeää.",
          },
          {
            word: "Välttämätön rasvahappo",
            definition:
              "Rasvahappo, jota elimistö ei pysty valmistamaan riittävästi ja jota täytyy saada ravinnosta.",
          },
        ],
        recall: {
          prompt: "Nimeä kaksi rasvan tehtävää ja yksi pehmeän rasvan lähde.",
          model:
            "Rasva antaa energiaa ja osallistuu solujen rakenteisiin; se myös tukee rasvaliukoisten vitamiinien imeytymistä. Kasviöljy on pehmeän rasvan lähde.",
          rubric: ["Kaksi tehtävää", "Sopiva lähde"],
        },
        questions: [
          [
            "Miksi kaikkea rasvaa ei pidä poistaa?",
            [
              "Rasvaa tarvitaan muun muassa solujen rakenteisiin.",
              "Kaikki rasvat ovat samanlaisia.",
              "Rasva korvaa veden.",
            ],
            0,
            "Rasvoilla on välttämättömiä tehtäviä energian lisäksi. Niiden laadulla on silti väliä.",
          ],
          [
            "Mikä on käytännöllinen rasvan laadun parannus?",
            [
              "Korvaan osan voista kasviöljyllä.",
              "Poistan kaikki pähkinät ja kalan.",
              "Oletan jokaisen kasvirasvan olevan pehmeää.",
            ],
            0,
            "Monet kasviöljyt tuovat tyydyttymätöntä rasvaa. Poikkeusten vuoksi alkuperä ei yksin kerro laatua.",
          ],
        ],
        application: {
          prompt:
            "Perustele, miksi ohje ”suosi pehmeää rasvaa” on parempi kuin ”vältä kaikkea rasvaa”.",
          model:
            "Rasvaa tarvitaan energiaan, solurakenteisiin ja välttämättömiin rasvahappoihin. Pehmeä rasva parantaa ruokavalion rasvan laatua kovan rasvan tilalla. Kaiken poistaminen voisi heikentää tärkeiden ravintoaineiden saantia.",
          rubric: [
            "Rasvan välttämättömät tehtävät",
            "Laadun ja korvaamisen idea",
            "Täydellisen välttämisen ongelma",
          ],
        },
        source: nutrients,
      }),
      lesson("6.1", 4, {
        title: "Pienet ravintoaineet tekevät suurta työtä",
        hook: "Rautaa tarvitaan vähän, mutta ilman sitä hapen kuljetus kärsii. Miten monipuolinen ateria auttaa?",
        paragraphs: [
          "Vitamiineja ja kivennäisaineita tarvitaan pieninä määrinä elimistön säätelyyn ja rakenteisiin. Ne eivät tuota energiaa kuten energiaravintoaineet. Kalsium tukee luuston rakennetta ja D-vitamiini sen aineenvaihduntaa sekä kalsiumin imeytymistä. Rauta on osa hemoglobiinia, joka kuljettaa happea veressä. C-vitamiini tukee muun muassa kudosten toimintaa ja edistää kasviperäisen raudan imeytymistä.",
          "Kalsiumia saa esimerkiksi maitovalmisteista ja kalsiumilla täydennetyistä kasvijuomista; tuotemerkinnät pitää tarkistaa. Rautaa saa lihasta, palkokasveista ja täysjyvästä, C-vitamiinia kasviksista, hedelmistä ja marjoista. D-vitamiinin lähteitä ovat muun muassa kala ja täydennetyt tuotteet. Lautasmalli auttaa kokoamaan kasviksia, hiilihydraatin lähteen ja proteiinin lähteen; lisäksi tarvitaan sopivasti rasvaa ja juomaa. Mahdolliset ravintolisät valitaan ajantasaisten ikäkohtaisten ohjeiden tai terveydenhuollon neuvon mukaan, ei itse keksityillä annoksilla.",
        ],
        diagram: {
          title: "Neljä muistiparia",
          steps: [
            "Kalsium → luusto",
            "D-vitamiini → kalsiumin hyödyntäminen",
            "Rauta → hapen kuljetus",
            "C-vitamiini → kudokset ja raudan imeytyminen",
          ],
        },
        example:
          "Papu-täysjyväateria ja paprika yhdistävät kasviperäisen raudan ja C-vitamiinin. Täydennetty kasvijuoma voi täydentää kalsiumia, jos merkinnät sen vahvistavat.",
        terms: [
          {
            word: "Hemoglobiini",
            definition:
              "Punasolujen proteiini, johon liittyvä rauta auttaa kuljettamaan happea.",
          },
          {
            word: "Suojaravintoaine",
            definition:
              "Vitamiineista ja kivennäisaineista käytetty nimitys niiden säätely- ja suojaustehtävien vuoksi.",
          },
        ],
        recall: {
          prompt:
            "Yhdistä kalsium, rauta ja C-vitamiini yhteen tehtävään kukin.",
          model:
            "Kalsium tukee luustoa, rauta hapen kuljetusta hemoglobiinissa ja C-vitamiini muun muassa kasviperäisen raudan imeytymistä.",
          rubric: [
            "Kolme oikeaa tehtävää",
            "Ravintoaineet eivät ole energian lähteitä",
          ],
        },
        questions: [
          [
            "Mikä edistää kasviperäisen raudan imeytymistä?",
            [
              "C-vitamiini aterialla",
              "Kaiken proteiinin välttäminen",
              "Pelkkä veden väri",
            ],
            0,
            "C-vitamiinia sisältävä kasvis tai hedelmä voi parantaa kasviperäisen raudan imeytymistä.",
          ],
          [
            "Mikä väite vitamiineista on oikein?",
            [
              "Ne antavat suurimman osan energiasta.",
              "Niitä tarvitaan säätelyyn, ei energian lähteeksi.",
              "Monipuolinen ruoka on niiden vuoksi tarpeetonta.",
            ],
            1,
            "Vitamiinit osallistuvat elimistön toimintaan, mutta eivät itsessään tuota energiaa.",
          ],
        ],
        application: {
          prompt:
            "Kokoa kuvitteellinen monipuolinen lounas ja perustele kolmen osan ravitsemuksellinen tehtävä.",
          model:
            "Täysjyväriisi tuo energiaa ja kuitua, papukastike proteiinia ja rautaa, ja paprika C-vitamiinia tukemaan raudan imeytymistä. Kasviöljy tuo pehmeää rasvaa ja täydennetty juoma voi tuoda kalsiumia.",
          rubric: [
            "Energia ja kuitu",
            "Proteiini tai rauta",
            "Vitamiini, kalsium tai pehmeä rasva perusteltuna",
          ],
        },
        source: nutrients,
      }),
    ],
  },
  {
    id: "6.2",
    title: "Kaikki eivät voi syödä kaikkea",
    description: "Allergia, keliakia, laktoosi ja kasvisruokavalio.",
    group: "Ravinto ja liike",
    color: "lime",
    source: diets,
    lessons: [
      lesson("6.2", 1, {
        title: "Allergia ei ole sama kuin intoleranssi",
        hook: "Yksi saa maitoproteiinista allergisen reaktion, toinen vatsaoireita laktoosista. Miksi sama ratkaisu ei sovi molemmille?",
        paragraphs: [
          "Ruoka-allergiassa puolustusjärjestelmä reagoi ruoan ainesosaan, usein proteiiniin. Oireita voi tulla iholle, ruoansulatukseen tai hengitykseen, ja joskus reaktio on vakava. Intoleranssi tarkoittaa ruoan aineksen huonoa sietoa ilman samaa allergista mekanismia. Oireet eivät ole tahallisia tai pelkkää nirsoilua, eikä ruokavaliota pidä testata toisen kustannuksella.",
          "Maitoallergia liittyy maidon proteiineihin, laktoosi-intoleranssi taas maitosokerin pilkkoutumiseen. Laktoositon maitotuote voi yhä sisältää maitoproteiinia, joten se ei automaattisesti sovi maitoallergiselle. Ainesosaluettelo, keittiön ohjeet ja henkilön oma hoitosuunnitelma ovat tärkeitä. Vakava hengitysvaikeus tai yleisvoinnin romahtaminen vaatii 112:n apua; oppitunti ei korvaa yksilöllistä lääketieteellistä ohjetta.",
        ],
        diagram: {
          title: "Sama ruoka, eri mekanismi",
          steps: [
            "Allergia: puolustusjärjestelmän reaktio",
            "Intoleranssi: aineksen sietämisen ongelma",
            "Ratkaisu: tunnista juuri vältettävä aines",
          ],
        },
        example:
          "Laktoositon jogurtti ei ratkaise maitoproteiiniallergiaa. Pakkauksen sana kertoo sokerista, ei kaikkien maidon osien puuttumisesta.",
        terms: [
          {
            word: "Allergia",
            definition:
              "Puolustusjärjestelmän haitallinen reaktio tavallisesti harmittomaan ainesosaan.",
          },
          {
            word: "Intoleranssi",
            definition:
              "Ruoan aineksen huono sieto, joka ei perustu samaan allergiseen mekanismiin.",
          },
        ],
        recall: {
          prompt:
            "Vertaile ruoka-allergiaa ja intoleranssia mekanismin avulla.",
          model:
            "Allergiassa puolustusjärjestelmä reagoi ainesosaan. Intoleranssi voi johtua esimerkiksi pilkkovan entsyymin vähyydestä ilman vastaavaa allergista reaktiota.",
          rubric: ["Puolustusjärjestelmä", "Muu mekanismi ja esimerkki"],
        },
        questions: [
          [
            "Sopiiko laktoositon maito varmasti maitoallergiselle?",
            [
              "Kyllä, koska kaikki maidon osat puuttuvat.",
              "Ei; maitoproteiini voi edelleen olla mukana.",
              "Kyllä, jos pakkaus on sininen.",
            ],
            1,
            "Laktoosittomuus koskee maitosokeria. Se ei takaa maitoproteiinittomuutta.",
          ],
          [
            "Miten huomioit kaverin allergian?",
            [
              "Kokeilen salaa, onko se todellinen.",
              "Tarkistan ainesosat ja noudatan hänen ohjeitaan.",
              "Poistan vain näkyvän allergisoivan palan.",
            ],
            1,
            "Allergia otetaan vakavasti. Näkyvän palan poistaminen ei välttämättä poista allergeenia.",
          ],
        ],
        application: {
          prompt:
            "Selitä keittiöryhmälle, miksi laktoositonta ja maidotonta ei saa käyttää synonyymeina.",
          model:
            "Laktoositon kertoo, että maitosokeria on poistettu tai pilkottu. Maitoproteiini voi silti olla mukana ja aiheuttaa maitoallergiselle reaktion. Maidoton tarkoittaa eri rajausta, joten tarkistamme ainesosat ja yksilöllisen ohjeen.",
          rubric: [
            "Maitosokeri erotettu proteiinista",
            "Allergiariski selitetty",
            "Merkintöjen ja ohjeen tarkistus",
          ],
        },
        source: diets,
      }),
      lesson("6.2", 2, {
        title: "Keliakiassa gluteeni vaurioittaa suolta",
        hook: "Keliakiaa sairastavalle tarjotaan leipää, josta näkyvät murut on pyyhitty pois. Miksi se ei riitä?",
        paragraphs: [
          "Keliakia on autoimmuunisairaus: gluteeni käynnistää elimistön puolustusreaktion, joka vaurioittaa ohutsuolen limakalvoa ja suolinukkaa. Suolinukka lisää ravintoaineiden imeytymispintaa, joten vaurio voi heikentää imeytymistä. Gluteenia on vehnässä, rukiissa ja ohrassa. Keliakia ei ole sama asia kuin vilja-allergia eikä ruokatrendi.",
          "Hoitona on jatkuva gluteeniton ruokavalio terveydenhuollon ohjauksessa. Riisi, peruna ja monet muut luonnostaan gluteenittomat ruoat sopivat osaksi kokonaisuutta. Kaurasta valitaan gluteenittomaksi merkitty tuote henkilökohtaisen ohjeen mukaan. Puhtaat välineet ja murujen välttäminen ehkäisevät gluteenin siirtymistä ruokaan. Oireettomuus ei todista, ettei suolessa voisi tapahtua vauriota. Epäiltyä keliakiaa ei pidä itse diagnosoida tai peittää ennen tutkimuksia aloitetulla ruokavaliolla.",
        ],
        diagram: {
          title: "Keliakian syy-seuraus",
          steps: [
            "Gluteeni ruoassa",
            "Autoimmuunireaktio",
            "Suolinukan vaurio",
            "Imeytyminen voi heiketä",
          ],
        },
        example:
          "Yhteinen leivänpaahdin tai voirasian murut voivat siirtää gluteenia muuten sopivaan ruokaan. Pelkkä näkyvän leivän vaihtaminen ei aina riitä.",
        terms: [
          {
            word: "Autoimmuunisairaus",
            definition:
              "Sairaus, jossa puolustusjärjestelmä vaurioittaa elimistön omia rakenteita.",
          },
          {
            word: "Suolinukka",
            definition:
              "Ohutsuolen limakalvon rakenne, joka lisää ravintoaineiden imeytymispinta-alaa.",
          },
        ],
        recall: {
          prompt:
            "Selitä, miten gluteeni liittyy keliakiaan ja ravintoaineiden imeytymiseen.",
          model:
            "Gluteeni laukaisee autoimmuunireaktion, joka vaurioittaa suolinukkaa. Imeytymispinta heikkenee ja ravintoaineiden imeytyminen voi vaikeutua.",
          rubric: ["Autoimmuunimekanismi", "Suolinukka ja imeytyminen"],
        },
        questions: [
          [
            "Mikä kuuluu keliakian hoidon periaatteisiin?",
            [
              "Gluteenia vain oireettomina päivinä",
              "Jatkuva gluteeniton ruokavalio",
              "Pelkkä laktoositon maito",
            ],
            1,
            "Keliakia vaatii gluteenin välttämistä myös ilman näkyviä oireita. Laktoosi on eri ainesosa.",
          ],
          [
            "Miksi puhtaat välineet ovat tärkeitä?",
            [
              "Ne estävät gluteenin siirtymistä ruokaan.",
              "Ne muuttavat vehnän gluteenittomaksi.",
              "Niillä ei ole merkitystä.",
            ],
            0,
            "Ristikosketuksessa murut tai jäämät voivat siirtyä muuten gluteenittomaan ruokaan.",
          ],
        ],
        application: {
          prompt:
            "Sovella keliakiatietoa koulun leivontapäivään. Nimeä kolme turvallisen järjestelyn periaatetta.",
          model:
            "Valitaan gluteenittomiksi varmistetut ainekset. Käytetään puhtaita välineitä ja työpintoja murujen siirtymisen estämiseksi. Noudatetaan oppilaan ja koulukeittiön ohjeita koko valmistuksen ajan.",
          rubric: [
            "Sopivat ainekset",
            "Ristikosketuksen ehkäisy",
            "Yksilölliset ja keittiön ohjeet",
          ],
        },
        source: diets,
      }),
      lesson("6.2", 3, {
        title: "Laktoosi tarvitsee laktaasia",
        hook: "Saman perheen kaksi ihmistä sietää maitotuotteita eri tavalla. Miten entsyymi selittää eron?",
        paragraphs: [
          "Laktoosi on maitosokeri. Laktaasi on ohutsuolessa toimiva entsyymi, joka pilkkoo laktoosia imeytyviksi osiksi. Laktoosi-intoleranssissa laktaasin aktiivisuus on vähäinen, jolloin osa laktoosista päätyy paksusuoleen ja voi aiheuttaa esimerkiksi turvotusta, ilmavaivoja ja ripulia. Kyse ei ole maidon proteiiniin kohdistuvasta allergiasta.",
          "Sopiva laktoosimäärä voi vaihdella yksilöllisesti. Laktoosittomat tuotteet ja osa vähälaktoosisista vaihtoehdoista auttavat, mutta tarpeettoman laaja ruokien poistaminen voi vaikeuttaa ravintoaineiden saantia. Jos maitotuotteita korvataan kasviperäisillä tuotteilla, tarkistetaan esimerkiksi kalsium ja D-vitamiini merkinnöistä. Pitkittyvien vatsaoireiden syy selvitetään terveydenhuollossa, koska samantapaisia oireita voi olla monesta syystä. Oma arvaus ei yksin ole diagnoosi.",
        ],
        diagram: {
          title: "Nimet muistiksi",
          steps: [
            "Laktoosi = sokeri",
            "Laktaasi = pilkkova entsyymi",
            "Vähän laktaasia → laktoosia suolistobakteereille → oireita",
          ],
        },
        example:
          "Laktoosittomaksi käsitelty maitotuote voi säilyttää proteiinin ja kalsiumin. Se on eri asia kuin kaikkien maitotuotteiden poistaminen.",
        terms: [
          { word: "Laktoosi", definition: "Maidon sisältämä sokeri." },
          {
            word: "Laktaasi",
            definition: "Entsyymi, joka pilkkoo laktoosia ohutsuolessa.",
          },
        ],
        recall: {
          prompt: "Miten laktoosi ja laktaasi eroavat toisistaan?",
          model:
            "Laktoosi on maitosokeri ja laktaasi sitä pilkkova entsyymi. Laktaasin vähyys voi johtaa laktoosin aiheuttamiin vatsaoireisiin.",
          rubric: ["Sokeri ja entsyymi erotettu", "Oireiden mekanismi"],
        },
        questions: [
          [
            "Mikä laktoosi-intoleranssissa on tavallisesti ongelmana?",
            [
              "Laktaasin vähäinen aktiivisuus",
              "Kaikkien vitamiinien allergia",
              "Gluteenin autoimmuunivaikutus",
            ],
            0,
            "Laktaasi pilkkoo maitosokeria. Gluteeni ja autoimmuunivaurio liittyvät keliakiaan.",
          ],
          [
            "Mitä tarkistat maitotuotteita korvatessa?",
            [
              "Vain pakkauksen värin",
              "Kalsiumin ja muiden olennaisten ravintoaineiden saannin",
              "Että kaikki kasvipohjaiset tuotteet ovat samanlaisia",
            ],
            1,
            "Kasvipohjaisten tuotteiden koostumus ja täydentäminen vaihtelevat, joten merkinnöillä on merkitystä.",
          ],
        ],
        application: {
          prompt:
            "Vertaile laktoosi-intoleranssia ja keliakiaa aiheuttavan aineen, mekanismin ja ruokavalion avulla.",
          model:
            "Laktoosi-intoleranssissa ongelma liittyy maitosokeriin ja laktaasin vähyyteen; sopiva laktoosimäärä on yksilöllinen. Keliakiassa gluteeni laukaisee suolinukkaa vaurioittavan autoimmuunireaktion, joten gluteenitonta ruokavaliota tarvitaan jatkuvasti.",
          rubric: [
            "Laktoosi ja gluteeni erotettu",
            "Entsyymi ja autoimmuunireaktio",
            "Ruokavalion eron perustelu",
          ],
        },
        source: diets,
      }),
      lesson("6.2", 4, {
        title: "Kasvisruokavalio kootaan, ei vain karsita",
        hook: "Lihapullan poistaminen lautaselta ei vielä korvaa sen ravintoaineita. Mitä tilalle tarvitaan?",
        paragraphs: [
          "Kasvisruokavalioita on erilaisia. Lakto-ovovegetaarinen ruokavalio sisältää kasvisten lisäksi maitotuotteita ja kananmunaa, vegaaninen ei sisällä eläinperäisiä tuotteita. Monipuolinen ruokavalio tarvitsee riittävästi energiaa, proteiinia, rasvan lähteitä ja mikroravintoaineita. Palkokasvit, täysjyvä, pähkinät ja siemenet voivat täydentää toisiaan osana päivän aterioita.",
          "Vegaanisessa ruokavaliossa B12-vitamiinin saanti täytyy varmistaa luotettavasti, käytännössä sopivalla ravintolisällä tai asiantuntijan ohjaamalla täydentämisellä. Huomiota vaativat myös D-vitamiini, kalsium, rauta ja jodi sekä riittävä energian ja proteiinin saanti. C-vitamiini auttaa kasviperäisen raudan imeytymistä. Nuoren suunnittelu kannattaa tehdä kouluruokailun ja tarvittaessa ravitsemusammattilaisen kanssa. Pelkkä eläinperäisten tuotteiden poistaminen ilman korvaavia ruokia ei takaa riittävää ravitsemusta.",
        ],
        diagram: {
          title: "Korvaa ravitsemuksellinen tehtävä",
          steps: [
            "Proteiini: palkokasvit ja sopivat vaihtoehdot",
            "Energia: riittävät ateriat",
            "B12 ja D: saanti varmistetaan",
            "Rauta ja kalsium: lähteet suunnitellaan",
          ],
        },
        example:
          "Papu-täysjyväateria, kasvikset, öljy ja täydennetty juoma rakentavat kokonaisuutta. B12:n varmistaminen on erillinen suunnittelukohta.",
        terms: [
          {
            word: "Vegaaninen",
            definition: "Ruokavalio, jossa ei käytetä eläinperäisiä ruokia.",
          },
          {
            word: "B12-vitamiini",
            definition:
              "Hermoston ja veren muodostumisen tarvitsema vitamiini, jonka luotettava saanti on varmistettava vegaanisessa ruokavaliossa.",
          },
        ],
        recall: {
          prompt:
            "Miksi vegaaninen ruokavalio vaatii B12-vitamiinin erityistä huomioimista?",
          model:
            "Tavallinen täydentämätön kasvisruoka ei ole luotettava B12:n lähde. Saanti varmistetaan sopivalla täydentämisellä asiantuntijan ohjeen mukaan.",
          rubric: [
            "Luotettavan lähteen puute",
            "Saannin järjestelmällinen varmistus",
          ],
        },
        questions: [
          [
            "Mikä muutos rakentaa tasapainoisempaa kasvisateriaa?",
            [
              "Poistan pääruoan enkä lisää mitään.",
              "Korvaan pääruoan esimerkiksi papu- tai linssiruoalla.",
              "Syön vain salaattia joka aterialla.",
            ],
            1,
            "Korvaava proteiinin ja energian lähde tekee kokonaisuudesta riittävämmän. Pelkkä karsiminen voi jättää puutteita.",
          ],
          [
            "Mikä on erityisen tärkeää vegaanisessa ruokavaliossa?",
            [
              "B12-vitamiinin luotettavan saannin varmistaminen",
              "Kaiken rasvan välttäminen",
              "Oletus, että merilevä ratkaisee kaikki tarpeet",
            ],
            0,
            "B12:n saanti ei saa jäädä epävarmojen lähteiden varaan. Myös muut ravintoaineet ja riittävä energia huomioidaan.",
          ],
        ],
        application: {
          prompt:
            "Perustele, miksi kasvisruokavalioon siirtyvän nuoren kannattaa suunnitella korvaavat ruoat ja ravintoaineiden saanti.",
          model:
            "Pelkkä pois jättäminen voi vähentää energiaa ja proteiinia. Palkokasvit ja muut sopivat ruoat korvaavat niitä, ja B12:n, D-vitamiinin, raudan sekä kalsiumin saanti varmistetaan. Koulukeittiö ja ammattilainen voivat auttaa kasvun tarpeissa.",
          rubric: [
            "Karsimisen ja korvaamisen ero",
            "Proteiini ja energia",
            "B12 sekä muu mikroravintoaine ja tuki",
          ],
        },
        source: diets,
      }),
    ],
  },
  {
    id: "7.3",
    title: "Liika istuminen on terveysriski",
    description: "Tauot, arkiliike ja vaihteleva työasento.",
    group: "Ravinto ja liike",
    color: "lime",
    source: sitting,
    lessons: [
      lesson("7.3", 1, {
        title: "Treeni ja pitkä istuminen ovat eri kysymyksiä",
        hook: "Käyt tunnin harjoituksissa mutta istut muun päivän. Poistaako treeni taukojen tarpeen?",
        paragraphs: [
          "Paikallaanolo tarkoittaa valveilla tehtävää vähäisen energiankulutuksen toimintaa istuen tai makuulla. Pitkissä istumisjaksoissa lihasten aktiivisuus vähenee ja kuormitus voi kasautua esimerkiksi niskaan. Runsas paikallaanolo liittyy pitkällä aikavälillä aineenvaihdunnan ja verenkiertoelimistön terveysriskeihin. Kyse on kokonaisuuden riskistä, ei siitä että jokainen istumishetki olisi vaarallinen.",
          "Liikuntaharrastus tukee terveyttä, mutta pitkä yhtäjaksoinen paikallaanolo on silti hyvä katkaista. Oppiminen, lepo ja matkustaminen sisältävät väistämättä istumista, joten tavoitteena on vaihtelu, ei syyllisyys. Lyhyt jaloittelu, asennon vaihto tai seisomaan nouseminen aktivoi kehoa päivän aikana. Liikuntarajoitteissa taukoja ja asentojen vaihtelua sovelletaan omien mahdollisuuksien ja yksilöllisen ohjeen mukaan.",
        ],
        diagram: {
          title: "Kaksi rinnakkaista tavoitetta",
          steps: [
            "Liiku monipuolisesti",
            "Katkaise pitkä paikallaanolo",
            "Palauta ja lepää riittävästi",
          ],
        },
        example:
          "Iltaharjoitus ja opiskelun välissä tehty jaloittelu täydentävät toisiaan. Tauko ei vaadi urheiluvaatteita tai hengästymistä.",
        terms: [
          {
            word: "Paikallaanolo",
            definition:
              "Valveilla istuen tai makuulla vietetty vähäisen energiankulutuksen aika.",
          },
          {
            word: "Aineenvaihdunta",
            definition:
              "Elimistön kemiallisten reaktioiden kokonaisuus, johon kuuluu energian ja rakennusaineiden käsittely.",
          },
        ],
        recall: {
          prompt:
            "Miksi liikuntaharrastus ei yksin poista istumisen tauottamisen tarvetta?",
          model:
            "Harrastus lisää liikettä, mutta muu päivä voi silti sisältää pitkiä passiivisia jaksoja. Tauot aktivoivat lihaksia ja vaihtavat kuormitusta niiden aikana.",
          rubric: [
            "Kaksi erillistä päivän ominaisuutta",
            "Tauon vaikutus kuormitukseen",
          ],
        },
        questions: [
          [
            "Mikä tavoite on perusteltu?",
            [
              "En saa enää koskaan istua.",
              "Lisään liikettä ja katkaisen pitkiä istumisjaksoja.",
              "Tunnin treenin jälkeen taukoja ei tarvita.",
            ],
            1,
            "Tavoite on kohtuullinen vaihtelu. Istuminen on osa arkea, mutta pitkät jaksot kannattaa katkaista.",
          ],
          [
            "Mikä on tauon välitön hyöty?",
            [
              "Lihasaktiivisuus ja asennon kuormitus muuttuvat.",
              "Kaikki pitkäaikaiset riskit katoavat heti.",
              "Uni korvautuu kokonaan.",
            ],
            0,
            "Liike ja asennon vaihto vähentävät yhtäjaksoista passiivisuutta. Ne eivät korvaa unta tai poista kaikkia riskejä yhdellä kertaa.",
          ],
        ],
        application: {
          prompt:
            "Arvioi väitettä ”urheilijan ei tarvitse tauottaa ruutuaikaa”. Perustele päivän kokonaisuudella.",
          model:
            "Urheilukin jättää päivään paljon muuta aikaa. Jos se kuluu pitkissä istumisjaksoissa, lihakset ovat passiivisia ja paikallinen kuormitus jatkuu. Liikuntaharrastus ja lyhyet arkiset tauot tukevat eri tavoin kokonaisuutta.",
          rubric: [
            "Harrastus ja muu päivä erotettu",
            "Passiivisuus tai kuormitus",
            "Tauko täydentää liikuntaa",
          ],
        },
        source: sitting,
      }),
      lesson("7.3", 2, {
        title: "Arkiliike syntyy pienistä siirtymistä",
        hook: "Hissin odottaminen, bussipysäkki ja välitunti: missä kohtaa päivää liike voisi lisääntyä ilman erillistä treeniä?",
        paragraphs: [
          "Arkiliike on tavalliseen päivään kuuluvaa liikkumista, kuten kävelyä, portaiden käyttöä, pyöräilyä ja kotitöitä. Sen merkitys syntyy toistumisesta: useat pienet liikehetket lisäävät lihasten käyttöä ja kokonaisaktiivisuutta. Hyötyliikunta tarkoittaa liikettä, joka syntyy muun tavoitteen, esimerkiksi matkan tai tehtävän yhteydessä.",
          "Tapa muodostuu helpommin, kun teko liittyy olemassa olevaan tilanteeseen. Voit nousta juomaan vettä tehtäväjakson päättyessä tai kävellä ystävän kanssa välitunnilla. Turvallisuus ja omat toimintamahdollisuudet huomioidaan; jokaisen ei tarvitse tehdä samaa. Pelkkä päätös liikkua enemmän on epämääräinen, kun taas tietty aika, paikka ja pieni teko ovat toteutettavia. Liikkeen ei tarvitse olla kilpailua tai suoritusmittarin täyttämistä.",
        ],
        diagram: {
          title: "Tee liikkeestä helppo tapa",
          steps: [
            "Vihje: tehtäväjakso päättyy",
            "Teko: vaihdan asentoa tai liikun",
            "Toisto: sama seuraavalla jaksolla",
          ],
        },
        example:
          "Koulumatkan turvallinen osa kävellen on hyötyliikuntaa: samalla kuljetaan paikasta toiseen ja käytetään lihaksia.",
        terms: [
          {
            word: "Arkiliike",
            definition: "Päivittäisiin toimintoihin sisältyvä liikkuminen.",
          },
          {
            word: "Hyötyliikunta",
            definition:
              "Liike, joka syntyy esimerkiksi matkan, työn tai kotitehtävän yhteydessä.",
          },
        ],
        recall: {
          prompt:
            "Määrittele hyötyliikunta ja anna kaksi erilaista esimerkkiä.",
          model:
            "Hyötyliikunta on muun asian yhteydessä syntyvää liikettä. Sitä ovat esimerkiksi kävely kouluun ja kodin siivoaminen.",
          rubric: ["Muun tavoitteen yhteys", "Kaksi konkreettista esimerkkiä"],
        },
        questions: [
          [
            "Mikä on hyötyliikuntaa?",
            [
              "Pyöräily kauppaan turvallista reittiä",
              "Pelkkä liikunnan suunnittelu",
              "Vain kilpailuun osallistuminen",
            ],
            0,
            "Kauppamatka ja liike toteutuvat samalla kertaa. Hyötyliikunta ei edellytä kilpailua.",
          ],
          [
            "Mikä suunnitelma toteutuu helpoimmin?",
            [
              "Liikun joskus paljon.",
              "Nousen jokaisen tehtäväjakson jälkeen hakemaan vettä.",
              "Odotan täydellistä vapaapäivää.",
            ],
            1,
            "Selkeä vihje ja pieni teko tekevät suunnitelmasta konkreettisen ja toistettavan.",
          ],
        ],
        application: {
          prompt:
            "Laadi kuvitteelliselle koulupäivälle kolme arkiliikkeen kohtaa. Liitä kuhunkin tilanne ja teko.",
          model:
            "Turvallinen koulumatkan osa kuljetaan kävellen. Välitunnilla kierretään piha kaverin kanssa. Kotitehtävien jaksojen välissä noustaan ja vaihdetaan asentoa. Pienet teot toistuvat valmiissa arjen kohdissa.",
          rubric: [
            "Kolme erilaista tilannetta",
            "Konkreettiset pienet teot",
            "Turvallisuus tai omiin mahdollisuuksiin sovittaminen",
          ],
        },
        source: sitting,
      }),
      lesson("7.3", 3, {
        title: "Paras työasento on myös vaihtuva asento",
        hook: "Niska väsyy puhelimen ääressä. Ratkeaako asia etsimällä yksi asento, jossa voi olla koko illan?",
        paragraphs: [
          "Ergonomia tarkoittaa työn, välineiden ja ympäristön sovittamista ihmiselle. Opiskelussa siihen kuuluvat esimerkiksi näytön sopiva korkeus, riittävä valo, tuolin tuki ja käsien luonteva asento. Kun välineet ovat lähellä eikä päätä tarvitse pitää pitkään voimakkaasti kumarassa, paikallinen kuormitus voi vähentyä.",
          "Mikään yksittäinen asento ei ole tarkoitettu koko päiväksi. Vaihtelu ja tauot ovat tärkeitä myös hyvin säädetyssä työpisteessä. Niskan tai selän oireita ei voi selittää aina yhdellä asennolla, sillä kuormitukseen vaikuttavat myös uni, stressi ja toiminnan kesto. Pitkittyvistä tai voimakkaista oireista kannattaa keskustella terveydenhoitajan kanssa. Tavoitteena on toimiva, mukava opiskelu, ei jäykkä täydellisen ryhdin suorittaminen.",
        ],
        diagram: {
          title: "Sovita työpiste",
          steps: [
            "Näyttö ja teksti näkyvät ilman kurottamista",
            "Kädet ja jalat saavat tukea",
            "Valaistus sopii tehtävään",
            "Asento vaihtuu tauoilla",
          ],
        },
        example:
          "Läppärin nostaminen voi helpottaa katselukulmaa, mutta pitkään kirjoittaessa tarvitaan myös toimiva näppäimistön paikka. Yksi säätö ei ratkaise kaikkea.",
        terms: [
          {
            word: "Ergonomia",
            definition:
              "Toiminnan ja työympäristön sovittaminen ihmisen tarpeisiin ja toimintakykyyn.",
          },
          {
            word: "Staattinen kuormitus",
            definition:
              "Lihasten pitkäkestoinen jännitys saman asennon ylläpitämiseksi.",
          },
        ],
        recall: {
          prompt:
            "Nimeä kaksi ergonomian keinoa ja selitä, miksi myös tauko tarvitaan.",
          model:
            "Näytön korkeus ja käsien tuki voidaan säätää sopiviksi. Tauko vaihtaa pitkäkestoista kuormitusta, jota hyväkin asento voi ylläpitää.",
          rubric: ["Kaksi konkreettista säätöä", "Vaihtelun tarve"],
        },
        questions: [
          [
            "Mikä on ergonomian tavoite?",
            [
              "Pakottaa kaikki samaan asentoon",
              "Sovittaa välineet ja ympäristö ihmiselle",
              "Korvata kaikki liike",
            ],
            1,
            "Ergonomia huomioi ihmisen ja tehtävän. Se ei tarkoita yhtä kaikille sopivaa asentoa.",
          ],
          [
            "Mikä on perusteltu neuvo?",
            [
              "Pysy hyvässä asennossa liikkumatta.",
              "Vaihtele asentoa myös säädetyssä työpisteessä.",
              "Ohita jatkuva kipu aina.",
            ],
            1,
            "Pitkä samanlainen kuormitus kannattaa katkaista. Pitkittyvät oireet on syytä selvittää.",
          ],
        ],
        application: {
          prompt:
            "Sovella ergonomiaa läppärillä opiskelevaan kuvitteelliseen oppilaaseen. Ehdota kaksi säätöä ja yksi taukotapa perusteluineen.",
          model:
            "Näyttö asetetaan niin, ettei päätä tarvitse pitää pitkään kumarassa. Kädet tuetaan niin, ettei tarvitse kurottaa. Jaksojen välissä noustaan ja liikutaan, jotta saman asennon kuormitus katkeaa.",
          rubric: [
            "Näkemiseen tai pään asentoon liittyvä säätö",
            "Tukeen tai ulottumiseen liittyvä säätö",
            "Tauon mekanismi",
          ],
        },
        source: sitting,
      }),
      lesson("7.3", 4, {
        title: "Tauko suunnitellaan ennen kuin väsyttää",
        hook: "Ajattelit pitää tauon, mutta kaksi tuntia kului huomaamatta. Millainen suunnitelma auttaisi seuraavalla kerralla?",
        paragraphs: [
          "Keskittyessä ajan kulumista voi olla vaikea huomata. Tauon sitominen opiskelujakson vaihtumiseen tekee siitä ennakoitavan. Lyhyt liikehetki voi sisältää jaloittelua, hartioiden liikettä tai muuta itselle sopivaa asentojen vaihtelua. Näytöstä irrottautuminen antaa samalla huomion siirtyä ja voi helpottaa palaamista tehtävään.",
          "Hyvä suunnitelma sisältää teon, vihjeen ja arvioinnin. Esimerkiksi tehtäväkokonaisuuden jälkeen nousen ja haen vettä; illalla arvioin, toteutuiko se. Jos ei toteutunut, pienennän tekoa tai teen vihjeestä näkyvämmän. Tauottaminen ei ole rangaistus huonosta keskittymisestä. Myös koulu, koti ja sovellusten suunnittelu voivat tehdä liikkumisesta helppoa, joten vastuu ei ole vain yksilön muistamisen varassa.",
        ],
        diagram: {
          title: "Toteutettava taukokokeilu",
          steps: [
            "Milloin? Jakson vaihtuessa",
            "Mitä? Lyhyt liike tai asennon vaihto",
            "Miten huomaan? Muistutus",
            "Toimiko? Muokkaa tarvittaessa",
          ],
        },
        example:
          "Puhelimen laittaminen lataukseen huoneen toiselle puolelle voi vähentää jatkuvaa katselua. Tärkein tauko on silti sellainen, jonka oma arki sallii.",
        terms: [
          {
            word: "Tauottaminen",
            definition:
              "Pitkän yhtäjaksoisen toiminnan katkaiseminen lyhyillä palauttavilla tai asentoa vaihtavilla hetkille.",
          },
          {
            word: "Toimintasuunnitelma",
            definition:
              "Konkreettinen kuvaus siitä, milloin, missä ja miten teko tehdään.",
          },
        ],
        recall: {
          prompt:
            "Mitkä kolme asiaa tekevät taukosuunnitelmasta konkreettisen ja toistettavan?",
          model:
            "Nimeän tilanteen tai ajan, pienen toteutettavan teon ja keinon huomata tai arvioida toteutumista. Esimerkiksi tehtäväjakson päättyessä nousen hakemaan vettä ja tarkistan illalla, muistinko tauot.",
          rubric: ["Ajankohta tai vihje", "Teko ja seuranta"],
        },
        questions: [
          [
            "Mikä tauko katkaisee istumista?",
            [
              "Saman tuolin ääressä toiseen sovellukseen vaihtaminen",
              "Lyhyt jaloittelu tai itselle sopiva liike",
              "Pelkkä tauon ajatteleminen",
            ],
            1,
            "Liike tai asennon vaihto muuttaa kuormitusta. Sovelluksen vaihto ei välttämättä muuta paikallaanoloa.",
          ],
          [
            "Suunnitelma ei toteutunut. Mikä on hyödyllinen päätelmä?",
            [
              "Olen toivoton.",
              "Pienennän tekoa ja selkeytän vihjettä.",
              "Tauoista ei voi olla hyötyä.",
            ],
            1,
            "Toimintatapaa kannattaa säätää arkeen sopivaksi. Yksi epäonnistuminen ei arvioi ihmisarvoa tai taukojen hyötyä.",
          ],
        ],
        application: {
          prompt:
            "Laadi ja perustele taukosuunnitelma 20 minuutin opiskeluun. Kerro myös, miten muutat sitä, jos se unohtuu.",
          model:
            "Kun ensimmäinen tehtäväjakso päättyy, nousen hetkeksi ja liikutan hartioita ennen seuraavaa osaa. Jakson vaihto toimii vihjeenä ja liike katkaisee kuormituksen. Jos unohdan, lisään näkyvän muistutuksen tai lyhennän taukoteon.",
          rubric: [
            "Selkeä vihje",
            "Kuormitusta muuttava teko perusteluineen",
            "Realistinen muutos unohtuessa",
          ],
        },
        source: sitting,
      }),
    ],
  },
];
