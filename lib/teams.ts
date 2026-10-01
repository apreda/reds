// Team catalog. Every shirt is the same white "SELL" on the team's main color,
// like the Oakland originals (black only for the White Sox, who really are
// black and white); nothing else is printed. `city` names the
// listing ("SELL Tee — NORTH SIDE") and the nickname is a hidden search keyword
// so fans can type their team's name in the shop search. Neither is printed.
//
// `shirt` (Bella+Canvas 3001 tee) and `hoodie` (Gildan 18500) must be color
// names exactly as Printful lists them (see lib/printful-variants.json).

export type Division = "al-east" | "al-central" | "al-west" | "nl-east" | "nl-central" | "nl-west";

export type Team = {
  slug: string;
  division: Division;
  city: string; // names the listing; never printed
  market: string; // how fans refer to the market on-site
  nickname: string; // search keyword only, never displayed or printed
  shirt: string;
  hoodie: string;
  pinstripe: boolean; // also sold as a white tee with navy pinstripes
};

// Yankees navy, for the pinstripe edition's stripes and lettering.
export const PINSTRIPE_NAVY = "#0C2340";
const PINSTRIPE = new Set(["the-bronx"]);

export const DIVISIONS: { id: Division; label: string }[] = [
  { id: "al-east", label: "AL East" },
  { id: "al-central", label: "AL Central" },
  { id: "al-west", label: "AL West" },
  { id: "nl-east", label: "NL East" },
  { id: "nl-central", label: "NL Central" },
  { id: "nl-west", label: "NL West" },
];

type Row = [slug: string, division: Division, market: string, nickname: string, city: string, shirt: string, hoodie: string];

const ROWS: Row[] = [
  // AL East
  ["baltimore", "al-east", "Baltimore", "Orioles", "BALTIMORE", "Orange", "Orange"],
  ["boston", "al-east", "Boston", "Red Sox", "FENWAY", "Red", "Red"],
  ["the-bronx", "al-east", "New York", "Yankees", "THE BRONX", "Navy", "Navy"],
  ["tampa-bay", "al-east", "Tampa Bay", "Rays", "TAMPA BAY", "Navy", "Navy"],
  ["toronto", "al-east", "Toronto", "Blue Jays", "TORONTO", "True Royal", "Royal"],
  // AL Central
  ["chicago-south-side", "al-central", "Chicago", "White Sox", "SOUTH SIDE", "Black", "Black"],
  ["cleveland", "al-central", "Cleveland", "Guardians", "CLEVELAND", "Navy", "Navy"],
  ["detroit", "al-central", "Detroit", "Tigers", "DETROIT", "Navy", "Navy"],
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
  ["queens", "nl-east", "New York", "Mets", "QUEENS", "True Royal", "Royal"],
  ["philadelphia", "nl-east", "Philadelphia", "Phillies", "PHILADELPHIA", "Red", "Red"],
  ["washington", "nl-east", "Washington", "Nationals", "WASHINGTON", "Red", "Red"],
  // NL Central
  ["chicago-north-side", "nl-central", "Chicago", "Cubs", "NORTH SIDE", "True Royal", "Royal"],
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
];

export const TEAMS: Team[] = ROWS.map(([slug, division, market, nickname, city, shirt, hoodie]) => ({
  slug,
  division,
  market,
  nickname,
  city,
  shirt,
  hoodie,
  pinstripe: PINSTRIPE.has(slug),
}));

export const FEATURED_SLUG = "oakland";

export function getTeam(slug: string): Team | undefined {
  return TEAMS.find((t) => t.slug === slug);
}

export function teamsByDivision(division: Division): Team[] {
  return TEAMS.filter((t) => t.division === division).sort((a, b) => a.market.localeCompare(b.market));
}

export function divisionName(division: Division): string {
  return DIVISIONS.find((d) => d.id === division)!.label;
}
