"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { STYLE, stylesFor, type Style } from "@/lib/products";
import { DIVISIONS, TEAMS, teamsByDivision, type Division } from "@/lib/teams";
import ProductCard from "./ProductCard";

export default function ShopGrid({ initialDivision, initialStyle }: { initialDivision: Division | "all"; initialStyle: Style }) {
  const router = useRouter();
  const [division, setDivision] = useState<Division | "all">(initialDivision);
  const [style, setStyle] = useState<Style>(initialStyle);
  const [q, setQ] = useState("");

  const teams = useMemo(() => {
    const base = division === "all" ? DIVISIONS.flatMap((d) => teamsByDivision(d.id)) : teamsByDivision(division);
    const needle = q.trim().toLowerCase();
    if (!needle) return base;
    return base.filter((t) =>
      [t.market, t.nickname, t.city, `${t.market} ${t.nickname}`].some((s) => s.toLowerCase().includes(needle)),
    );
  }, [division, q]);

  const go = (d: Division | "all", s: Style) => {
    setDivision(d);
    setStyle(s);
    const params = new URLSearchParams();
    if (s !== "tee") params.set("style", s);
    if (d !== "all") params.set("division", d);
    router.replace(params.size ? `/shop?${params}` : "/shop", { scroll: false });
  };

  return (
    <>
      <nav className="style-switch" aria-label="Style" style={{ marginBottom: 18 }}>
        {(["tee", "hoodie"] as const).map((s) => (
          <button key={s} aria-current={s === style ? "page" : undefined} onClick={() => go(division, s)}>
            {STYLE[s].label}s
          </button>
        ))}
      </nav>
      <div className="shop-controls">
        <div className="tabs" role="tablist" aria-label="Division">
          <button className="tab" role="tab" aria-selected={division === "all"} onClick={() => go("all", style)}>
            All {TEAMS.length}
          </button>
          {DIVISIONS.map((d) => (
            <button key={d.id} className="tab" role="tab" aria-selected={division === d.id} onClick={() => go(d.id, style)}>
              {d.label}
            </button>
          ))}
        </div>
        <input
          className="search"
          type="search"
          placeholder="Find your team or city"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Search teams"
        />
      </div>
      {teams.length ? (
        <div className="grid">
          {teams.flatMap((t) =>
            // Special editions (the pinstripe tee) sit next to the team's tee.
            (style === "tee" ? stylesFor(t).filter((s) => s !== "hoodie") : [style]).map((s) => (
              <ProductCard key={`${t.slug}-${s}`} team={t} style={s} />
            )),
          )}
        </div>
      ) : (
        <p className="empty">No shirts match &ldquo;{q}&rdquo;. Try a city name.</p>
      )}
    </>
  );
}
