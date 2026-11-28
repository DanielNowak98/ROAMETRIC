// Ausführliche Produktinhalte je Slug.
// Maße stammen aus den CAD-Daten (gerundet). Funktionsbeschreibungen bitte vor dem Livegang prüfen und ergänzen.

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

const GARMIN_HINWEIS = 'Kein Originalzubehör von Garmin. Garmin und Edge sind Marken der Garmin Ltd.';

export const productDetails: Record<string, ProductDetail> = {
  'garmin-edge-1050-halter': {
    tagline: 'Fachwerk statt Vollmaterial. Leicht und steif.',
    story: [
      'Der Out-Front-Halter bringt den Garmin Edge 1050 mittig vor den Lenker — dorthin, wo der Blick beim Fahren ohnehin ist. Die Aufnahme sitzt weit genug vorne, damit das Display nicht vom Vorbau verdeckt wird.',
      'Den langen Steg haben wir als Fachwerk ausgeführt: Die Diagonalstreben nehmen Biegung und Torsion auf, während überall dort Material fehlt, wo es keine Last trägt. So bleibt der Halter steif, ohne schwer zu wirken.',
      GARMIN_HINWEIS,
    ],
    highlights: [
      { title: 'Fachwerk-Struktur', text: 'Diagonalstreben führen die Kräfte, ohne unnötiges Material.' },
      { title: 'Mittige Position', text: 'Der Computer sitzt frei vor dem Lenker, gut im Blick.' },
      { title: 'Additiv gefertigt', text: 'Eine Geometrie, die sich spanend kaum wirtschaftlich herstellen ließe.' },
    ],
    useCases: ['Garmin Edge 1050', 'Rennrad', 'Gravel', 'Training'],
    specs: [{ label: 'Abmessungen (CAD)', value: 'ca. 197 × 38 × 29 mm' }, { label: 'Kompatibel mit', value: 'Garmin Edge 1050' }],
    inBox: ['1 × Out-Front-Halter'],
    care: 'Mit feuchtem Tuch abwischen. Schrauben nach den ersten Fahrten nachziehen.',
  },
  'garmin-edge-1050-halter-minimal': {
    tagline: 'Die reduzierte Linie.',
    story: [
      'Gleiche Position, weniger Struktur: Die Minimal-Variante ersetzt das Fachwerk durch einen offenen, schlanken Steg. Sie ist kürzer als der Fachwerk-Halter und fügt sich unauffällig ins Cockpit ein.',
      'Für alle, die es aufgeräumt mögen und den Halter lieber nicht sehen als zeigen.',
      GARMIN_HINWEIS,
    ],
    highlights: [
      { title: 'Schlanker Steg', text: 'Offene Form statt Streben — ruhiges Erscheinungsbild.' },
      { title: 'Kürzere Bauform', text: 'Rund 25 mm kürzer als die Fachwerk-Variante.' },
      { title: 'Mittige Position', text: 'Der Edge 1050 sitzt frei vor dem Lenker.' },
    ],
    useCases: ['Garmin Edge 1050', 'Rennrad', 'Aero-Cockpit', 'Gravel'],
    specs: [{ label: 'Abmessungen (CAD)', value: 'ca. 172 × 38 × 29 mm' }, { label: 'Kompatibel mit', value: 'Garmin Edge 1050' }],
    inBox: ['1 × Out-Front-Halter Minimal'],
    care: 'Mit feuchtem Tuch abwischen. Schrauben nach den ersten Fahrten nachziehen.',
  },
  'garmin-stirnlampen-lock-mount': {
    tagline: 'Lampe dran. Verriegelt.',
    story: [
      'Der Lock-Mount verbindet eine Stirnlampe mit einer Garmin-kompatiblen Halterung. Statt die Lampe nur aufzustecken, wird sie formschlüssig gehalten und verriegelt — so bleibt sie auch auf ruppigen Wegen, wo sie hingehört.',
      'Das Bauteil ist kompakt und rund ausgeführt, damit es am Rad nicht aufträgt.',
      GARMIN_HINWEIS,
    ],
    highlights: [
      { title: 'Verriegelt', text: 'Formschlüssige Aufnahme statt loser Steckverbindung.' },
      { title: 'Kompakt', text: 'Rund 37 mm Durchmesser — trägt am Rad kaum auf.' },
      { title: 'PA11', text: 'Zäh und schlagfest, auch bei Kälte.' },
    ],
    useCases: ['Nachtfahrten', 'Bikepacking', 'Pendeln', 'Winter'],
    specs: [{ label: 'Abmessungen (CAD)', value: 'ca. 37 × 37 × 28 mm' }],
    inBox: ['1 × Lock-Mount'],
    care: 'Mit feuchtem Tuch abwischen.',
  },
  'ruecklichthalter': {
    tagline: 'Gesehen werden, wo es zählt.',
    story: [
      'Der Rücklichthalter klemmt mit seinem U-Profil und trägt das Licht über einen schräg gestellten Ausleger. So lässt sich das Rücklicht dort positionieren, wo es weder von Taschen noch vom Fahrer verdeckt wird.',
      'Eine Verrippung am Übergang vom Profil zum Ausleger nimmt die Hebelkräfte auf.',
    ],
    highlights: [
      { title: 'Klemmprofil', text: 'Das U-Profil sorgt für einen formschlüssigen Sitz.' },
      { title: 'Freie Sicht', text: 'Der Ausleger bringt das Licht aus dem verdeckten Bereich.' },
      { title: 'PA11', text: 'Zäh, schlagfest und witterungsbeständig.' },
    ],
    useCases: ['Bikepacking', 'Satteltasche', 'Pendeln', 'Nachtfahrten'],
    specs: [{ label: 'Abmessungen (CAD)', value: 'ca. 76 × 52 × 25 mm' }],
    inBox: ['1 × Rücklichthalter'],
    care: 'Mit Wasser abspülen.',
  },
  'canyon-bike-toolbox': {
    tagline: 'Das Werkzeug fährt mit.',
    story: [
      'Die Toolbox ist auf die Rahmenform von Canyon-Rädern ausgelegt und bietet Platz für das, was unterwegs zählt: Schlauch, Reifenheber, Multitool.',
      'Box und Deckel sind zwei Bauteile, die passgenau ineinandergreifen. Kein Originalzubehör von Canyon.',
    ],
    highlights: [
      { title: 'Rahmenspezifisch', text: 'Konstruiert für die Rahmengeometrie von Canyon.' },
      { title: 'Zweiteilig', text: 'Box und Deckel greifen passgenau ineinander.' },
      { title: 'Großes Volumen', text: 'Rund 17 cm Länge für Schlauch und Werkzeug.' },
    ],
    useCases: ['Canyon', 'Gravel', 'Rennrad', 'Bikepacking'],
    specs: [{ label: 'Abmessungen (CAD)', value: 'ca. 169 × 58 × 48 mm' }],
    inBox: ['1 × Box', '1 × Deckel'],
    care: 'Mit Wasser abspülen, offen trocknen lassen.',
  },
  'garmin-rugged-case': {
    tagline: 'Geschützt verstaut.',
    story: [
      'Das Rugged Case ist eine flache, robuste Box mit verschraubtem Deckel und einer passgenauen Aufnahme im Inneren — für den Transport im Rucksack, in der Satteltasche oder auf Reisen.',
      GARMIN_HINWEIS,
    ],
    highlights: [
      { title: 'Verschraubter Deckel', text: 'Bleibt zu, auch wenn die Tasche fällt.' },
      { title: 'Passgenaue Aufnahme', text: 'Nichts klappert, nichts verrutscht.' },
      { title: 'Flach', text: 'Rund 26 mm Bauhöhe — passt in jede Tasche.' },
    ],
    useCases: ['Reise', 'Bikepacking', 'Rucksack', 'Satteltasche'],
    specs: [{ label: 'Bauhöhe (CAD)', value: 'ca. 26 mm' }],
    inBox: ['1 × Box', '1 × Deckel', 'Schrauben'],
    care: 'Mit feuchtem Tuch abwischen.',
  },
  'garmin-hrm-box': {
    tagline: 'Brustgurt an einem Ort.',
    story: [
      'Der Herzfrequenz-Brustgurt landet nach dem Training oft lose in der Tasche. Die HRM Box gibt Gurt und Sensor einen festen Platz — mit Deckel, damit nichts verloren geht.',
      GARMIN_HINWEIS,
    ],
    highlights: [
      { title: 'Mit Deckel', text: 'Gurt und Sensor bleiben geschützt.' },
      { title: 'Stabil', text: 'Dickwandige Box für den Alltag in der Sporttasche.' },
      { title: 'Ordnung', text: 'Ein fester Platz statt Kabelsalat in der Tasche.' },
    ],
    useCases: ['Garmin HRM', 'Training', 'Sporttasche', 'Reise'],
    specs: [{ label: 'Aufbau', value: 'Box und Deckel' }],
    inBox: ['1 × Box', '1 × Deckel'],
    care: 'Mit feuchtem Tuch abwischen.',
  },
  'rucksack-spender': {
    tagline: 'Griffbereit statt Taschenboden.',
    story: [
      'Der Rucksack-Spender wird mit seiner Montageplatte an Rucksack oder Gym Bag befestigt. Der runde Behälter mit rund 60 mm Innendurchmesser hält Kleinkram griffbereit, statt dass er im Taschenboden verschwindet.',
      'Behälter und Platte sind mehrteilig aufgebaut und lassen sich zum Befüllen trennen.',
    ],
    highlights: [
      { title: 'Außen montiert', text: 'Montageplatte für Rucksack und Trainingstasche.' },
      { title: 'Rund 60 mm Innen-Ø', text: 'Platz für Rollen und Kleinteile.' },
      { title: 'Mehrteilig', text: 'Zum Befüllen und Reinigen zerlegbar.' },
    ],
    useCases: ['Gym Bag', 'Rucksack', 'Training', 'Dojo'],
    specs: [{ label: 'Abmessungen (CAD)', value: 'ca. 99 × 76 × 67 mm' }, { label: 'Innendurchmesser', value: 'ca. 60 mm' }],
    inBox: ['1 × Behälter', '1 × Montageplatte', 'Kleinteile'],
    care: 'Mit Wasser und mildem Reiniger säubern.',
  },
  'motorboot-sonnensegelhalter': {
    tagline: 'Schatten an Bord, sauber angeschlagen.',
    story: [
      'Die Baugruppe besteht aus einer Rohraufnahme für Rohre mit 60 mm Durchmesser und einem aufgesetzten Halteblock. Daran lässt sich das Sonnensegel bzw. dessen Versteifung sicher anschlagen.',
      'Beide Teile sind auf ihre Aufgabe abgestimmt und werden miteinander verschraubt.',
    ],
    highlights: [
      { title: 'Für Rohr-Ø 60 mm', text: 'Rohraufnahme mit 60 mm Innendurchmesser.' },
      { title: 'Zweiteilig', text: 'Rohraufnahme und Halteblock, verschraubt.' },
      { title: 'Auf Maß', text: 'Andere Rohrdurchmesser auf Anfrage.' },
    ],
    useCases: ['Motorboot', 'Bimini', 'Rohrgestell', 'Sonnensegel'],
    specs: [{ label: 'Abmessungen (CAD)', value: 'ca. 86 × 68 × 60 mm' }, { label: 'Rohrdurchmesser', value: '60 mm' }],
    inBox: ['1 × Rohraufnahme', '1 × Halteblock'],
    care: 'Nach dem Törn mit Süßwasser abspülen.',
  },
  'einschraubeinsatz-sonnensegel': {
    tagline: 'Die Verbindung zum Gestell.',
    story: [
      'Der Einschraubeinsatz nimmt ein Rohr mit 60 mm Durchmesser auf und trägt seitlich einen Gewindezapfen. Darüber wird die Befestigung des Sonnensegels eingeschraubt.',
      'Die Wandstärke von rund 4 mm gibt dem Ring Stabilität, ohne dass er am Gestell aufträgt.',
    ],
    highlights: [
      { title: 'Für Rohr-Ø 60 mm', text: 'Passt auf Rohre mit 60 mm Außendurchmesser.' },
      { title: 'Gewindezapfen', text: 'Seitlicher Zapfen mit ca. 17 mm Durchmesser.' },
      { title: 'Robuste Wand', text: 'Rund 4 mm Wandstärke.' },
    ],
    useCases: ['Motorboot', 'Rohrgestell', 'Sonnensegel', 'Bimini'],
    specs: [{ label: 'Abmessungen (CAD)', value: 'ca. 79 × 68 × 60 mm' }, { label: 'Rohrdurchmesser', value: '60 mm' }, { label: 'Gewindezapfen', value: 'ca. Ø 17 mm' }],
    inBox: ['1 × Einschraubeinsatz'],
    care: 'Nach dem Törn mit Süßwasser abspülen.',
  },
  'persenning-versteifungshalter': {
    tagline: 'Hält die Persenning in Form.',
    story: [
      'Der kompakte Halteblock nimmt eine Versteifungsstange der Persenning in seiner Durchgangsbohrung auf. Zwei kleine Bohrungen dienen der Befestigung.',
      'In PA12 gefertigt, robust und formstabil.',
    ],
    highlights: [
      { title: 'Für Stangen bis ca. Ø 15 mm', text: 'Durchgangsbohrung mit rund 15,5 mm.' },
      { title: 'Kompakt', text: 'Nur 60 × 35 × 17 mm.' },
      { title: 'PA12', text: 'Formstabil und robust.' },
    ],
    useCases: ['Persenning', 'Motorboot', 'Abdeckung', 'Bimini'],
    specs: [{ label: 'Abmessungen (CAD)', value: '60 × 35 × 17 mm' }, { label: 'Bohrung', value: 'ca. Ø 15,5 mm' }],
    inBox: ['1 × Halter'],
    care: 'Mit Süßwasser abspülen.',
  },
};

export function detailFor(slug: string): ProductDetail | undefined {
  return productDetails[slug];
}
