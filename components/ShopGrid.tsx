"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { LEAGUES, TEAMS, teamsByLeague, type League } from "@/lib/teams";
import ProductCard from "./ProductCard";

export default function ShopGrid({ initialLeague }: { initialLeague: League | "all" }) {
  const router = useRouter();
  const [league, setLeague] = useState<League | "all">(initialLeague);
  const [q, setQ] = useState("");

  const teams = useMemo(() => {
    const base = league === "all" ? LEAGUES.flatMap((l) => teamsByLeague(l.id)) : teamsByLeague(league);
    const needle = q.trim().toLowerCase();
    if (!needle) return base;
    return base.filter((t) =>
      [t.market, t.nickname, t.city, `${t.market} ${t.nickname}`].some((s) => s.toLowerCase().includes(needle)),
    );
  }, [league, q]);

  const pick = (id: League | "all") => {
    setLeague(id);
    router.replace(id === "all" ? "/shop" : `/shop?league=${id}`, { scroll: false });
  };

  return (
    <>
      <div className="shop-controls">
        <div className="tabs" role="tablist" aria-label="League">
          <button className="tab" role="tab" aria-selected={league === "all"} onClick={() => pick("all")}>
            All ({TEAMS.length})
          </button>
          {LEAGUES.map((l) => (
            <button key={l.id} className="tab" role="tab" aria-selected={league === l.id} onClick={() => pick(l.id)}>
              {l.label}
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
            <ProductCard key={t.slug} team={t} />
          ))}
        </div>
      ) : (
        <p className="empty">No shirts match &ldquo;{q}&rdquo;. Try a city name.</p>
      )}
    </>
  );
}
