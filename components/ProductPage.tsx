import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BuyBox from "@/components/BuyBox";
import { INK } from "@/components/PrintArt";
import ProductCard from "@/components/ProductCard";
import ProductPhoto from "@/components/ProductPhoto";
import {
  colorHex,
  colorName,
  mockupPath,
  productName,
  productPath,
  sizesFor,
  STYLE,
  STYLES,
  type Style,
} from "@/lib/products";
import { ordersOpen } from "@/lib/site";
import { divisionName, getTeam, TEAMS } from "@/lib/teams";

const DETAILS: Record<Style, string[]> = {
  tee: [
    "Bella+Canvas 3001 unisex tee, 100% combed ring-spun cotton",
    "Soft, lightweight 4.2 oz jersey; retail fit",
  ],
  hoodie: [
    "Gildan 18500 unisex heavy blend hoodie, 50% cotton / 50% polyester",
    "Midweight 8 oz fleece, front pouch pocket, double-lined hood with drawcord",
  ],
};

export async function productMetadata(slug: string, style: Style): Promise<Metadata> {
  const team = getTeam(slug);
  if (!team) return {};
  const title = productName(team, style);
  const noun = STYLE[style].label.toLowerCase();
  const description = `The SELL protest ${noun} for ${team.market}: white SELL on a ${colorName(team, style)} ${noun}, printed to order.`;
  return { title, description, openGraph: { title, description, images: [mockupPath(team, style)] } };
}

export default function ProductPage({ slug, style }: { slug: string; style: Style }) {
  const team = getTeam(slug);
  if (!team) notFound();
  const sameCity = TEAMS.filter((t) => t.market === team.market && t.slug !== team.slug);
  const related = [...sameCity, ...TEAMS.filter((t) => t.division === team.division && t.market !== team.market)].slice(0, 4);
  const noun = STYLE[style].label.toLowerCase();

  return (
    <div className="wrap">
      <div className="crumbs">
        <Link href="/shop">Shop</Link> / <Link href={`/shop?division=${team.division}`}>{divisionName(team.division)}</Link> / {team.city}
      </div>
      <div className="pdp">
        <div className="pdp-gallery">
          <div className="pdp-main">
            <ProductPhoto team={team} style={style} sizes="(max-width: 860px) 100vw, 660px" eager />
          </div>
        </div>
        <div className="pdp-info">
          <div>
            <span className="eyebrow">{divisionName(team.division)}</span>
            <h1 className="display">{productName(team, style)}</h1>
          </div>
          <nav className="style-switch" aria-label="Style">
            {STYLES.map((s) => (
              <Link key={s} href={productPath(team, s)} aria-current={s === style ? "page" : undefined}>
                {STYLE[s].label}
              </Link>
            ))}
          </nav>
          <BuyBox key={style} slug={team.slug} style={style} sizes={sizesFor(team, style)} open={ordersOpen()} />
          <div className="swatch-row">
            <span className="swatch" style={{ background: colorHex(team, style) }} />
            {colorName(team, style)} {noun}
            <span className="swatch" style={{ background: INK, marginLeft: 10 }} />
            white print
          </div>
          <div className="details">
            <details open>
              <summary>Why SELL</summary>
              <div className="content">
                Modeled on the shirt Oakland fans wore to the 2023 reverse boycott. One word in white on your
                team&rsquo;s color. It says what a lot of {team.market} fans are thinking &mdash; loud enough to be
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
                  <li>Direct-to-garment print, front only</li>
                  <li>No team names or logos &mdash; just SELL</li>
                </ul>
              </div>
            </details>
            <details>
              <summary>Shipping &amp; returns</summary>
              <div className="content">
                Printed to order and usually shipped within 2&ndash;5 business days, then 3&ndash;7 days in transit
                (US). Flat $5.99 shipping to the US and Canada. Because each {noun} is made for you, we replace
                misprints and damaged items free but can&rsquo;t take back the wrong size. <Link href="/faq" style={{ textDecoration: "underline" }}>FAQ</Link>
              </div>
            </details>
          </div>
        </div>
      </div>
      {related.length > 0 && (
        <section style={{ paddingBottom: 80 }}>
          <div className="section-head">
            <h2 className="display">{sameCity.length ? `More for ${team.market}` : `More from the ${divisionName(team.division)}`}</h2>
          </div>
          <div className="grid">
            {related.map((t) => (
              <ProductCard key={t.slug} team={t} style={style} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
