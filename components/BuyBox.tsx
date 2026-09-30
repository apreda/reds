"use client";

import Link from "next/link";
import { useState } from "react";
import { formatPrice, priceFor, type Size, type Style } from "@/lib/products";
import { useCart } from "./CartProvider";

export default function BuyBox({ slug, style, sizes, open }: { slug: string; style: Style; sizes: Size[]; open: boolean }) {
  const { add } = useCart();
  const [size, setSize] = useState<Size | null>(null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [err, setErr] = useState("");

  const onAdd = () => {
    if (!size) {
      setErr("Pick a size first.");
      return;
    }
    add(slug, style, size, qty);
    setAdded(true);
    setErr("");
  };

  return (
    <div style={{ display: "grid", gap: 18 }}>
      <div className="pdp-price">{formatPrice(priceFor(style, size ?? "M"))}</div>
      <div>
        <div className="label-row">
          Size
          <span>Unisex fit · <Link href="/faq#sizing" style={{ textDecoration: "underline" }}>Size guide</Link></span>
        </div>
        <div className="sizes">
          {sizes.map((s) => (
            <button
              key={s}
              className="size"
              aria-pressed={size === s}
              onClick={() => {
                setSize(s);
                setErr("");
                setAdded(false);
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
      <div className="buy-row">
        <div className="qty">
          <button aria-label="Decrease quantity" onClick={() => setQty(Math.max(1, qty - 1))}>
            −
          </button>
          <span>{qty}</span>
          <button aria-label="Increase quantity" onClick={() => setQty(Math.min(20, qty + 1))}>
            +
          </button>
        </div>
        <button className="btn block" onClick={onAdd}>
          Add to bag
        </button>
      </div>
      {err && <p className="error" style={{ margin: 0 }}>{err}</p>}
      {added && (
        <div className="notice">
          Added to your bag. <Link href="/cart" style={{ textDecoration: "underline" }}>View bag &amp; check out</Link>
        </div>
      )}
      {!open && (
        <p className="note" style={{ margin: 0 }}>
          We&rsquo;re in pre-launch: you can build your bag now, and checkout opens shortly.
        </p>
      )}
    </div>
  );
}
