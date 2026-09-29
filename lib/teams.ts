// Team catalog. Shirts never use team names or logos: just "SELL", a city /
// neighborhood line, and a colorway. Nicknames are only used on-site so fans
// can find their team (with a "not affiliated" disclaimer everywhere).
//
// `shirt` must be a Bella+Canvas 3001 color name exactly as Printful lists it
// (see lib/printful-variants.json). `ink` prints "SELL", `accent` prints the
// city line.

export type League = "mlb" | "nfl" | "nba" | "nhl";

export type Team = {
  slug: string;
  league: League;
  city: string; // printed on the shirt
  market: string; // how fans refer to the market on-site
  nickname: string; // for search / labeling only, never printed
  shirt: string;
  ink: string;
  accent: string;
};

export const LEAGUES: { id: League; label: string; name: string }[] = [
  { id: "mlb", label: "Baseball", name: "MLB" },
  { id: "nfl", label: "Football", name: "NFL" },
  { id: "nba", label: "Basketball", name: "NBA" },
  { id: "nhl", label: "Hockey", name: "NHL" },
];

type Row = [slug: string, market: string, nickname: string, city: string, shirt: string, ink: string, accent: string];

const W = "#FFFFFF";

const mlb: Row[] = [
  ["oakland", "Oakland", "A's", "OAKLAND", "Kelly", W, "#EFB21E"],
  ["arizona-baseball", "Arizona", "Diamondbacks", "ARIZONA", "Cardinal", "#E3D4AD", W],
  ["atlanta-baseball", "Atlanta", "Braves", "ATLANTA", "Navy", W, W],
  ["baltimore-baseball", "Baltimore", "Orioles", "BALTIMORE", "Black", "#DF4601", W],
  ["boston-baseball", "Boston", "Red Sox", "FENWAY", "Navy", W, W],
  ["chicago-north-side", "Chicago", "Cubs", "NORTH SIDE", "True Royal", W, W],
  ["chicago-south-side", "Chicago", "White Sox", "SOUTH SIDE", "Black", W, "#C4CED4"],
  ["cincinnati-baseball", "Cincinnati", "Reds", "CINCINNATI", "Red", W, W],
  ["cleveland-baseball", "Cleveland", "Guardians", "CLEVELAND", "Navy", W, W],
  ["colorado-baseball", "Colorado", "Rockies", "COLORADO", "Team Purple", "#C4CED4", W],
  ["detroit-baseball", "Detroit", "Tigers", "DETROIT", "Navy", W, "#FA4616"],
  ["houston-baseball", "Houston", "Astros", "HOUSTON", "Navy", "#EB6E1F", W],
  ["kansas-city-baseball", "Kansas City", "Royals", "KANSAS CITY", "True Royal", W, "#BD9B60"],
  ["anaheim-baseball", "Anaheim", "Angels", "ANAHEIM", "Red", W, "#C4CED4"],
  ["los-angeles-baseball", "Los Angeles", "Dodgers", "LOS ANGELES", "True Royal", W, W],
  ["miami-baseball", "Miami", "Marlins", "MIAMI", "Black", "#00A3E0", "#EF3340"],
  ["milwaukee-baseball", "Milwaukee", "Brewers", "MILWAUKEE", "Navy", "#FFC52F", W],
  ["minnesota-baseball", "Minnesota", "Twins", "MINNESOTA", "Navy", W, W],
  ["queens-baseball", "New York", "Mets", "QUEENS", "True Royal", "#FF5910", W],
  ["bronx-baseball", "New York", "Yankees", "THE BRONX", "Navy", W, "#C4CED4"],
  ["philadelphia-baseball", "Philadelphia", "Phillies", "PHILADELPHIA", "Red", W, W],
  ["pittsburgh-baseball", "Pittsburgh", "Pirates", "PITTSBURGH", "Black", "#FDB827", W],
  ["san-diego-baseball", "San Diego", "Padres", "SAN DIEGO", "Brown", "#FFC425", W],
  ["san-francisco-baseball", "San Francisco", "Giants", "SAN FRANCISCO", "Black", "#FD5A1E", "#EFE6D2"],
  ["seattle-baseball", "Seattle", "Mariners", "SEATTLE", "Navy", W, "#16A5A5"],
  ["st-louis-baseball", "St. Louis", "Cardinals", "ST. LOUIS", "Red", W, "#FEDB00"],
  ["tampa-bay-baseball", "Tampa Bay", "Rays", "TAMPA BAY", "Navy", "#8FBCE6", "#F5D130"],
  ["texas-baseball", "Texas", "Rangers", "TEXAS", "True Royal", W, W],
  ["toronto-baseball", "Toronto", "Blue Jays", "TORONTO", "True Royal", W, W],
  ["washington-baseball", "Washington", "Nationals", "WASHINGTON", "Red", W, W],
];

