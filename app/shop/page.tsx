import type { Metadata } from "next";
import ShopGrid from "@/components/ShopGrid";
import { isStyle } from "@/lib/products";
import { DIVISIONS, LEAGUES, type Division, type League } from "@/lib/teams";

export const metadata: Metadata = {
  title: "Shop Every Team",
  description: "A SELL tee and hoodie for every MLB, NBA and NFL fan base. Pick your city.",
};

type Search = { league?: string; division?: string; style?: string };

export default async function ShopPage({ searchParams }: { searchParams: Promise<Search> }) {
  const sp = await searchParams;
  const division = DIVISIONS.find((d) => d.id === sp.division);
  const league: League = division?.league ?? (LEAGUES.some((l) => l.id === sp.league) ? (sp.league as League) : "mlb");
  const initial = {
    league,
    division: (division?.id ?? "all") as Division | "all",
    style: isStyle(sp.style) && sp.style !== "pinstripe" ? sp.style : "tee",
  };
  return (
    <div className="wrap">
      <div className="section-head" style={{ marginTop: 40 }}>
        <div>
          <span className="eyebrow">Every team · One message</span>
          <h2 className="display">Shop</h2>
        </div>
      </div>
      <ShopGrid key={`${initial.league}-${initial.division}-${initial.style}`} initial={initial} />
      <div style={{ height: 80 }} />
    </div>
  );
}
