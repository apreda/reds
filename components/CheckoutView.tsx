"use client";

import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Link from "next/link";
import { useCallback, useState } from "react";
import { useCart } from "./CartProvider";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "");

// Stripe's embedded checkout form for the bag; Stripe returns the buyer to
// /order/success when they've paid.
export default function CheckoutView() {
  const { lines, ready } = useCart();
  const [err, setErr] = useState("");

  // The provider reads this once, so it must not change after mount; the bag
  // can't change on this page.
  const fetchClientSecret = useCallback(async () => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lines }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.clientSecret) {
      setErr(data.error || "Couldn't start checkout. Please try again.");
      throw new Error(data.error);
    }
    return data.clientSecret as string;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  if (!ready) return <div style={{ minHeight: 600 }} />;
  if (!lines.length || err) {
    return (
      <div style={{ padding: "20px 0 120px" }}>
        <p className={err ? "error" : undefined}>{err || "Your bag is empty."}</p>
        <Link href={err ? "/cart" : "/shop"} className="btn">
          {err ? "Back to your bag" : "Find your team"}
        </Link>
      </div>
    );
  }
  return (
    <div className="checkout-embed">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={{ fetchClientSecret }}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}
