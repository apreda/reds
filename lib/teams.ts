// Team catalog for MLB, NBA and NFL. Every shirt is white "SELL" on the color
// fans think of for the team, like the Oakland originals, either alone or with
// the city underneath. Black only
// for teams that really are black and white/silver (White Sox, Nets, Spurs,
// Raiders); nothing else is printed. `city` names the
// listing ("SELL Tee — CHICAGO") and the nickname is a hidden search keyword
// so fans can type their team's name in the shop search. Neither is printed.
//
// `shirt` (Bella+Canvas 3001 tee) and `hoodie` (Gildan 18500) must be color
// names exactly as Printful lists them (see lib/printful-variants.json).

export type League = "mlb" | "nba" | "nfl";

export const LEAGUES: { id: League; label: string; sport: string }[] = [
  { id: "mlb", label: "MLB", sport: "Baseball" },
  { id: "nba", label: "NBA", sport: "Basketball" },
  { id: "nfl", label: "NFL", sport: "Football" },
];

export type Division =
  | "al-east" | "al-central" | "al-west" | "nl-east" | "nl-central" | "nl-west"
  | "nba-atlantic" | "nba-central" | "nba-southeast" | "nba-northwest" | "nba-pacific" | "nba-southwest"
  | "afc-east" | "afc-north" | "afc-south" | "afc-west" | "nfc-east" | "nfc-north" | "nfc-south" | "nfc-west";

export type Team = {
  slug: string;
  league: League;
  division: Division;
  city: string; // names the listing; never printed
  market: string; // how fans refer to the market on-site
  nickname: string; // search keyword only, never displayed or printed
  shirt: string;
  hoodie: string;
  nepo: boolean; // also sold as the NEPO PHIL tees
};

const NEPO = new Set(["cincinnati"]);

export const DIVISIONS: { id: Division; label: string; league: League }[] = [
  { id: "al-east", label: "AL East", league: "mlb" },
  { id: "al-central", label: "AL Central", league: "mlb" },
  { id: "al-west", label: "AL West", league: "mlb" },
  { id: "nl-east", label: "NL East", league: "mlb" },
  { id: "nl-central", label: "NL Central", league: "mlb" },
  { id: "nl-west", label: "NL West", league: "mlb" },
  { id: "nba-atlantic", label: "Atlantic", league: "nba" },
  { id: "nba-central", label: "Central", league: "nba" },
  { id: "nba-southeast", label: "Southeast", league: "nba" },
  { id: "nba-northwest", label: "Northwest", league: "nba" },
  { id: "nba-pacific", label: "Pacific", league: "nba" },
  { id: "nba-southwest", label: "Southwest", league: "nba" },
  { id: "afc-east", label: "AFC East", league: "nfl" },
  { id: "afc-north", label: "AFC North", league: "nfl" },
  { id: "afc-south", label: "AFC South", league: "nfl" },
  { id: "afc-west", label: "AFC West", league: "nfl" },
  { id: "nfc-east", label: "NFC East", league: "nfl" },
  { id: "nfc-north", label: "NFC North", league: "nfl" },
  { id: "nfc-south", label: "NFC South", league: "nfl" },
  { id: "nfc-west", label: "NFC West", league: "nfl" },
];

type Row = [slug: string, division: Division, market: string, nickname: string, city: string, shirt: string, hoodie: string];

