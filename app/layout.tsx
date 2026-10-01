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
  description: "Shirts that say SELL, in your team's color. Wear one to the game until the owner sells the team. Free shipping.",
  openGraph: { siteName: SITE_NAME, type: "website", title: "Wear SELL to the game until your owner sells." },
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
              : "Coming soon · Free shipping · Not affiliated with any team or league"}
          </div>
          <Header />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
