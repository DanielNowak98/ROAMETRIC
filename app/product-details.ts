// Ausführliche Produktinhalte je Slug.
// BEISPIELINHALTE: Maße, Gewichte und Lieferumfang sind Richtwerte für die Beispielprodukte
// und müssen vor dem Livegang durch gemessene Werte der echten Bauteile ersetzt werden.

export type ProductDetail = {
  /** Kurzer Claim unter dem Produktnamen. */
  tagline: string;
  /** Fließtext, ein Eintrag pro Absatz. */
  story: string[];
  /** 3–4 Kernvorteile: Titel + Satz. */
  highlights: { title: string; text: string }[];
  /** Typische Einsatzorte / passende Ausrüstung. */
  useCases: string[];
  specs: { label: string; value: string }[];
  inBox: string[];
  care: string;
};

export const productDetails: Record<string, ProductDetail> = {
  'gi-guertel-wandhalter': {
    tagline: 'Gi aufhängen, Gürtel zeigen, Gear trocknen.',
    story: [
      'Nach dem Training landet der Gi zu oft zusammengeknüllt in der Tasche. Der Wandhalter gibt ihm einen festen Platz: Die zwei weit ausgestellten Haken tragen Jacke und Hose getrennt, sodass Luft zirkulieren kann und der Stoff schneller trocknet.',
      'Die Haken sind mit großen Radien konstruiert — der schwere Baumwollstoff bekommt keine Knicke, und der Gürtel liegt sauber über der oberen Rundung. Montiert wird mit zwei Schrauben, verdeckt hinter der Kontur.',
    ],
    highlights: [
      { title: 'Zwei Haken, getrennt', text: 'Jacke und Hose hängen nebeneinander und trocknen gleichmäßig.' },
      { title: 'Große Radien', text: 'Kein Abknicken von Stoff oder Gürtel, auch bei schweren Pearl-Weave-Gis.' },
      { title: 'Hohe Traglast', text: 'Rippenstruktur im Hakenansatz für nasse, schwere Gis.' },
      { title: 'Einfache Montage', text: 'Zwei Schrauben, passend für Dübel in Wand oder Spind.' },
    ],
    useCases: ['Zuhause im Flur', 'Spind im Gym', 'Dojo-Wand', 'Trockenraum'],
    specs: [{ label: 'Abmessungen', value: 'ca. 160 × 120 × 70 mm' }, { label: 'Gewicht', value: 'ca. 85 g' }, { label: 'Traglast', value: 'ca. 5 kg pro Haken' }, { label: 'Befestigung', value: '2 × Senkkopfschraube Ø 4 mm' }],
    inBox: ['1 × Gi & Gürtel Wandhalter', '2 × Schraube 4 × 40 mm', '2 × Dübel 6 mm'],
    care: 'Mit feuchtem Tuch abwischen. Kein Lösungsmittel.',
  },
  'mundschutz-case': {
    tagline: 'Belüftet. Kompakt. Immer griffbereit.',
    story: [
      'Ein Mundschutz, der nach dem Training luftdicht verpackt wird, wird schnell zum Hygieneproblem. Das Case hat deshalb zwölf Lüftungsschlitze, durch die Restfeuchtigkeit entweichen kann — der Mundschutz bleibt trotzdem geschützt vor Staub und Druck.',
      'Der Deckel rastet mit einem fühlbaren Klick ein und öffnet sich nicht versehentlich in der Tasche. Durch die abgerundete Form passt das Case in jedes Seitenfach der Gym Bag.',
    ],
    highlights: [
      { title: 'Belüftet', text: 'Zwölf Schlitze lassen Feuchtigkeit entweichen.' },
      { title: 'Sicherer Verschluss', text: 'Rastnase mit klarem Klick — öffnet sich nicht in der Tasche.' },
      { title: 'Abwaschbar', text: 'Glatte Innenflächen, spülmaschinengeeignet bis 60 °C.' },
      { title: 'Passt überall', text: 'Kompakt genug für Hosentasche und Seitenfach.' },
    ],
    useCases: ['BJJ & Grappling', 'Kickboxen & Karate', 'Judo-Wettkampf', 'Gym Bag'],
    specs: [{ label: 'Abmessungen', value: 'ca. 85 × 70 × 35 mm' }, { label: 'Gewicht', value: 'ca. 32 g' }, { label: 'Innenraum', value: 'für gängige Boil-and-Bite-Schützer' }, { label: 'Reinigung', value: 'Spülmaschine bis 60 °C' }],
    inBox: ['1 × Mundschutz Case (Ober- und Unterteil)'],
    care: 'Nach dem Training ausspülen und offen trocknen lassen.',
  },
  'tape-spender-gymbag': {
    tagline: 'Tape abreißen, ohne zu suchen.',
    story: [
      'Fingertape gehört zu jedem Training — und verschwindet trotzdem ständig am Boden der Tasche. Der Spender nimmt eine Rolle bis 38 mm Breite auf und hält sie mit einer Lasche griffbereit an Riemen oder Gürtelschlaufe.',
      'Die gezahnte Abreißkante aus carbonverstärktem PETG bleibt scharf und schneidet Tape sauber ab, ohne die Kanten auszufransen. Die Rolle lässt sich ohne Werkzeug wechseln.',
    ],
    highlights: [
      { title: 'Saubere Abrisskante', text: 'Gezahnte Kante aus PETG-CF — bleibt dauerhaft scharf.' },
      { title: 'Werkzeuglos befüllen', text: 'Rolle einlegen, einrasten, fertig.' },
      { title: 'Befestigungslasche', text: 'Hängt an Riemen, Karabiner oder Gürtelschlaufe.' },
    ],
    useCases: ['Fingertape BJJ', 'Sporttape', 'Kinesiotape', 'Erste-Hilfe-Set'],
    specs: [{ label: 'Abmessungen', value: 'ca. 90 × 90 × 45 mm' }, { label: 'Gewicht', value: 'ca. 48 g' }, { label: 'Rollenbreite', value: 'bis 38 mm' }, { label: 'Rollendurchmesser', value: 'bis 75 mm' }],
    inBox: ['1 × Tape-Spender', '1 × Befestigungslasche'],
    care: 'Klebereste mit etwas Speiseöl lösen, dann abwischen.',
  },
  'obi-display': {
    tagline: 'Dein Weg. Gürtel für Gürtel.',
    story: [
      'Jeder Gürtel steht für Jahre auf der Matte. Das Obi-Display gibt ihnen den Platz, den sie verdienen: Sechs Aufnahmen tragen die Gürtel deines Werdegangs nebeneinander — vom ersten Kyu bis zum aktuellen Grad.',
      'Die Aufnahmen sind so tief ausgeführt, dass auch dicke, schwere Gürtel mit Stickerei sauber fallen. Die Leiste wird mit zwei Schrauben montiert und lässt sich mit einem zweiten Modul seitlich erweitern.',
    ],
    highlights: [
      { title: 'Sechs Aufnahmen', text: 'Platz für alle Grade — vom Weiß- bis zum aktuellen Gürtel.' },
      { title: 'Für jede Gürtelstärke', text: 'Tiefe Aufnahmen auch für bestickte Wettkampfgürtel.' },
      { title: 'Erweiterbar', text: 'Mehrere Leisten lassen sich bündig aneinander setzen.' },
    ],
    useCases: ['BJJ', 'Japanisches Jiu-Jitsu', 'Judo & Karate', 'Dojo-Eingang'],
    specs: [{ label: 'Abmessungen', value: 'ca. 420 × 140 × 45 mm' }, { label: 'Gewicht', value: 'ca. 160 g' }, { label: 'Aufnahmen', value: '6 Stück, je ca. 25 mm breit' }, { label: 'Befestigung', value: '2 × Schraube Ø 4 mm' }],
    inBox: ['1 × Obi-Display', '2 × Schraube 4 × 40 mm', '2 × Dübel 6 mm'],
    care: 'Staub mit trockenem Tuch entfernen.',
  },
  'bokken-wandhalter': {
    tagline: 'Holzwaffen sicher an der Wand.',
    story: [
      'Bokken, Jo und Hanbo lehnen oft in der Ecke und fallen bei der ersten Berührung um. Das Halterpaar legt sie waagerecht an die Wand — sicher, gut sichtbar und mit einem Griff herunterzunehmen.',
      'Die U-förmigen Auflagen sind innen weich abgerundet, sodass Lack und Holz keine Druckstellen bekommen. Der Abstand der Halter ist frei wählbar, damit sowohl ein kurzes Tanto als auch ein Jo sicher aufliegen.',
    ],
    highlights: [
      { title: 'Schonende Auflage', text: 'Runde Innenkontur, keine Druckstellen im Holz.' },
      { title: 'Für alle Längen', text: 'Freier Abstand — vom Tanto bis zum Jo.' },
      { title: 'Stabil', text: 'Carbonverstärktes PETG, steif auch unter Last.' },
    ],
    useCases: ['Bokken', 'Jo & Hanbo', 'Shinai', 'Dojo-Wand'],
    specs: [{ label: 'Abmessungen je Halter', value: 'ca. 50 × 85 × 45 mm' }, { label: 'Gewicht', value: 'ca. 2 × 30 g' }, { label: 'Auflagebreite', value: 'bis Ø 32 mm' }, { label: 'Befestigung', value: 'je 1 × Schraube Ø 4 mm' }],
    inBox: ['2 × Wandhalter', '2 × Schraube 4 × 40 mm', '2 × Dübel 6 mm'],
    care: 'Mit feuchtem Tuch abwischen.',
  },
  'schuetzer-trockenstaender': {
    tagline: 'Schützer trocknen, statt zu müffeln.',
    story: [
      'Hand-, Fuß- und Schienbeinschützer bleiben nach dem Training lange feucht — vor allem, wenn sie flach liegen. Der Trockenständer stellt sie aufrecht und offen hin, sodass die Luft von allen Seiten an die Polster kommt.',
      'Die Bodenplatte ist belüftet, die beiden Gabeln sind weit genug für Schienbeinschützer und schmal genug für Handschützer. Rutschfeste Füße halten den Ständer auch auf glatten Fliesen an Ort und Stelle.',
    ],
    highlights: [
      { title: 'Luft von allen Seiten', text: 'Aufrechte Lagerung und belüftete Bodenplatte.' },
      { title: 'Für jede Größe', text: 'Hand-, Fuß- und Schienbeinschützer passen.' },
      { title: 'Rutschfest', text: 'Füße aus TPU halten auf Fliesen und Holz.' },
    ],
    useCases: ['Karate & Kickboxen', 'Taekwondo', 'MMA-Handschuhe', 'Trockenraum'],
    specs: [{ label: 'Abmessungen', value: 'ca. 200 × 110 × 180 mm' }, { label: 'Gewicht', value: 'ca. 140 g' }, { label: 'Gabelweite', value: 'ca. 90 mm' }],
    inBox: ['1 × Trockenständer', '4 × rutschfester Fuß (TPU)'],
    care: 'Mit mildem Reiniger abwischen.',
  },
  'lenker-smartphone-halter': {
    tagline: 'Navigation im Blick, auch auf Schotter.',
    story: [
      'Ein Smartphone-Halter muss zwei Dinge können: das Handy fest halten und Vibrationen schlucken. Die Klemme sitzt formschlüssig auf dem Lenker, die vier Eckkrallen halten das Smartphone, ohne Tasten zu verdecken.',
      'Über einen Einlegering passt die Klemme auf 31,8- und 35-mm-Lenker. Die Montage gelingt ohne Werkzeug in unter einer Minute — Klemme aufsetzen, Schraube von Hand anziehen, fertig.',
    ],
    highlights: [
      { title: 'Vibrationsarm', text: 'Formschlüssige Klemme mit Elastomer-Einlage.' },
      { title: 'Werkzeuglos', text: 'Rändelschraube, in einer Minute montiert.' },
      { title: 'Freie Tasten', text: 'Vier Eckkrallen statt umlaufendem Rahmen.' },
    ],
    useCases: ['Gravel & MTB', 'Rennrad', 'E-Bike', 'Pendeln'],
    specs: [{ label: 'Lenkerdurchmesser', value: '31,8 mm / 35 mm (mit Einlegering)' }, { label: 'Smartphones', value: 'ca. 65–80 mm Breite' }, { label: 'Gewicht', value: 'ca. 55 g' }],
    inBox: ['1 × Halter mit Klemme', '1 × Einlegering 31,8 mm', '1 × Rändelschraube M5'],
    care: 'Nach Schlammfahrten mit Wasser abspülen.',
  },
  'flaschenhalter-adapter': {
    tagline: 'Flaschenhalter dort, wo keine Gewinde sind.',
    story: [
      'Viele Rahmen haben zu wenige oder gar keine Gewindebohrungen. Der Adapter wird mit zwei Schlauchschellen oder Klettbändern am Rohr befestigt und bietet zwei Gewindeeinsätze im Standardabstand von 64 mm — für Flaschenhalter, Werkzeugbox oder Pumpe.',
      'Die Unterseite ist hohl ausgeformt und liegt auf Rohren von 28 bis 45 mm satt an. Eine Schutzfolie verhindert Kratzer im Lack.',
    ],
    highlights: [
      { title: 'Standardabstand 64 mm', text: 'Passt zu nahezu jedem Flaschenhalter.' },
      { title: 'Rohre 28–45 mm', text: 'Hohlkehle für runde und ovale Profile.' },
      { title: 'Lackschonend', text: 'Mit Schutzfolie für die Auflage.' },
    ],
    useCases: ['Gabel', 'Oberrohr', 'Sattelstütze', 'Bikepacking'],
    specs: [{ label: 'Abmessungen', value: 'ca. 120 × 36 × 18 mm' }, { label: 'Gewicht', value: 'ca. 22 g' }, { label: 'Gewinde', value: '2 × M5, Abstand 64 mm' }],
    inBox: ['1 × Adapter', '2 × Schlauchschelle', '1 × Lackschutzfolie'],
    care: 'Schrauben nach den ersten Fahrten nachziehen.',
  },
  'unterrohr-werkzeugbox': {
    tagline: 'Schlauch, Pumpe, Multitool — klapperfrei verstaut.',
    story: [
      'Die Werkzeugbox sitzt im Flaschenhalter-Bereich am Unterrohr und schafft Platz für das, was unterwegs wirklich zählt: Ersatzschlauch, Reifenheber, Multitool und CO₂-Kartusche.',
      'Eine Einlage aus weichem Schaum hält alles an Ort und Stelle — auch auf Schotter klappert nichts. Der Deckel lässt sich mit einer Vierteldrehung öffnen und bleibt dabei an der Box.',
    ],
    highlights: [
      { title: 'Klapperfrei', text: 'Schaumeinlage fixiert den Inhalt.' },
      { title: 'Schnell geöffnet', text: 'Vierteldrehung, Deckel bleibt verbunden.' },
      { title: 'Spritzwassergeschützt', text: 'Umlaufende Dichtlippe am Deckel.' },
    ],
    useCases: ['Gravel & MTB', 'Rennrad', 'Bikepacking', 'Pendeln'],
    specs: [{ label: 'Abmessungen', value: 'ca. 180 × 75 × 75 mm' }, { label: 'Volumen', value: 'ca. 600 ml' }, { label: 'Gewicht', value: 'ca. 110 g' }, { label: 'Befestigung', value: 'Flaschenhalter-Gewinde, 64 mm' }],
    inBox: ['1 × Werkzeugbox mit Deckel', '1 × Schaumeinlage', '2 × Schraube M5'],
    care: 'Dichtlippe gelegentlich reinigen.',
  },
  'molle-panel-halterung': {
    tagline: 'Ordnung an jeder freien Fläche.',
    story: [
      'MOLLE-Panels machen aus Wänden, Türen und Heckklappen Stauraum. Die Halterung setzt das MOLLE-Raster in 25-mm-Teilung direkt in den Camper — für Taschen, Pouches, Lampen und Werkzeug.',
      'Die Panels lassen sich untereinander koppeln und an den Haken der Oberkante einhängen oder direkt verschrauben. So wächst das System mit deinem Ausbau.',
    ],
    highlights: [
      { title: 'MOLLE-Raster 25 mm', text: 'Kompatibel mit gängigen Pouches und Taschen.' },
      { title: 'Einhängen oder verschrauben', text: 'Haken an der Oberkante oder feste Montage.' },
      { title: 'Koppelbar', text: 'Mehrere Panels bündig nebeneinander.' },
    ],
    useCases: ['Heckklappe', 'Schiebetür', 'Möbelfront', 'Werkstattwand'],
    specs: [{ label: 'Abmessungen', value: 'ca. 250 × 260 × 18 mm' }, { label: 'Gewicht', value: 'ca. 190 g' }, { label: 'Raster', value: '3 × 7 Schlaufen, 25 mm' }],
    inBox: ['1 × MOLLE-Panel', '4 × Schraube 4 × 25 mm'],
    care: 'Mit feuchtem Tuch abwischen.',
  },
  'schubladen-sicherung': {
    tagline: 'Bleibt zu — auch auf der Schotterpiste.',
    story: [
      'Schubladen und Klappen im Camper gehen bei der ersten Kurve auf. Die flexible Sicherung aus TPU spannt sich über die Fuge und hält alles geschlossen — ohne Bohren, ohne Magnete.',
      'Zum Öffnen wird die Schlaufe einfach über den Knopf gezogen. Das Material bleibt auch nach tausenden Zyklen elastisch und hinterlässt keine Spuren auf der Möbeloberfläche.',
    ],
    highlights: [
      { title: 'Elastisch', text: 'TPU bleibt auch nach vielen Zyklen in Form.' },
      { title: 'Ohne Bohren', text: 'Klebepads oder kleine Schrauben — du entscheidest.' },
      { title: 'Einhändig', text: 'Schlaufe abziehen, Schublade auf.' },
    ],
    useCases: ['Küchenzeile', 'Kühlschrank', 'Staufächer', 'Dachklappen'],
    specs: [{ label: 'Länge', value: 'ca. 130 mm' }, { label: 'Dehnung', value: 'bis ca. 20 %' }, { label: 'Gewicht', value: 'ca. 12 g' }],
    inBox: ['2 × Sicherung', '2 × Knopf mit Klebepad'],
    care: 'Mit Wasser und mildem Reiniger säubern.',
  },
  'gewuerzregal-modul': {
    tagline: 'Gewürze im Griff, auch in der Kurve.',
    story: [
      'In der Camperküche zählt jeder Zentimeter. Das Regalmodul nimmt drei Standard-Gewürzgläser sicher auf — die runden Aufnahmen verhindern, dass während der Fahrt etwas umfällt.',
      'Die Module lassen sich horizontal aneinanderreihen. Aus UV-beständigem ASA gefertigt, vergilben sie auch am Fenster nicht.',
    ],
    highlights: [
      { title: 'Fahrsicher', text: 'Runde Aufnahmen fixieren die Gläser.' },
      { title: 'Modular', text: 'Beliebig viele Module nebeneinander.' },
      { title: 'UV-beständig', text: 'ASA vergilbt auch in der Sonne nicht.' },
    ],
    useCases: ['Camperküche', 'Wohnmobil', 'Bootsküche', 'Tiny House'],
    specs: [{ label: 'Abmessungen', value: 'ca. 210 × 90 × 70 mm' }, { label: 'Aufnahmen', value: '3 × Ø 48 mm' }, { label: 'Gewicht', value: 'ca. 95 g' }],
    inBox: ['1 × Regalmodul', '3 × Schraube 4 × 25 mm', '1 × Verbinder'],
    care: 'Mit feuchtem Tuch abwischen.',
  },
  'sonnensegel-halter': {
    tagline: 'Schatten an Bord, sicher befestigt.',
    story: [
      'Der Halter klemmt formschlüssig auf Reling oder Bimini-Rohr und bietet eine große Öse für Schäkel, Karabiner oder Spannleine. So lässt sich das Sonnensegel in Minuten anschlagen und wieder abbauen.',
      'ASA bleibt auch nach Jahren in Sonne und Salzwasser formstabil und farbtreu. Die Klemmung verteilt die Last großflächig und hinterlässt keine Druckstellen am Edelstahl.',
    ],
    highlights: [
      { title: 'Salzwasserfest', text: 'ASA: UV-stabil, korrosionsfrei, farbtreu.' },
      { title: 'Große Öse', text: 'Für Schäkel, Karabiner und Spannleinen.' },
      { title: 'Rohrschonend', text: 'Großflächige Klemmung ohne Druckstellen.' },
    ],
    useCases: ['Reling', 'Bimini-Gestell', 'Geräteträger', 'Steg'],
    specs: [{ label: 'Rohrdurchmesser', value: '22 / 25 mm' }, { label: 'Ösen-Innendurchmesser', value: 'ca. 20 mm' }, { label: 'Gewicht', value: 'ca. 45 g' }],
    inBox: ['1 × Halter (zweiteilig)', '1 × Edelstahlschraube M6 mit Mutter'],
    care: 'Nach dem Törn mit Süßwasser abspülen.',
  },
  'fender-halter-reling': {
    tagline: 'Fender verstaut, in Sekunden bereit.',
    story: [
      'Wohin mit den Fendern, wenn sie nicht gebraucht werden? Der Klemmhalter wird auf die Reling geklickt und hält den Fender an seiner Leine — sicher verstaut, aber jederzeit mit einem Handgriff einsatzbereit.',
      'Die Leine wird durch den Schlitz geführt und klemmt selbst, ohne Knoten. So lassen sich Fender beim Anlegen in Sekunden auf die richtige Höhe bringen.',
    ],
    highlights: [
      { title: 'Aufklicken', text: 'Federnde Klemme, kein Werkzeug nötig.' },
      { title: 'Knotenfrei', text: 'Klemmschlitz hält die Leine selbst.' },
      { title: 'Seewasserfest', text: 'UV-stabiles ASA.' },
    ],
    useCases: ['Reling', 'Seezaun', 'Badeplattform', 'Steg'],
    specs: [{ label: 'Rohrdurchmesser', value: '22–25 mm' }, { label: 'Leinen', value: 'Ø 8–12 mm' }, { label: 'Gewicht', value: 'ca. 28 g' }],
    inBox: ['2 × Fender-Halter'],
    care: 'Mit Süßwasser abspülen.',
  },
  'persenning-clip-set': {
    tagline: 'Persenning drauf. Und sie bleibt drauf.',
    story: [
      'Wind und Regen zerren an jeder Abdeckung. Die Clips klemmen Persenning, Plane oder Sonnenschutz direkt an Rohre und Kanten — ohne Ösen und ohne Bohren.',
      'Das Set enthält Clips in drei Größen für Rohre von 16 bis 30 mm. Die offene C-Form lässt sich mit einer Hand aufsetzen und hält trotzdem fest.',
    ],
    highlights: [
      { title: 'Drei Größen', text: 'Für Rohre von 16 bis 30 mm.' },
      { title: 'Einhändig', text: 'Aufdrücken, hält.' },
      { title: 'Ohne Bohren', text: 'Kein Eingriff in Plane oder Boot.' },
    ],
    useCases: ['Persenning', 'Bimini', 'Sonnensegel', 'Anhängerplane'],
    specs: [{ label: 'Rohrdurchmesser', value: '16 / 22 / 30 mm' }, { label: 'Gewicht', value: 'ca. 8–15 g je Clip' }],
    inBox: ['2 × Clip groß', '4 × Clip mittel', '4 × Clip klein'],
    care: 'Mit Süßwasser abspülen.',
  },
};

export function detailFor(slug: string): ProductDetail | undefined {
  return productDetails[slug];
}
