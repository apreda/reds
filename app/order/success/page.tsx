import type { Metadata } from "next";
import Link from "next/link";
import ClearCart from "@/components/ClearCart";

export const metadata: Metadata = { title: "Order confirmed", robots: { index: false } };

export default function Success() {
  return (
    <div className="wrap" style={{ padding: "80px 20px 120px", maxWidth: 640 }}>
      <ClearCart />
      <span className="eyebrow">Order confirmed</span>
      <h1 className="display page-title" style={{ marginTop: 8 }}>
        See you in the stands.
      </h1>
      <p>
        Thanks for your order. You&rsquo;ll get a receipt by email now, and tracking as soon as your shirt ships (usually
        within 2&ndash;5 business days).
      </p>
      <p>Wear it to the game. Bring a friend in one too.</p>
      <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
        <Link href="/shop" className="btn">
          Keep shopping
        </Link>
        <Link href="/story" className="btn ghost">
          The Oakland story
        </Link>
      </div>
    </div>
  );
}