const nfl: Row[] = [
  ["arizona-football", "Arizona", "Cardinals", "ARIZONA", "Cardinal", W, "#FFB612"],
  ["atlanta-football", "Atlanta", "Falcons", "ATLANTA", "Black", "#E3203A", W],
  ["baltimore-football", "Baltimore", "Ravens", "BALTIMORE", "Team Purple", W, "#C9A227"],
  ["buffalo-football", "Buffalo", "Bills", "BUFFALO", "True Royal", W, W],
  ["carolina-football", "Carolina", "Panthers", "CAROLINA", "Black", "#0085CA", "#BFC0BF"],
  ["chicago-football", "Chicago", "Bears", "CHICAGO", "Navy", "#E0561B", W],
  ["cincinnati-football", "Cincinnati", "Bengals", "CINCINNATI", "Black", "#FB4F14", W],
  ["cleveland-football", "Cleveland", "Browns", "CLEVELAND", "Brown", "#FF3C00", W],
  ["dallas-football", "Dallas", "Cowboys", "DALLAS", "Navy", W, "#A5ACAF"],
  ["denver-football", "Denver", "Broncos", "DENVER", "Orange", "#002244", W],
  ["detroit-football", "Detroit", "Lions", "DETROIT", "Aqua", W, "#D0D5D8"],
  ["green-bay-football", "Green Bay", "Packers", "GREEN BAY", "Forest", "#FFB612", W],
  ["houston-football", "Houston", "Texans", "HOUSTON", "Navy", W, W],
  ["indianapolis-football", "Indianapolis", "Colts", "INDIANAPOLIS", "True Royal", W, "#A2AAAD"],
  ["jacksonville-football", "Jacksonville", "Jaguars", "JACKSONVILLE", "Black", "#00A0B0", "#D7A22A"],
  ["kansas-city-football", "Kansas City", "Chiefs", "KANSAS CITY", "Red", "#FFB81C", W],
  ["las-vegas-football", "Las Vegas", "Raiders", "LAS VEGAS", "Black", "#A5ACAF", W],
  ["los-angeles-football-powder", "Los Angeles", "Chargers", "LOS ANGELES", "Heather Columbia Blue", W, "#FFC20E"],
  ["los-angeles-football", "Los Angeles", "Rams", "LOS ANGELES", "True Royal", "#FFD100", W],
  ["miami-football", "Miami", "Dolphins", "MIAMI", "Aqua", "#FC4C02", W],
  ["minnesota-football", "Minnesota", "Vikings", "MINNESOTA", "Team Purple", "#FFC62F", W],
  ["new-england-football", "New England", "Patriots", "NEW ENGLAND", "Navy", W, W],
  ["new-orleans-football", "New Orleans", "Saints", "NEW ORLEANS", "Black", "#D3BC8D", W],
  ["new-york-football-blue", "New York", "Giants", "EAST RUTHERFORD", "True Royal", W, W],
  ["new-york-football-green", "New York", "Jets", "NEW YORK", "Heather Grass Green", W, W],
  ["philadelphia-football", "Philadelphia", "Eagles", "PHILADELPHIA", "Forest", "#C4CED4", W],
  ["pittsburgh-football", "Pittsburgh", "Steelers", "PITTSBURGH", "Heather Yellow Gold", "#101820", "#101820"],
  ["san-francisco-football", "San Francisco", "49ers", "SAN FRANCISCO", "Red", "#D4B97A", W],
  ["seattle-football", "Seattle", "Seahawks", "SEATTLE", "Navy", "#69BE28", "#A5ACAF"],
  ["tampa-bay-football", "Tampa Bay", "Buccaneers", "TAMPA BAY", "Asphalt", "#E4202A", W],
  ["tennessee-football", "Tennessee", "Titans", "TENNESSEE", "Navy", "#4B92DB", W],
  ["washington-football", "Washington", "Commanders", "WASHINGTON", "Maroon", "#FFB612", W],
];

