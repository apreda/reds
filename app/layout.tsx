import type { Metadata } from "next";
import localFont from "next/font/local";
import { CartProvider } from "@/components/CartProvider";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { SITE_NAME, SITE_TAGLINE, ordersOpen, siteUrl } from "@/lib/site";
import "./globals.css";

const display = localFont({
  src: [
    { path: "../assets/oswald-600.ttf", weight: "600" },
    { path: "../assets/oswald-700.ttf", weight: "700" },
  ],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: { default: `${SITE_NAME} — ${SITE_TAGLINE}`, template: `%s | ${SITE_NAME}` },
  description:
    "Oakland fans wore SELL to tell their owner to sell the team. Now every fan base can. Protest tees for all 30 MLB cities.",
  openGraph: { siteName: SITE_NAME, type: "website" },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={display.variable}>
      <body>
        <CartProvider>
          <div className="announce">
            {ordersOpen()
              ? "Free shipping · Printed to order · Not affiliated with any team or league"
              : "Pre-launch · Orders open soon · Not affiliated with any team or league"}
          </div>
          <Header />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