const ROWS: Row[] = [
  // AL East
  ["baltimore", "al-east", "Baltimore", "Orioles", "BALTIMORE", "Orange", "Orange"],
  ["boston", "al-east", "Boston", "Red Sox", "BOSTON", "Red", "Red"],
  ["new-york-navy", "al-east", "New York", "Yankees", "NEW YORK", "Navy", "Navy"],
  ["tampa-bay", "al-east", "Tampa Bay", "Rays", "TAMPA BAY", "Heather Columbia Blue", "Carolina Blue"],
  ["toronto", "al-east", "Toronto", "Blue Jays", "TORONTO", "True Royal", "Royal"],
  // AL Central
  ["chicago-black", "al-central", "Chicago", "White Sox", "CHICAGO", "Black", "Black"],
  ["cleveland", "al-central", "Cleveland", "Guardians", "CLEVELAND", "Red", "Red"],
  ["detroit", "al-central", "Detroit", "Tigers", "DETROIT", "Orange", "Orange"],
  ["kansas-city", "al-central", "Kansas City", "Royals", "KANSAS CITY", "True Royal", "Royal"],
  ["minnesota", "al-central", "Minnesota", "Twins", "MINNESOTA", "Navy", "Navy"],
  // AL West
  ["oakland", "al-west", "Oakland", "A's", "OAKLAND", "Kelly", "Irish Green"],
  ["houston", "al-west", "Houston", "Astros", "HOUSTON", "Navy", "Navy"],
  ["anaheim", "al-west", "Anaheim", "Angels", "ANAHEIM", "Red", "Red"],
  ["seattle", "al-west", "Seattle", "Mariners", "SEATTLE", "Navy", "Navy"],
  ["texas", "al-west", "Texas", "Rangers", "TEXAS", "True Royal", "Royal"],
  // NL East
  ["atlanta", "nl-east", "Atlanta", "Braves", "ATLANTA", "Navy", "Navy"],
  ["miami", "nl-east", "Miami", "Marlins", "MIAMI", "Aqua", "Carolina Blue"],
  ["new-york-blue", "nl-east", "New York", "Mets", "NEW YORK", "True Royal", "Royal"],
  ["philadelphia", "nl-east", "Philadelphia", "Phillies", "PHILADELPHIA", "Red", "Red"],
  ["washington", "nl-east", "Washington", "Nationals", "WASHINGTON", "Red", "Red"],
  // NL Central
  ["chicago-blue", "nl-central", "Chicago", "Cubs", "CHICAGO", "True Royal", "Royal"],
  ["cincinnati", "nl-central", "Cincinnati", "Reds", "CINCINNATI", "Red", "Red"],
  ["milwaukee", "nl-central", "Milwaukee", "Brewers", "MILWAUKEE", "Navy", "Navy"],
  ["pittsburgh", "nl-central", "Pittsburgh", "Pirates", "PITTSBURGH", "Gold", "Gold"],
  ["st-louis", "nl-central", "St. Louis", "Cardinals", "ST. LOUIS", "Red", "Red"],
  // NL West
  ["arizona", "nl-west", "Arizona", "Diamondbacks", "ARIZONA", "Cardinal", "Maroon"],
  ["colorado", "nl-west", "Colorado", "Rockies", "COLORADO", "Team Purple", "Purple"],
  ["los-angeles", "nl-west", "Los Angeles", "Dodgers", "LOS ANGELES", "True Royal", "Royal"],
  ["san-diego", "nl-west", "San Diego", "Padres", "SAN DIEGO", "Brown", "Dark Chocolate"],
  ["san-francisco", "nl-west", "San Francisco", "Giants", "SAN FRANCISCO", "Orange", "Orange"],

  // NBA Atlantic
  ["nba-boston", "nba-atlantic", "Boston", "Celtics", "BOSTON", "Kelly", "Irish Green"],
  ["nba-brooklyn", "nba-atlantic", "Brooklyn", "Nets", "BROOKLYN", "Black", "Black"],
  ["nba-new-york", "nba-atlantic", "New York", "Knicks", "NEW YORK", "True Royal", "Royal"],
  ["nba-philadelphia", "nba-atlantic", "Philadelphia", "76ers Sixers", "PHILADELPHIA", "True Royal", "Royal"],
  ["nba-toronto", "nba-atlantic", "Toronto", "Raptors", "TORONTO", "Red", "Red"],
  // NBA Central
  ["nba-chicago", "nba-central", "Chicago", "Bulls", "CHICAGO", "Red", "Red"],
  ["nba-cleveland", "nba-central", "Cleveland", "Cavaliers Cavs", "CLEVELAND", "Maroon", "Maroon"],
  ["nba-detroit", "nba-central", "Detroit", "Pistons", "DETROIT", "True Royal", "Royal"],
  ["nba-indiana", "nba-central", "Indiana", "Pacers", "INDIANA", "Navy", "Navy"],
  ["nba-milwaukee", "nba-central", "Milwaukee", "Bucks", "MILWAUKEE", "Forest", "Forest Green"],
  // NBA Southeast
  ["nba-atlanta", "nba-southeast", "Atlanta", "Hawks", "ATLANTA", "Red", "Red"],
  ["nba-charlotte", "nba-southeast", "Charlotte", "Hornets", "CHARLOTTE", "Aqua", "Purple"],
  ["nba-miami", "nba-southeast", "Miami", "Heat", "MIAMI", "Red", "Red"],
  ["nba-orlando", "nba-southeast", "Orlando", "Magic", "ORLANDO", "True Royal", "Royal"],
  ["nba-washington", "nba-southeast", "Washington", "Wizards", "WASHINGTON", "Red", "Red"],
  // NBA Northwest
  ["nba-denver", "nba-northwest", "Denver", "Nuggets", "DENVER", "Navy", "Navy"],
  ["nba-minnesota", "nba-northwest", "Minnesota", "Timberwolves Wolves", "MINNESOTA", "Navy", "Navy"],
  ["nba-oklahoma-city", "nba-northwest", "Oklahoma City", "Thunder", "OKLAHOMA CITY", "True Royal", "Royal"],
  ["nba-portland", "nba-northwest", "Portland", "Trail Blazers", "PORTLAND", "Red", "Red"],
  ["nba-utah", "nba-northwest", "Utah", "Jazz", "UTAH", "Team Purple", "Purple"],
  // NBA Pacific
  ["nba-san-francisco", "nba-pacific", "San Francisco", "Warriors Golden State", "SAN FRANCISCO", "True Royal", "Royal"],
  ["nba-los-angeles-red", "nba-pacific", "Los Angeles", "Clippers", "LOS ANGELES", "Red", "Red"],
  ["nba-los-angeles-gold", "nba-pacific", "Los Angeles", "Lakers", "LOS ANGELES", "Gold", "Gold"],
  ["nba-phoenix", "nba-pacific", "Phoenix", "Suns", "PHOENIX", "Orange", "Orange"],
  ["nba-sacramento", "nba-pacific", "Sacramento", "Kings", "SACRAMENTO", "Team Purple", "Purple"],
  // NBA Southwest
  ["nba-dallas", "nba-southwest", "Dallas", "Mavericks Mavs", "DALLAS", "True Royal", "Royal"],
  ["nba-houston", "nba-southwest", "Houston", "Rockets", "HOUSTON", "Red", "Red"],
  ["nba-memphis", "nba-southwest", "Memphis", "Grizzlies", "MEMPHIS", "Navy", "Navy"],
  ["nba-new-orleans", "nba-southwest", "New Orleans", "Pelicans", "NEW ORLEANS", "Navy", "Navy"],
  ["nba-san-antonio", "nba-southwest", "San Antonio", "Spurs", "SAN ANTONIO", "Black", "Black"],

  // AFC East
  ["nfl-buffalo", "afc-east", "Buffalo", "Bills", "BUFFALO", "True Royal", "Royal"],
  ["nfl-miami", "afc-east", "Miami", "Dolphins", "MIAMI", "Aqua", "Orange"],
  ["nfl-new-england", "afc-east", "New England", "Patriots Pats", "NEW ENGLAND", "Navy", "Navy"],
  ["nfl-new-york-green", "afc-east", "New York", "Jets", "NEW YORK", "Kelly", "Irish Green"],
  // AFC North
  ["nfl-baltimore", "afc-north", "Baltimore", "Ravens", "BALTIMORE", "Team Purple", "Purple"],
  ["nfl-cincinnati", "afc-north", "Cincinnati", "Bengals", "CINCINNATI", "Orange", "Orange"],
  ["nfl-cleveland", "afc-north", "Cleveland", "Browns", "CLEVELAND", "Brown", "Dark Chocolate"],
  ["nfl-pittsburgh", "afc-north", "Pittsburgh", "Steelers", "PITTSBURGH", "Gold", "Gold"],
  // AFC South
  ["nfl-houston", "afc-south", "Houston", "Texans", "HOUSTON", "Navy", "Navy"],
  ["nfl-indianapolis", "afc-south", "Indianapolis", "Colts", "INDIANAPOLIS", "True Royal", "Royal"],
  ["nfl-jacksonville", "afc-south", "Jacksonville", "Jaguars Jags", "JACKSONVILLE", "Aqua", "Gold"],
  ["nfl-tennessee", "afc-south", "Tennessee", "Titans", "TENNESSEE", "Navy", "Navy"],
  // AFC West
  ["nfl-denver", "afc-west", "Denver", "Broncos", "DENVER", "Orange", "Orange"],
  ["nfl-kansas-city", "afc-west", "Kansas City", "Chiefs", "KANSAS CITY", "Red", "Red"],
  ["nfl-las-vegas", "afc-west", "Las Vegas", "Raiders", "LAS VEGAS", "Black", "Black"],
  ["nfl-los-angeles-light-blue", "afc-west", "Los Angeles", "Chargers Bolts", "LOS ANGELES", "Heather Columbia Blue", "Carolina Blue"],
  // NFC East
  ["nfl-dallas", "nfc-east", "Dallas", "Cowboys", "DALLAS", "Navy", "Navy"],
  ["nfl-new-york-blue", "nfc-east", "New York", "Giants", "NEW YORK", "True Royal", "Royal"],
  ["nfl-philadelphia", "nfc-east", "Philadelphia", "Eagles", "PHILADELPHIA", "Forest", "Forest Green"],
  ["nfl-washington", "nfc-east", "Washington", "Commanders", "WASHINGTON", "Maroon", "Maroon"],
  // NFC North
  ["nfl-chicago", "nfc-north", "Chicago", "Bears", "CHICAGO", "Navy", "Navy"],
  ["nfl-detroit", "nfc-north", "Detroit", "Lions", "DETROIT", "Aqua", "Royal"],
  ["nfl-green-bay", "nfc-north", "Green Bay", "Packers", "GREEN BAY", "Forest", "Forest Green"],
  ["nfl-minnesota", "nfc-north", "Minnesota", "Vikings", "MINNESOTA", "Team Purple", "Purple"],
  // NFC South
  ["nfl-atlanta", "nfc-south", "Atlanta", "Falcons", "ATLANTA", "Red", "Red"],
  ["nfl-carolina", "nfc-south", "Carolina", "Panthers", "CAROLINA", "Aqua", "Carolina Blue"],
  ["nfl-new-orleans", "nfc-south", "New Orleans", "Saints", "NEW ORLEANS", "Tan", "Sand"],
  ["nfl-tampa-bay", "nfc-south", "Tampa Bay", "Buccaneers Bucs", "TAMPA BAY", "Red", "Red"],
  // NFC West
  ["nfl-arizona", "nfc-west", "Arizona", "Cardinals", "ARIZONA", "Cardinal", "Maroon"],
  ["nfl-los-angeles-blue", "nfc-west", "Los Angeles", "Rams", "LOS ANGELES", "True Royal", "Royal"],
  ["nfl-san-francisco", "nfc-west", "San Francisco", "49ers Niners", "SAN FRANCISCO", "Red", "Red"],
  ["nfl-seattle", "nfc-west", "Seattle", "Seahawks", "SEATTLE", "Navy", "Navy"],
];

