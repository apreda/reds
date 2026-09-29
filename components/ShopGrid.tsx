"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { DIVISIONS, TEAMS, teamsByDivision, type Division } from "@/lib/teams";
import ProductCard from "./ProductCard";

export default function ShopGrid({ initialDivision }: { initialDivision: Division | "all" }) {
  const router = useRouter();
  const [division, setDivision] = useState<Division | "all">(initialDivision);
  const [q, setQ] = useState("");

  const teams = useMemo(() => {
    const base = division === "all" ? DIVISIONS.flatMap((d) => teamsByDivision(d.id)) : teamsByDivision(division);
    const needle = q.trim().toLowerCase();
    if (!needle) return base;
    return base.filter((t) =>
      [t.market, t.nickname, t.city, `${t.market} ${t.nickname}`].some((s) => s.toLowerCase().includes(needle)),
    );
  }, [division, q]);

  const pick = (id: Division | "all") => {
    setDivision(id);
    router.replace(id === "all" ? "/shop" : `/shop?division=${id}`, { scroll: false });
  };

  return (
    <>
      <div className="shop-controls">
        <div className="tabs" role="tablist" aria-label="Division">
          <button className="tab" role="tab" aria-selected={division === "all"} onClick={() => pick("all")}>
            All {TEAMS.length}
          </button>
          {DIVISIONS.map((d) => (
            <button key={d.id} className="tab" role="tab" aria-selected={division === d.id} onClick={() => pick(d.id)}>
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
            <ProductCard key={t.slug} team={t} />
          ))}
        </div>
      ) : (
        <p className="empty">No shirts match &ldquo;{q}&rdquo;. Try a city name.</p>
      )}
    </>
  );
}
