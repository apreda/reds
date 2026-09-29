import type { Metadata } from "next";
import CartView from "@/components/CartView";
import { ordersOpen } from "@/lib/site";

export const metadata: Metadata = { title: "Your Bag" };

export default function CartPage() {
  return (
    <div className="wrap">
      <h1 className="display page-title">Your Bag</h1>
      <CartView open={ordersOpen()} />
    </div>
  );
}