export const TEAMS: Team[] = ROWS.map(([slug, division, market, nickname, city, shirt, hoodie]) => ({
  slug,
  league: DIVISIONS.find((d) => d.id === division)!.league,
  division,
  market,
  nickname,
  city,
  shirt,
  hoodie,
  nepo: NEPO.has(slug),
}));

export const FEATURED_SLUG = "oakland";

// Addresses from before teams in the same city were named by color; old links
// redirect (next.config.ts) and saved bags still resolve.
export const OLD_SLUGS: Record<string, string> = {
  "the-bronx": "new-york-navy",
  "queens": "new-york-blue",
  "chicago-south-side": "chicago-black",
  "chicago-north-side": "chicago-blue",
  "nba-the-bay": "nba-san-francisco",
  "nba-inglewood": "nba-los-angeles-red",
  "nba-los-angeles": "nba-los-angeles-gold",
  "nfl-new-york-afc": "nfl-new-york-green",
  "nfl-new-york-nfc": "nfl-new-york-blue",
  "nfl-los-angeles-afc": "nfl-los-angeles-light-blue",
  "nfl-los-angeles-nfc": "nfl-los-angeles-blue",
};

export function getTeam(slug: string): Team | undefined {
  const s = OLD_SLUGS[slug] ?? slug;
  return TEAMS.find((t) => t.slug === s);
}

export function teamsByDivision(division: Division): Team[] {
  return TEAMS.filter((t) => t.division === division).sort((a, b) => a.market.localeCompare(b.market));
}

export function divisionName(division: Division): string {
  return DIVISIONS.find((d) => d.id === division)!.label;
}

export function leagueOf(id: League) {
  return LEAGUES.find((l) => l.id === id)!;
}

// The city in normal case for sentences: "ST. LOUIS" -> "St. Louis".
export function cityName(t: Team): string {
  return t.city.replace(/[A-Z][A-Z.']*/g, (w) => w[0] + w.slice(1).toLowerCase());
}

// Card and page eyebrow: NBA division names need the league to read clearly.
export function teamLabel(t: Team): string {
  const d = divisionName(t.division);
  return t.league === "nba" ? `NBA ${d}` : d;
}
