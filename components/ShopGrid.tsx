"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { STYLE, type Style } from "@/lib/products";
import { DIVISIONS, LEAGUES, teamsByDivision, type Division, type League } from "@/lib/teams";
import ProductCard from "./ProductCard";

type Filter = { league: League; division: Division | "all"; style: Style };

export default function ShopGrid({ initial }: { initial: Filter }) {
  const router = useRouter();
  const [{ league, division, style }, setFilter] = useState<Filter>(initial);
  const [q, setQ] = useState("");

  const teams = useMemo(() => {
    const needle = q.trim().toLowerCase();
    // A search looks across every league, so "Lakers" works from the baseball tab.
    const divisions = DIVISIONS.filter((d) => (needle ? true : division === "all" ? d.league === league : d.id === division));
    const base = divisions.flatMap((d) => teamsByDivision(d.id));
    if (!needle) return base;
    return base.filter((t) =>
      [t.market, t.nickname, t.city, `${t.market} ${t.nickname}`].some((s) => s.toLowerCase().includes(needle)),
    );
  }, [league, division, q]);

  const go = (next: Partial<Filter>) => {
    const f = { league, division, style, ...next };
    if (next.league) f.division = "all";
    setFilter(f);
    const params = new URLSearchParams();
    if (f.style !== "tee") params.set("style", f.style);
    if (f.league !== "mlb") params.set("league", f.league);
    if (f.division !== "all") params.set("division", f.division);
    router.replace(params.size ? `/shop?${params}` : "/shop", { scroll: false });
  };

  return (
    <>
      <div className="shop-switches">
        <nav className="style-switch" aria-label="League">
          {LEAGUES.map((l) => (
            <button key={l.id} aria-current={l.id === league ? "page" : undefined} onClick={() => go({ league: l.id })}>
              {l.sport}
            </button>
          ))}
        </nav>
        <nav className="style-switch" aria-label="Style">
          {(["tee", "hoodie"] as const).map((s) => (
            <button key={s} aria-current={s === style ? "page" : undefined} onClick={() => go({ style: s })}>
              {STYLE[s].label}s
            </button>
          ))}
        </nav>
      </div>
      <div className="shop-controls">
        <div className="tabs" role="tablist" aria-label="Division">
          <button className="tab" role="tab" aria-selected={division === "all"} onClick={() => go({ division: "all" })}>
            All {LEAGUES.find((l) => l.id === league)!.label}
          </button>
          {DIVISIONS.filter((d) => d.league === league).map((d) => (
            <button key={d.id} className="tab" role="tab" aria-selected={division === d.id} onClick={() => go({ division: d.id })}>
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
          {teams.map((t) => (
            // One card per team; the city tee and specials are options on the team's page.
            <ProductCard key={t.slug} team={t} style={style} />
          ))}
        </div>
      ) : (
        <p className="empty">No shirts match &ldquo;{q}&rdquo;. Try a city name.</p>
      )}
    </>
  );
}
