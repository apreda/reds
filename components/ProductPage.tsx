import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BuyBox from "@/components/BuyBox";
import ProductCard from "@/components/ProductCard";
import ProductPhoto from "@/components/ProductPhoto";
import {
  colorHex,
  colorLabel,
  garment,
  productName,
  productPath,
  sizesFor,
  STYLE,
  stylesFor,
  type Style,
} from "@/lib/products";
import { ordersOpen } from "@/lib/site";
import { cityName, divisionName, getTeam, leagueOf, teamLabel, TEAMS, type Team } from "@/lib/teams";

const TEE = "Bella+Canvas 3001 unisex tee, 100% combed ring-spun cotton";

// Per style: what's printed (details list), the print's color name, and the
// "Why SELL" line.
const DETAILS: Record<Style, string[]> = {
  tee: [TEE, "Soft, lightweight 4.2 oz jersey; retail fit", "Direct-to-garment print, front only"],
  city: [TEE, "SELL with the team's city underneath", "Direct-to-garment print, front only"],
  hoodie: [
    "Gildan 18500 unisex heavy blend hoodie, 50% cotton / 50% polyester",
    "Midweight 8 oz fleece, front pouch pocket, double-lined hood with drawcord",
    "Direct-to-garment print, front only",
  ],
  nepo: [TEE, "NEPO PHIL over SELL in white on red", "Direct-to-garment print, front only"],
  "nepo-jersey": [TEE, "SELL on the chest; NEPO PHIL and 00 across the back", "Direct-to-garment print, front and back"],
  "nepo-sign": [TEE, "NEPO PHIL: SELL! in red marker lettering on natural", "Direct-to-garment print, front only"],
};
const PRINT_COLOR: Record<Style, string> = {
  tee: "white", city: "white", hoodie: "white", nepo: "white", "nepo-jersey": "white", "nepo-sign": "red",
};
const WHY: Partial<Record<Style, string>> = {
  city: "One word in white on your team\u2019s color, with your city underneath.",
  nepo: "His name, then the one word.",
  "nepo-jersey": "His name across the back, like a jersey.",
  "nepo-sign": "Marker lettering, like the sign you'd hold up behind home plate.",
};

const SHARE_TEXT: Partial<Record<Style, (t: Team) => string>> = {
  city: (t) => `A ${colorLabel(t, "city")} shirt with SELL and ${cityName(t)} across the chest. Wear it to the game until they sell the team. Free shipping.`,
  nepo: () => "A red shirt that says NEPO PHIL over SELL. Wear it to the game. Free shipping.",
  "nepo-jersey": () => "A red shirt with SELL on the front and NEPO PHIL 00 on the back. Wear it to the game. Free shipping.",
  "nepo-sign": () => "A cream shirt that says NEPO PHIL: SELL! in red marker. Wear it to the game. Free shipping.",
};

export async function productMetadata(slug: string, style: Style): Promise<Metadata> {
  const team = getTeam(slug);
  if (!team) return {};
  // Plain words for link previews: "SELL shirt for Cincinnati fans".
  const fans = `for ${cityName(team).replace(/^The /, "")} fans`;
  const shareTitle = `${style.startsWith("nepo") ? "NEPO PHIL shirt" : `SELL ${garment(style)}`} ${fans}`;
  const description = SHARE_TEXT[style]?.(team) ?? `A ${colorLabel(team, style)} ${garment(style)} with SELL across the chest. Wear it to the game until they sell the team. Free shipping.`;
  return {
    title: productName(team, style),
    description,
    openGraph: { title: shareTitle, description },
    twitter: { title: shareTitle, description },
  };
}

export default function ProductPage({ slug, style }: { slug: string; style: Style }) {
  const team = getTeam(slug);
  if (!team) notFound();
  const sameCity = TEAMS.filter((t) => t.market === team.market && t.slug !== team.slug);
  const related = [...sameCity, ...TEAMS.filter((t) => t.division === team.division && t.market !== team.market)].slice(0, 4);
  if (!stylesFor(team).includes(style)) notFound();
  const noun = STYLE[style].label.toLowerCase();

  return (
    <div className="wrap">
      <div className="crumbs">
        <Link href="/shop">Shop</Link> / <Link href={`/shop?league=${team.league}`}>{leagueOf(team.league).sport}</Link> /{" "}
        <Link href={`/shop?division=${team.division}`}>{divisionName(team.division)}</Link> / {team.city}
      </div>
      <div className="pdp">
        <div className="pdp-gallery">
          <div className="pdp-main">
            <ProductPhoto team={team} style={style} sizes="(max-width: 860px) 100vw, 660px" eager />
          </div>
        </div>
        <div className="pdp-info">
          <div>
            <span className="eyebrow">{teamLabel(team)}</span>
            <h1 className="display">{cityName(team)}</h1>
          </div>
          <nav className="style-switch" aria-label="Style">
            {stylesFor(team).map((s) => (
              <Link key={s} href={productPath(team, s)} aria-current={s === style ? "page" : undefined}>
                {STYLE[s].label}
              </Link>
            ))}
          </nav>
          <BuyBox key={style} slug={team.slug} style={style} sizes={sizesFor(team, style)} open={ordersOpen()} />
          <div className="swatch-row">
            <span className="swatch" style={{ background: colorHex(team, style) }} />
            {`${colorLabel(team, style)[0].toUpperCase()}${colorLabel(team, style).slice(1)} ${garment(style)}`}
            <span className="swatch" style={{ background: STYLE[style].ink, marginLeft: 10 }} />
            {PRINT_COLOR[style]} print
          </div>
          <div className="details">
            <details open>
              <summary>Why SELL</summary>
              <div className="content">
                Modeled on the shirt Oakland fans wore to the 2023 reverse boycott.{" "}
                {WHY[style] ?? "One word in white on your team\u2019s color."} It says what a lot of {team.market} fans are thinking &mdash; loud enough to be
                seen from the owner&rsquo;s suite. <Link href="/story" style={{ textDecoration: "underline" }}>Read the story.</Link>
              </div>
            </details>
            <details>
              <summary>Details</summary>
              <div className="content">
                <ul>
                  {DETAILS[style].map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                  <li>{style.startsWith("nepo") ? "No team names or logos" : <>No team names or logos &mdash; just SELL</>}</li>
                  <li>Imported</li>
                </ul>
              </div>
            </details>
            <details>
              <summary>Shipping &amp; returns</summary>
              <div className="content">
                Printed to order and usually shipped within 2&ndash;5 business days, then 3&ndash;7 days in transit
                (US). Free shipping to the US and Canada. Because each {noun} is made for you, we can&rsquo;t take back
                the wrong size, but misprints, defects and shipping damage are covered by our 30-day{" "}
                <Link href="/terms#warranty" style={{ textDecoration: "underline" }}>Limited Warranty</Link>.
              </div>
            </details>
          </div>
        </div>
      </div>
      {related.length > 0 && (
        <section style={{ paddingBottom: 80 }}>
          <div className="section-head">
            <h2 className="display">{sameCity.length ? `More for ${team.market}` : `More from the ${teamLabel(team)}`}</h2>
          </div>
          <div className="grid">
            {related.map((t) => (
              <ProductCard key={t.slug} team={t} style={style === "hoodie" ? "hoodie" : "tee"} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
