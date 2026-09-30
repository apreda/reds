// Team catalog. Every shirt is the same white "SELL" on the team's primary
// color, like the Oakland originals; nothing else is printed. `city` names the
// listing ("SELL Tee — NORTH SIDE") and the nickname is a hidden search keyword
// so fans can type their team's name in the shop search. Neither is printed.
//
// `shirt` must be a Bella+Canvas 3001 color name exactly as Printful lists it
// (see lib/printful-variants.json).

export type Division = "al-east" | "al-central" | "al-west" | "nl-east" | "nl-central" | "nl-west";

export type Team = {
  slug: string;
  division: Division;
  city: string; // names the listing; never printed
  market: string; // how fans refer to the market on-site
  nickname: string; // search keyword only, never displayed or printed
  shirt: string;
};

export const DIVISIONS: { id: Division; label: string }[] = [
  { id: "al-east", label: "AL East" },
  { id: "al-central", label: "AL Central" },
  { id: "al-west", label: "AL West" },
  { id: "nl-east", label: "NL East" },
  { id: "nl-central", label: "NL Central" },
  { id: "nl-west", label: "NL West" },
];

type Row = [slug: string, division: Division, market: string, nickname: string, city: string, shirt: string];

const ROWS: Row[] = [
  // AL East
  ["baltimore", "al-east", "Baltimore", "Orioles", "BALTIMORE", "Orange"],
  ["boston", "al-east", "Boston", "Red Sox", "FENWAY", "Red"],
  ["the-bronx", "al-east", "New York", "Yankees", "THE BRONX", "Navy"],
  ["tampa-bay", "al-east", "Tampa Bay", "Rays", "TAMPA BAY", "Navy"],
  ["toronto", "al-east", "Toronto", "Blue Jays", "TORONTO", "True Royal"],
  // AL Central
  ["chicago-south-side", "al-central", "Chicago", "White Sox", "SOUTH SIDE", "Black"],
  ["cleveland", "al-central", "Cleveland", "Guardians", "CLEVELAND", "Navy"],
  ["detroit", "al-central", "Detroit", "Tigers", "DETROIT", "Navy"],
  ["kansas-city", "al-central", "Kansas City", "Royals", "KANSAS CITY", "True Royal"],
  ["minnesota", "al-central", "Minnesota", "Twins", "MINNESOTA", "Navy"],
  // AL West
  ["oakland", "al-west", "Oakland", "A's", "OAKLAND", "Kelly"],
  ["houston", "al-west", "Houston", "Astros", "HOUSTON", "Navy"],
  ["anaheim", "al-west", "Anaheim", "Angels", "ANAHEIM", "Red"],
  ["seattle", "al-west", "Seattle", "Mariners", "SEATTLE", "Navy"],
  ["texas", "al-west", "Texas", "Rangers", "TEXAS", "True Royal"],
  // NL East
  ["atlanta", "nl-east", "Atlanta", "Braves", "ATLANTA", "Navy"],
  ["miami", "nl-east", "Miami", "Marlins", "MIAMI", "Black"],
  ["queens", "nl-east", "New York", "Mets", "QUEENS", "True Royal"],
  ["philadelphia", "nl-east", "Philadelphia", "Phillies", "PHILADELPHIA", "Red"],
  ["washington", "nl-east", "Washington", "Nationals", "WASHINGTON", "Red"],
  // NL Central
  ["chicago-north-side", "nl-central", "Chicago", "Cubs", "NORTH SIDE", "True Royal"],
  ["cincinnati", "nl-central", "Cincinnati", "Reds", "CINCINNATI", "Red"],
  ["milwaukee", "nl-central", "Milwaukee", "Brewers", "MILWAUKEE", "Navy"],
  ["pittsburgh", "nl-central", "Pittsburgh", "Pirates", "PITTSBURGH", "Black"],
  ["st-louis", "nl-central", "St. Louis", "Cardinals", "ST. LOUIS", "Red"],
  // NL West
  ["arizona", "nl-west", "Arizona", "Diamondbacks", "ARIZONA", "Cardinal"],
  ["colorado", "nl-west", "Colorado", "Rockies", "COLORADO", "Team Purple"],
  ["los-angeles", "nl-west", "Los Angeles", "Dodgers", "LOS ANGELES", "True Royal"],
  ["san-diego", "nl-west", "San Diego", "Padres", "SAN DIEGO", "Brown"],
  ["san-francisco", "nl-west", "San Francisco", "Giants", "SAN FRANCISCO", "Orange"],
];

export const TEAMS: Team[] = ROWS.map(([slug, division, market, nickname, city, shirt]) => ({
  slug,
  division,
  market,
  nickname,
  city,
  shirt,
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
