import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import Tee from "@/components/Tee";
import { FEATURED_SLUG, getTeam, LEAGUES, teamsByLeague } from "@/lib/teams";

const PICKS = [
  "oakland",
  "chicago-south-side",
  "washington-football",
  "new-york-basketball",
  "san-diego-baseball",
  "ottawa-hockey",
  "las-vegas-football",
  "pittsburgh-baseball",
];

const SPORT_COVERS = { mlb: "bronx-baseball", nfl: "green-bay-football", nba: "los-angeles-basketball", nhl: "chicago-hockey" };

export default function Home() {
  const hero = getTeam(FEATURED_SLUG)!;
  const picks = PICKS.map((s) => getTeam(s)!).filter(Boolean);
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">A fan protest, now in every city</span>
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
          <Tee team={hero} />
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
              Shop all 124
            </Link>
          </div>
          <div className="grid">
            {picks.map((t) => (
              <ProductCard key={t.slug} team={t} />
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
            <p>That shirt became the uniform of a movement. We made one for every fan base.</p>
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
              <span className="eyebrow">Every league</span>
              <h2 className="display">Pick your sport</h2>
            </div>
          </div>
          <div className="grid">
            {LEAGUES.map((l) => {
              const sample = getTeam(SPORT_COVERS[l.id])!;
              return (
                <Link key={l.id} href={`/shop?league=${l.id}`} className="card">
                  <div className="card-img">
                    <Tee team={sample} />
                  </div>
                  <div className="card-body">
                    <span className="card-league">{l.name}</span>
                    <span className="card-title">{l.label}</span>
                    <span className="card-sub">{teamsByLeague(l.id).length} cities</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="wrap" style={{ paddingBottom: 80 }}>
        <div className="steps">
          <div className="step">
            <b>01</b>
            <h3>Pick your city</h3>
            <p>Every shirt is the same message in your team&rsquo;s colors. No logos, no team names &mdash; just SELL.</p>
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
