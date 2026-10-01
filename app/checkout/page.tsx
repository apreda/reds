import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import CheckoutView from "@/components/CheckoutView";
import { embeddedCheckout, ordersOpen } from "@/lib/site";

export const metadata: Metadata = { title: "Checkout", robots: { index: false } };

export default function CheckoutPage() {
  if (!ordersOpen() || !embeddedCheckout()) redirect("/cart");
  return (
    <div className="wrap">
      <div className="crumbs">
        <Link href="/cart">Bag</Link> / Checkout
      </div>
      <CheckoutView />
    </div>
  );
}
