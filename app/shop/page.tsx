import type { Metadata } from "next";
import ShopGrid from "@/components/ShopGrid";
import { LEAGUES, type League } from "@/lib/teams";

export const metadata: Metadata = {
  title: "Shop Every City",
  description: "SELL tees for every MLB, NFL, NBA and NHL fan base. Pick your city.",
};

export default async function ShopPage({ searchParams }: { searchParams: Promise<{ league?: string }> }) {
  const { league } = await searchParams;
  const initial = LEAGUES.some((l) => l.id === league) ? (league as League) : "all";
  return (
    <div className="wrap">
      <div className="section-head" style={{ marginTop: 40 }}>
        <div>
          <span className="eyebrow">124 fan bases · One message</span>
          <h2 className="display">Shop Every City</h2>
        </div>
      </div>
      <ShopGrid key={initial} initialLeague={initial} />
      <div style={{ height: 80 }} />
    </div>
  );
}