const nba: Row[] = [
  ["atlanta-basketball", "Atlanta", "Hawks", "ATLANTA", "Red", W, "#C1D32F"],
  ["boston-basketball", "Boston", "Celtics", "BOSTON", "Kelly", W, "#C9A66B"],
  ["brooklyn-basketball", "Brooklyn", "Nets", "BROOKLYN", "Black", W, W],
  ["charlotte-basketball", "Charlotte", "Hornets", "CHARLOTTE", "Team Purple", "#00A3B4", W],
  ["chicago-basketball", "Chicago", "Bulls", "CHICAGO", "Red", W, W],
  ["cleveland-basketball", "Cleveland", "Cavaliers", "CLEVELAND", "Maroon", "#FDBB30", W],
  ["dallas-basketball", "Dallas", "Mavericks", "DALLAS", "True Royal", W, "#B8C4CA"],
  ["denver-basketball", "Denver", "Nuggets", "DENVER", "Navy", "#FEC524", W],
  ["detroit-basketball", "Detroit", "Pistons", "DETROIT", "True Royal", W, W],
  ["golden-state-basketball", "San Francisco", "Warriors", "THE BAY", "True Royal", "#FFC72C", W],
  ["houston-basketball", "Houston", "Rockets", "HOUSTON", "Red", W, "#C4CED4"],
  ["indiana-basketball", "Indiana", "Pacers", "INDIANA", "Navy", "#FDBB30", W],
  ["los-angeles-basketball-clippers", "Los Angeles", "Clippers", "INGLEWOOD", "Navy", W, W],
  ["los-angeles-basketball", "Los Angeles", "Lakers", "LOS ANGELES", "Team Purple", "#FDB927", W],
  ["memphis-basketball", "Memphis", "Grizzlies", "MEMPHIS", "Navy", "#8DA9D8", "#FFBB22"],
  ["miami-basketball", "Miami", "Heat", "MIAMI", "Black", "#E0183F", "#F9A01B"],
  ["milwaukee-basketball", "Milwaukee", "Bucks", "MILWAUKEE", "Forest", "#EEE1C6", "#3C9BE0"],
  ["minnesota-basketball", "Minnesota", "Timberwolves", "MINNEAPOLIS", "Navy", W, "#78BE20"],
  ["new-orleans-basketball", "New Orleans", "Pelicans", "NEW ORLEANS", "Navy", "#C8A96B", W],
  ["new-york-basketball", "New York", "Knicks", "NEW YORK", "True Royal", "#F58426", W],
  ["oklahoma-city-basketball", "Oklahoma City", "Thunder", "OKLAHOMA CITY", "Aqua", W, "#FF6A3D"],
  ["orlando-basketball", "Orlando", "Magic", "ORLANDO", "Black", "#2E9BE6", "#C4CED4"],
  ["philadelphia-basketball", "Philadelphia", "76ers", "PHILADELPHIA", "True Royal", W, W],
  ["phoenix-basketball", "Phoenix", "Suns", "PHOENIX", "Team Purple", "#E56020", W],
  ["portland-basketball", "Portland", "Trail Blazers", "PORTLAND", "Black", "#E03A3E", W],
  ["sacramento-basketball", "Sacramento", "Kings", "SACRAMENTO", "Team Purple", "#C4CED4", W],
  ["san-antonio-basketball", "San Antonio", "Spurs", "SAN ANTONIO", "Black", "#C4CED4", W],
  ["toronto-basketball", "Toronto", "Raptors", "TORONTO", "Black", "#E0183F", "#C4CED4"],
  ["utah-basketball", "Utah", "Jazz", "UTAH", "Black", "#FFE11F", W],
  ["washington-basketball", "Washington", "Wizards", "D.C.", "Navy", W, W],
];

