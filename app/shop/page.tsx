import type { Metadata } from "next";
import ShopGrid from "@/components/ShopGrid";
import { isStyle } from "@/lib/products";
import { DIVISIONS, type Division } from "@/lib/teams";

export const metadata: Metadata = {
  title: "Shop All 30",
  description: "A SELL tee and hoodie for every MLB fan base. Pick your city.",
};

export default async function ShopPage({ searchParams }: { searchParams: Promise<{ division?: string; style?: string }> }) {
  const { division, style } = await searchParams;
  const initial = DIVISIONS.some((d) => d.id === division) ? (division as Division) : "all";
  const initialStyle = isStyle(style) ? style : "tee";
  return (
    <div className="wrap">
      <div className="section-head" style={{ marginTop: 40 }}>
        <div>
          <span className="eyebrow">30 ballparks · One message</span>
          <h2 className="display">Shop All 30</h2>
        </div>
      </div>
      <ShopGrid key={`${initial}-${initialStyle}`} initialDivision={initial} initialStyle={initialStyle} />
      <div style={{ height: 80 }} />
    </div>
  );
}
