import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import Tee from "@/components/Tee";
import { shirtHex } from "@/lib/products";
import { DIVISIONS, FEATURED_SLUG, getTeam, teamsByDivision } from "@/lib/teams";

const PICKS = [
  "oakland",
  "chicago-south-side",
  "pittsburgh",
  "colorado",
  "tampa-bay",
  "washington",
  "miami",
  "cincinnati",
];

export default function Home() {
  const hero = getTeam(FEATURED_SLUG)!;
  const picks = PICKS.map((s) => getTeam(s)!).filter(Boolean);
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">A fan protest, now in every ballpark</span>
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
            <Tee team={hero} sizes="(max-width: 860px) 100vw, 50vw" eager />
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
              Shop all 30
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
            <p>That shirt became the uniform of a movement. We made one for all 30 MLB fan bases.</p>
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
              <span className="eyebrow">All 30 ballparks</span>
              <h2 className="display">Find your division</h2>
            </div>
          </div>
          <div className="divisions">
            {DIVISIONS.map((d) => (
              <div key={d.id}>
                <h3>
                  <Link href={`/shop?division=${d.id}`}>{d.label}</Link>
                </h3>
                <ul>
                  {teamsByDivision(d.id).map((t) => (
                    <li key={t.slug}>
                      <Link href={`/shirt/${t.slug}`}>
                        <span className="dot" style={{ background: shirtHex(t) }} />
                        {t.city}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap" style={{ paddingBottom: 80 }}>
        <div className="steps">
          <div className="step">
            <b>01</b>
            <h3>Pick your city</h3>
            <p>Every shirt is the same message in your club&rsquo;s colors. No logos, no team names &mdash; just SELL.</p>
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
