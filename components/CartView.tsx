"use client";

import Link from "next/link";
import { useState } from "react";
import { SHIPPING_CENTS, colorName, formatPrice, productName, productPath, resolveLine } from "@/lib/products";
import { useCart } from "./CartProvider";
import ProductPhoto from "./ProductPhoto";

export default function CartView({ open }: { open: boolean }) {
  const { lines, ready, setQty, remove } = useCart();
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  if (!ready) return <div style={{ minHeight: 300 }} />;

  const resolved = lines.map((l) => ({ line: l, r: resolveLine(l) })).filter((x) => x.r);
  if (!resolved.length) {
    return (
      <div style={{ padding: "40px 0 120px" }}>
        <p>Your bag is empty.</p>
        <Link href="/shop" className="btn">
          Find your team
        </Link>
      </div>
    );
  }

  const subtotal = resolved.reduce((n, { r }) => n + r!.unit * r!.qty, 0);

  const checkout = async () => {
    setBusy(true);
    setErr("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lines: resolved.map((x) => x.line) }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error || "Checkout failed");
      window.location.href = data.url;
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Checkout failed");
      setBusy(false);
    }
  };

  return (
    <div className="cart">
      <div className="cart-lines">
        {resolved.map(({ line, r }) => (
          <div className="cart-line" key={`${line.slug}-${r!.style}-${line.size}`}>
            <Link href={productPath(r!.team, r!.style)} className="cart-thumb">
              <ProductPhoto team={r!.team} style={r!.style} sizes="110px" />
            </Link>
            <div>
              <h3>{productName(r!.team, r!.style)}</h3>
              <div className="meta">
                {colorName(r!.team, r!.style)} · Size {line.size}
              </div>
              <div className="qty" style={{ height: 38, marginTop: 10 }}>
                <button aria-label="Decrease" onClick={() => setQty(line.slug, r!.style, line.size, line.qty - 1)}>
                  −
                </button>
                <span>{line.qty}</span>
                <button aria-label="Increase" onClick={() => setQty(line.slug, r!.style, line.size, line.qty + 1)}>
                  +
                </button>
              </div>
              <div>
                <button className="link-btn" onClick={() => remove(line.slug, r!.style, line.size)}>
                  Remove
                </button>
              </div>
            </div>
            <div style={{ fontWeight: 600 }}>{formatPrice(r!.unit * r!.qty)}</div>
          </div>
        ))}
      </div>
      <aside className="summary">
        <div className="summary-row">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="summary-row">
          <span>Shipping (US &amp; Canada)</span>
          <span>{formatPrice(SHIPPING_CENTS)}</span>
        </div>
        <div className="summary-row total">
          <span>Total</span>
          <span>{formatPrice(subtotal + SHIPPING_CENTS)}</span>
        </div>
        <button className="btn block" onClick={checkout} disabled={!open || busy}>
          {open ? (busy ? "Redirecting…" : "Check out") : "Orders open soon"}
        </button>
        {!open && (
          <p className="note" style={{ margin: 0 }}>
            We&rsquo;re in pre-launch. Your bag is saved on this device, so you can come back and check out when
            orders open.
          </p>
        )}
        {err && <p className="error" style={{ margin: 0 }}>{err}</p>}
        <p className="note" style={{ margin: 0 }}>Secure payment by Stripe.</p>
      </aside>
    </div>
  );
}
