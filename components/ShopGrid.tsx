"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { STYLE, stylesFor, type Style } from "@/lib/products";
import { DIVISIONS, LEAGUES, TEAMS, teamsByDivision, type Division, type League } from "@/lib/teams";
import ProductCard from "./ProductCard";

type Filter = { league: League | "all"; division: Division | "all"; style: Style };

export default function ShopGrid({ initial }: { initial: Filter }) {
  const router = useRouter();
  const [{ league, division, style }, setFilter] = useState<Filter>(initial);
  const [q, setQ] = useState("");

  const teams = useMemo(() => {
    const divisions = DIVISIONS.filter((d) => (division === "all" ? league === "all" || d.league === league : d.id === division));
    const base = divisions.flatMap((d) => teamsByDivision(d.id));
    const needle = q.trim().toLowerCase();
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
    if (f.league !== "all") params.set("league", f.league);
    if (f.division !== "all") params.set("division", f.division);
    router.replace(params.size ? `/shop?${params}` : "/shop", { scroll: false });
  };

  return (
    <>
      <div className="shop-switches">
        <nav className="style-switch" aria-label="League">
          <button aria-current={league === "all" ? "page" : undefined} onClick={() => go({ league: "all" })}>
            All {TEAMS.length}
          </button>
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
        {league !== "all" ? (
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
        ) : (
          <span />
        )}
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