const nhl: Row[] = [
  ["anaheim-hockey", "Anaheim", "Ducks", "ANAHEIM", "Black", "#F47A38", "#B9975B"],
  ["boston-hockey", "Boston", "Bruins", "BOSTON", "Black", "#FFB81C", W],
  ["buffalo-hockey", "Buffalo", "Sabres", "BUFFALO", "True Royal", "#FCB514", W],
  ["calgary-hockey", "Calgary", "Flames", "CALGARY", "Red", "#F1BE48", W],
  ["carolina-hockey", "Carolina", "Hurricanes", "RALEIGH", "Red", W, W],
  ["chicago-hockey", "Chicago", "Blackhawks", "CHICAGO", "Black", "#E0183F", W],
  ["colorado-hockey", "Colorado", "Avalanche", "COLORADO", "Maroon", W, "#6CACE4"],
  ["columbus-hockey", "Columbus", "Blue Jackets", "COLUMBUS", "Navy", W, W],
  ["dallas-hockey", "Dallas", "Stars", "DALLAS", "Forest", W, "#A2AAAD"],
  ["detroit-hockey", "Detroit", "Red Wings", "DETROIT", "Red", W, W],
  ["edmonton-hockey", "Edmonton", "Oilers", "EDMONTON", "Navy", "#FF4C00", W],
  ["florida-hockey", "Florida", "Panthers", "SUNRISE", "Red", "#D4B97A", W],
  ["los-angeles-hockey", "Los Angeles", "Kings", "LOS ANGELES", "Black", "#A2AAAD", W],
  ["minnesota-hockey", "Minnesota", "Wild", "ST. PAUL", "Forest", "#DDCBA4", "#E0283E"],
  ["montreal-hockey", "Montréal", "Canadiens", "MONTRÉAL", "Red", W, W],
  ["nashville-hockey", "Nashville", "Predators", "NASHVILLE", "Navy", "#FFB81C", W],
  ["new-jersey-hockey", "New Jersey", "Devils", "NEWARK", "Red", W, W],
  ["new-york-hockey-island", "New York", "Islanders", "LONG ISLAND", "True Royal", "#F47D30", W],
  ["new-york-hockey", "New York", "Rangers", "MANHATTAN", "True Royal", W, W],
  ["ottawa-hockey", "Ottawa", "Senators", "OTTAWA", "Black", "#E0283E", "#C2912C"],
  ["philadelphia-hockey", "Philadelphia", "Flyers", "PHILADELPHIA", "Orange", "#101820", W],
  ["pittsburgh-hockey", "Pittsburgh", "Penguins", "PITTSBURGH", "Black", W, "#FCB514"],
  ["san-jose-hockey", "San Jose", "Sharks", "SAN JOSE", "Heather Deep Teal", W, "#EA7200"],
  ["seattle-hockey", "Seattle", "Kraken", "SEATTLE", "Navy", "#99D9D9", W],
  ["st-louis-hockey", "St. Louis", "Blues", "ST. LOUIS", "True Royal", W, "#FCB514"],
  ["tampa-bay-hockey", "Tampa Bay", "Lightning", "TAMPA BAY", "True Royal", W, W],
  ["toronto-hockey", "Toronto", "Maple Leafs", "TORONTO", "Navy", W, W],
  ["utah-hockey", "Utah", "Mammoth", "SALT LAKE CITY", "Black", "#69B3E7", W],
  ["vancouver-hockey", "Vancouver", "Canucks", "VANCOUVER", "Navy", W, "#00A651"],
  ["vegas-hockey", "Las Vegas", "Golden Knights", "LAS VEGAS", "Black", "#C8A96B", "#E0283E"],
  ["washington-hockey", "Washington", "Capitals", "WASHINGTON", "Navy", "#E0283E", W],
  ["winnipeg-hockey", "Winnipeg", "Jets", "WINNIPEG", "Navy", W, "#A2AAAD"],
];

const build = (league: League, rows: Row[]): Team[] =>
  rows.map(([slug, market, nickname, city, shirt, ink, accent]) => ({
    slug,
    league,
    market,
    nickname,
    city,
    shirt,
    ink,
    accent,
  }));

export const TEAMS: Team[] = [
  ...build("mlb", mlb),
  ...build("nfl", nfl),
  ...build("nba", nba),
  ...build("nhl", nhl),
];

export const FEATURED_SLUG = "oakland";

export function getTeam(slug: string): Team | undefined {
  return TEAMS.find((t) => t.slug === slug);
}

export function teamsByLeague(league: League): Team[] {
  return TEAMS.filter((t) => t.league === league).sort((a, b) =>
    a.market === b.market ? a.nickname.localeCompare(b.nickname) : a.market.localeCompare(b.market),
  );
}

export function leagueName(league: League): string {
  return LEAGUES.find((l) => l.id === league)!.name;
}

// "Oakland A's fans" style label, for on-site copy only.
export function fanLabel(t: Team): string {
  return `${t.market} ${t.nickname}`;
}
