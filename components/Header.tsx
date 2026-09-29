"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "./CartProvider";

const LINKS = [
  { href: "/shop", label: "Shop All" },
  { href: "/shop?league=mlb", label: "Baseball" },
  { href: "/shop?league=nfl", label: "Football" },
  { href: "/shop?league=nba", label: "Basketball" },
  { href: "/shop?league=nhl", label: "Hockey" },
];

export default function Header() {
  const { count, ready } = useCart();
  const [open, setOpen] = useState(false);
  return (
    <header className="header">
      <div className="wrap header-inner">
        <div>
          <nav className="nav" aria-label="Primary">
            {LINKS.slice(0, 3).map((l) => (
              <Link key={l.href} href={l.href}>
                {l.label}
              </Link>
            ))}
            <Link href="/story">The Story</Link>
          </nav>
          <button className="menu-btn" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>
            <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden>
              <path d="M2 6h18M2 11h18M2 16h18" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </button>
        </div>
        <Link href="/" className="logo" onClick={() => setOpen(false)}>
          Sell The Team
          <small>Est. Oakland 2023</small>
        </Link>
        <div className="header-right">
          <Link href="/faq" className="hide-sm">
            FAQ
          </Link>
          <Link href="/cart" aria-label={`Bag, ${count} items`}>
            Bag{ready && count > 0 ? <span className="bag-count">{count}</span> : null}
          </Link>
        </div>
      </div>
      <nav className={`mobile-nav${open ? " open" : ""}`} aria-label="Mobile">
        {[...LINKS, { href: "/story", label: "The Story" }, { href: "/faq", label: "FAQ" }].map((l) => (
          <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
