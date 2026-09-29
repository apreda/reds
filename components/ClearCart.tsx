"use client";

import { useEffect } from "react";
import { useCart } from "./CartProvider";

export default function ClearCart() {
  const { ready, clear } = useCart();
  useEffect(() => {
    if (ready) clear();
  }, [ready, clear]);
  return null;
}
