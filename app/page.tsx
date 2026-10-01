import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import ProductPhoto from "@/components/ProductPhoto";
import { colorHex, type Style } from "@/lib/products";
import { DIVISIONS, FEATURED_SLUG, getTeam, LEAGUES, TEAMS, teamsByDivision } from "@/lib/teams";

// Rows of three, so keep these lists at multiples of 3.
const PICKS: [string, Style][] = [
  ["oakland", "tee"],
  ["the-bronx", "pinstripe"],
  ["nba-boston", "tee"],
  ["nfl-green-bay", "tee"],
  ["pittsburgh", "tee"],
  ["nba-los-angeles", "tee"],
  ["nfl-cincinnati", "tee"],
  ["miami", "tee"],
  ["cincinnati", "nepo-sign"],
];

const HOODIE_PICKS = ["oakland", "nba-chicago", "nfl-green-bay", "the-bronx", "nba-los-angeles", "nfl-baltimore"];

export default function Home() {
  const hero = getTeam(FEATURED_SLUG)!;
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">A fan protest, now in every ballpark, arena and stadium</span>
          <h1 className="display">Sell.</h1>
          <p>
            In 2023, 27,759 fans packed the Oakland Coliseum in green shirts carrying one word for their owner. The shirt
            ended up in the Hall of Fame. Your team&rsquo;s owner should get the message too.
          </p>
          <div className="hero-actions">
            <Link href="/shop" className="btn">
              Find your team
            </Link>
            <Link href="/story" className="btn ghost">
              The Oakland story
            </Link>
          </div>
        </div>
        <div className="hero-art">
          <div className="hero-photo">
            <ProductPhoto team={hero} style="tee" sizes="(max-width: 860px) 100vw, 50vw" eager />
          </div>
          <span className="hero-stat">The original · Oakland, June 13, 2023</span>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <span className="eyebrow">Fan favorites</span>
              <h2 className="display">Wear it to the game</h2>
            </div>
            <Link href="/shop" className="btn ghost">
              Shop every team
            </Link>
          </div>
          <div className="grid three">
            {PICKS.map(([s, style]) => (
              <ProductCard key={`${s}-${style}`} team={getTeam(s)!} style={style} />
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="section-head">
            <div>
              <span className="eyebrow">For the cold ones</span>
              <h2 className="display">Hoodies</h2>
            </div>
            <Link href="/shop?style=hoodie" className="btn ghost">
              Shop hoodies
            </Link>
          </div>
          <div className="grid three">
            {HOODIE_PICKS.map((s) => (
              <ProductCard key={s} team={getTeam(s)!} style="hoodie" />
            ))}
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap band-inner">
          <div>
            <span className="eyebrow">Where it started</span>
            <h2 className="display">The reverse boycott</h2>
            <p>
              A&rsquo;s fans didn&rsquo;t stay home. They did the opposite: they filled the stands on a Tuesday night,
              handed out thousands of $5 green &ldquo;SELL&rdquo; shirts, and chanted it in unison, to show the team
              could thrive in Oakland if its owner sold to someone who wanted to stay.
            </p>
            <p>That shirt became the uniform of a movement. We made one for every MLB, NBA and NFL fan base.</p>
            <Link href="/story" className="btn" style={{ marginTop: 12 }}>
              Read the story
            </Link>
          </div>
          <div className="big-stats">
            <div>
              <strong>27,759</strong>
              <span>Fans at the reverse boycott</span>
            </div>
            <div>
              <strong>~7,000</strong>
              <span>SELL shirts handed out</span>
            </div>
            <div>
              <strong>1</strong>
              <span>Shirt now in Cooperstown</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <span className="eyebrow">{TEAMS.length} teams</span>
              <h2 className="display">Find your team</h2>
            </div>
          </div>
          {LEAGUES.map((l) => {
            const divisions = DIVISIONS.filter((d) => d.league === l.id);
            return (
              <div key={l.id} className="league-block">
                <h3 className="league-name">
                  <Link href={`/shop?league=${l.id}`}>{l.sport}</Link>
                </h3>
                <div className={`divisions${divisions.length === 8 ? " eight" : ""}`}>
                  {divisions.map((d) => (
                    <div key={d.id}>
                      <h3>
                        <Link href={`/shop?division=${d.id}`}>{d.label}</Link>
                      </h3>
                      <ul>
                        {teamsByDivision(d.id).map((t) => (
                          <li key={t.slug}>
                            <Link href={`/shirt/${t.slug}`}>
                              <span className="dot" style={{ background: colorHex(t, "tee") }} />
                              {t.city}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="wrap" style={{ paddingBottom: 80 }}>
        <div className="steps">
          <div className="step">
            <b>01</b>
            <h3>Pick your city</h3>
            <p>Every shirt is the same message on your club&rsquo;s color. No logos, no team names &mdash; just SELL.</p>
          </div>
          <div className="step">
            <b>02</b>
            <h3>Printed to order</h3>
            <p>Each tee is printed when you order it and shipped straight to you, usually within about a week.</p>
          </div>
          <div className="step">
            <b>03</b>
            <h3>Show up in it</h3>
            <p>Wear it to the game. One shirt is a complaint. A section full of them is a headline.</p>
          </div>
        </div>
      </section>
    </>
  );
}
