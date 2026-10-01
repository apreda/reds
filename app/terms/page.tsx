import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms for buying from ${SITE_NAME}: orders, shipping, returns and our limited warranty.`,
};

const EFFECTIVE = "October 1, 2026";
const mail = <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>;

export default function Terms() {
  return (
    <div className="wrap">
      <div className="prose legal">
        <h1 className="display page-title">Terms of Service</h1>
        <p className="effective">Effective {EFFECTIVE}</p>

        <p>
          These terms apply when you use sellmyteam.com or buy from {SITE_NAME} (&ldquo;we,&rdquo; &ldquo;us&rdquo;).
          By placing an order, you agree to them. Our <Link href="/privacy">Privacy Policy</Link> explains how we handle
          your information. Questions: {mail}.
        </p>

        <h2>Who we are</h2>
        <p>
          {SITE_NAME} is an independent fan project. We are not affiliated with, licensed, sponsored or endorsed by Major
          League Baseball, the National Basketball Association, the National Football League, any club, or any owner. Our products carry no team names or logos. Team and city names
          appear on this site only to describe which fans a shirt is for.
        </p>

        <h2>Products</h2>
        <p>
          Every item is printed to order for you by our production partner. Colors on screen can differ slightly from
          the finished product, and sizes are approximate (see our <Link href="/faq#sizing">size guide</Link>). Our
          garments are imported. We can change or discontinue products at any time.
        </p>

        <h2>Prices and payment</h2>
        <p>
          Prices are in US dollars and include shipping to the US and Canada. If sales tax applies to your order, it
          will be shown at checkout before you pay. Payment is processed securely by Stripe, and you&rsquo;re charged
          when you place your order. We may decline or cancel an order, with a full refund, for example if a price was
          listed in error, an item is unavailable, or we suspect fraud. Your order is accepted when it ships.
        </p>

        <h2>Shipping</h2>
        <p>
          We ship to the US and Canada. Orders are usually printed and shipped within 2&ndash;5 business days, then take
          about 3&ndash;7 business days to arrive in the US (often longer to Canada). You&rsquo;ll get tracking
          information when your order ships. If we can&rsquo;t ship your order within the time stated (or within 30
          days if no time was stated), we&rsquo;ll tell you, give you a revised shipping date and let you cancel for a
          full refund of the unshipped items. Orders to Canada may be subject to import duties or taxes charged by
          Canadian authorities. If you give us a wrong or incomplete address, we may not be able to replace a
          package that can&rsquo;t be delivered.
        </p>

        <h2>Cancellations</h2>
        <p>
          Because each item is made for you, email {mail} as soon as possible if you need to cancel or change an
          order. We&rsquo;ll cancel it for a full refund if printing hasn&rsquo;t started yet, usually within a few
          hours of ordering. Once an item is in production, we can&rsquo;t cancel it.
        </p>

        <h2 id="returns">Returns and refunds</h2>
        <p>
          Since every item is printed to order, we don&rsquo;t accept returns or exchanges for the wrong size or a change
          of mind. Please check the <Link href="/faq#sizing">size guide</Link> before ordering. If something is wrong
          with your order, our Limited Warranty below covers it. Approved refunds go back to your original payment
          method, and your bank may take 5&ndash;10 business days to post them.
        </p>

        <h2 id="warranty">Limited Warranty</h2>
        <p>
          <b>What&rsquo;s covered:</b> We warrant to the original purchaser that each item will arrive free of
          misprints, defects in materials or workmanship, and shipping damage, and that you&rsquo;ll receive the item,
          size and color you ordered.
        </p>
        <p>
          <b>For how long:</b> Contact us within 30 days of delivery (or of the expected delivery date, if your package
          never arrives).
        </p>
        <p>
          <b>What we&rsquo;ll do:</b> Replace the item free of charge or, if we can&rsquo;t, refund what you paid for it.
          You don&rsquo;t need to send the item back unless we ask, and we&rsquo;ll cover any return shipping we request.
        </p>
        <p>
          <b>How to make a claim:</b> Email {mail} with your order details and a photo of the problem.
        </p>
        <p>
          <b>What&rsquo;s not covered:</b> Normal wear and tear; damage from washing, drying or ironing against the care
          label; and items ordered in the wrong size.
        </p>
        <p>
          Any implied warranties, including the implied warranties of merchantability and fitness for a particular
          purpose, are limited to 30 days from delivery. Some states do not allow limitations on how long an implied
          warranty lasts, so this limitation may not apply to you. This warranty gives you specific legal rights, and
          you may also have other rights which vary from state to state.
        </p>

        <h2>Using the site</h2>
        <p>
          Don&rsquo;t misuse the site: no attempts to break in, overload it, scrape it, or use it for anything
          unlawful. The site&rsquo;s text, photos and design are ours or used with permission, and you may not copy or
          resell them commercially. We provide the website itself (as distinct from the products we sell) &ldquo;as
          is,&rdquo; and we don&rsquo;t promise it will always be available or error-free.
        </p>

        <h2>Limitation of liability</h2>
        <p>
          To the fullest extent the law allows, we aren&rsquo;t liable for indirect, incidental or consequential damages,
          and our total liability for any claim related to an order is limited to the amount you paid for that order.
          Nothing in these terms limits any rights you have under consumer protection laws that can&rsquo;t be waived,
          or our liability where the law doesn&rsquo;t allow it to be limited.
        </p>

        <h2>Disputes</h2>
        <p>
          If you have a problem, email us first. Most issues are solved quickly that way. These terms are governed
          by the laws of the State of Ohio, without regard to its conflict-of-law rules, and any dispute will be
          handled in the state or federal courts located in Ohio. Either of us may instead bring an individual claim in
          small claims court where it qualifies. If you&rsquo;re a consumer, you also keep any protections the law of
          your home state gives you.
        </p>

        <h2>Changes to these terms</h2>
        <p>
          We may update these terms from time to time by posting a new version here with a new effective date. The
          terms in effect when you place an order apply to that order.
        </p>

        <h2>Everything else</h2>
        <p>
          If any part of these terms is found unenforceable, the rest still applies. These terms and our Privacy Policy
          are the whole agreement between you and us about your use of the site and your purchases.
        </p>

        <h2>Contact</h2>
        <p>
          {SITE_NAME} · {mail}
        </p>
      </div>
    </div>
  );
}
