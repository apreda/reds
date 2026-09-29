import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BuyBox from "@/components/BuyBox";
import ProductCard from "@/components/ProductCard";
import Tee from "@/components/Tee";
import { shirtHex, sizesFor } from "@/lib/products";
import { ordersOpen } from "@/lib/site";
import { divisionName, fanLabel, getTeam, TEAMS } from "@/lib/teams";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return TEAMS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const team = getTeam((await params).slug);
  if (!team) return {};
  const title = `SELL Tee — ${team.city}`;
  const description = `A SELL protest tee for ${fanLabel(team)} fans. ${team.shirt} tee, printed to order.`;
  return {
    title,
    description,
    openGraph: { title, description, images: [`/api/mockup/${team.slug}`] },
  };
}

export default async function ShirtPage({ params }: Props) {
  const team = getTeam((await params).slug);
  if (!team) notFound();
  const sameCity = TEAMS.filter((t) => t.market === team.market && t.slug !== team.slug);
  const related = [...sameCity, ...TEAMS.filter((t) => t.division === team.division && t.market !== team.market)].slice(0, 4);

  return (
    <div className="wrap">
      <div className="crumbs">
        <Link href="/shop">Shop</Link> / <Link href={`/shop?division=${team.division}`}>{divisionName(team.division)}</Link> / {team.city}
      </div>
      <div className="pdp">
        <div className="pdp-gallery">
          <div className="pdp-main">
            <Tee team={team} />
          </div>
        </div>
        <div className="pdp-info">
          <div>
            <span className="eyebrow">
              {divisionName(team.division)} · For {fanLabel(team)} fans
            </span>
            <h1 className="display">SELL Tee — {team.city}</h1>
          </div>
          <BuyBox slug={team.slug} sizes={sizesFor(team)} open={ordersOpen()} />
          <div className="swatch-row">
            <span className="swatch" style={{ background: shirtHex(team) }} />
            {team.shirt} tee
            <span className="swatch" style={{ background: team.ink, marginLeft: 10 }} />
            <span className="swatch" style={{ background: team.accent }} />
            print
          </div>
          <div className="details">
            <details open>
              <summary>Why SELL</summary>
              <div className="content">
                Modeled on the shirt Oakland fans wore to the 2023 reverse boycott. One word, your team&rsquo;s colors,
                your city underneath. It says what a lot of {team.market} fans are thinking &mdash; loud enough to be
                seen from the owner&rsquo;s suite. <Link href="/story" style={{ textDecoration: "underline" }}>Read the story.</Link>
              </div>
            </details>
            <details>
              <summary>Details</summary>
              <div className="content">
                <ul>
                  <li>Bella+Canvas 3001 unisex tee, 100% combed ring-spun cotton (heather colors are a blend)</li>
                  <li>Soft, lightweight 4.2 oz jersey; retail fit</li>
                  <li>Direct-to-garment print, front only</li>
                  <li>No team names or logos &mdash; just SELL and your city</li>
                </ul>
              </div>
            </details>
            <details>
              <summary>Shipping &amp; returns</summary>
              <div className="content">
                Printed to order and usually shipped within 2&ndash;5 business days, then 3&ndash;7 days in transit
                (US). Flat $5.99 shipping to the US and Canada. Because each shirt is made for you, we replace
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
              <ProductCard key={t.slug} team={t} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
