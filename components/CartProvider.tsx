"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { CartLine, Size, Style } from "@/lib/products";

type Cart = {
  lines: CartLine[];
  count: number;
  ready: boolean;
  add: (slug: string, style: Style, size: Size, qty: number) => void;
  setQty: (slug: string, style: Style, size: Size, qty: number) => void;
  remove: (slug: string, style: Style, size: Size) => void;
  clear: () => void;
};

const CartContext = createContext<Cart | null>(null);
const KEY = "stt-cart-v1";

const same = (l: CartLine, slug: string, style: Style, size: Size) =>
  l.slug === slug && (l.style ?? "tee") === style && l.size === size;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) ?? "[]");
      if (Array.isArray(saved)) setLines(saved);
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(lines));
    } catch {}
  }, [lines, ready]);

  const setQty = useCallback((slug: string, style: Style, size: Size, qty: number) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => !same(l, slug, style, size))
        : prev.map((l) => (same(l, slug, style, size) ? { ...l, qty: Math.min(qty, 20) } : l)),
    );
  }, []);

  const add = useCallback((slug: string, style: Style, size: Size, qty: number) => {
    setLines((prev) => {
      const hit = prev.find((l) => same(l, slug, style, size));
      if (hit) return prev.map((l) => (l === hit ? { ...l, qty: Math.min(l.qty + qty, 20) } : l));
      return [...prev, { slug, style, size, qty }];
    });
  }, []);

  const remove = useCallback((slug: string, style: Style, size: Size) => setQty(slug, style, size, 0), [setQty]);
  const clear = useCallback(() => setLines([]), []);

  const value = useMemo(
    () => ({ lines, count: lines.reduce((n, l) => n + l.qty, 0), ready, add, setQty, remove, clear }),
    [lines, ready, add, setQty, remove, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): Cart {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
