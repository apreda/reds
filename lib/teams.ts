// Team catalog. Shirts and listings never show team names or logos: just
// "SELL", a city / neighborhood line, and a colorway. The nickname is a hidden
// search keyword so fans can type their team's name in the shop search.
//
// `shirt` must be a Bella+Canvas 3001 color name exactly as Printful lists it
// (see lib/printful-variants.json). `ink` prints "SELL", `accent` prints the
// city line.

export type Division = "al-east" | "al-central" | "al-west" | "nl-east" | "nl-central" | "nl-west";

export type Team = {
  slug: string;
  division: Division;
  city: string; // printed on the shirt
  market: string; // how fans refer to the market on-site
  nickname: string; // search keyword only, never displayed or printed
  shirt: string;
  ink: string;
  accent: string;
};

export const DIVISIONS: { id: Division; label: string }[] = [
  { id: "al-east", label: "AL East" },
  { id: "al-central", label: "AL Central" },
  { id: "al-west", label: "AL West" },
  { id: "nl-east", label: "NL East" },
  { id: "nl-central", label: "NL Central" },
  { id: "nl-west", label: "NL West" },
];

type Row = [slug: string, division: Division, market: string, nickname: string, city: string, shirt: string, ink: string, accent: string];

const W = "#FFFFFF";

const ROWS: Row[] = [
  // AL East
  ["baltimore", "al-east", "Baltimore", "Orioles", "BALTIMORE", "Black", "#DF4601", W],
  ["boston", "al-east", "Boston", "Red Sox", "FENWAY", "Navy", W, W],
  ["the-bronx", "al-east", "New York", "Yankees", "THE BRONX", "Navy", W, "#C4CED4"],
  ["tampa-bay", "al-east", "Tampa Bay", "Rays", "TAMPA BAY", "Navy", "#8FBCE6", "#F5D130"],
  ["toronto", "al-east", "Toronto", "Blue Jays", "TORONTO", "Heather Columbia Blue", W, "#134A8E"],
  // AL Central
  ["chicago-south-side", "al-central", "Chicago", "White Sox", "SOUTH SIDE", "Black", W, "#C4CED4"],
  ["cleveland", "al-central", "Cleveland", "Guardians", "CLEVELAND", "Navy", W, W],
  ["detroit", "al-central", "Detroit", "Tigers", "DETROIT", "Navy", W, "#FA4616"],
  ["kansas-city", "al-central", "Kansas City", "Royals", "KANSAS CITY", "True Royal", W, "#BD9B60"],
  ["minnesota", "al-central", "Minnesota", "Twins", "MINNESOTA", "Navy", W, W],
  // AL West
  ["oakland", "al-west", "Oakland", "A's", "OAKLAND", "Kelly", W, "#EFB21E"],
  ["houston", "al-west", "Houston", "Astros", "HOUSTON", "Navy", "#EB6E1F", W],
  ["anaheim", "al-west", "Anaheim", "Angels", "ANAHEIM", "Red", W, "#C4CED4"],
  ["seattle", "al-west", "Seattle", "Mariners", "SEATTLE", "Navy", W, "#16A5A5"],
  ["texas", "al-west", "Texas", "Rangers", "TEXAS", "Navy", "#E0283E", W],
  // NL East
  ["atlanta", "nl-east", "Atlanta", "Braves", "ATLANTA", "Navy", W, W],
  ["miami", "nl-east", "Miami", "Marlins", "MIAMI", "Black", "#00A3E0", "#EF3340"],
  ["queens", "nl-east", "New York", "Mets", "QUEENS", "True Royal", "#FF5910", W],
  ["philadelphia", "nl-east", "Philadelphia", "Phillies", "PHILADELPHIA", "Red", W, W],
  ["washington", "nl-east", "Washington", "Nationals", "WASHINGTON", "Red", W, W],
  // NL Central
  ["chicago-north-side", "nl-central", "Chicago", "Cubs", "NORTH SIDE", "True Royal", W, W],
  ["cincinnati", "nl-central", "Cincinnati", "Reds", "CINCINNATI", "Red", W, W],
  ["milwaukee", "nl-central", "Milwaukee", "Brewers", "MILWAUKEE", "Navy", "#FFC52F", W],
  ["pittsburgh", "nl-central", "Pittsburgh", "Pirates", "PITTSBURGH", "Black", "#FDB827", W],
  ["st-louis", "nl-central", "St. Louis", "Cardinals", "ST. LOUIS", "Red", W, "#FEDB00"],
  // NL West
  ["arizona", "nl-west", "Arizona", "Diamondbacks", "ARIZONA", "Cardinal", "#E3D4AD", W],
  ["colorado", "nl-west", "Colorado", "Rockies", "COLORADO", "Team Purple", "#C4CED4", W],
  ["los-angeles", "nl-west", "Los Angeles", "Dodgers", "LOS ANGELES", "True Royal", W, W],
  ["san-diego", "nl-west", "San Diego", "Padres", "SAN DIEGO", "Brown", "#FFC425", W],
  ["san-francisco", "nl-west", "San Francisco", "Giants", "SAN FRANCISCO", "Black", "#FD5A1E", "#EFE6D2"],
];

export const TEAMS: Team[] = ROWS.map(([slug, division, market, nickname, city, shirt, ink, accent]) => ({
  slug,
  division,
  market,
  nickname,
  city,
  shirt,
  ink,
  accent,
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
