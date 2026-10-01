import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${SITE_NAME} collects, uses and protects your information.`,
};

const EFFECTIVE = "October 1, 2026";
const mail = <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>;

export default function Privacy() {
  return (
    <div className="wrap">
      <div className="prose legal">
        <h1 className="display page-title">Privacy Policy</h1>
        <p className="effective">Effective {EFFECTIVE}</p>

        <p>
          {SITE_NAME} (&ldquo;we,&rdquo; &ldquo;us&rdquo;) sells printed-to-order shirts and hoodies at sellmyteam.com.
          This policy explains what personal information we collect, how we use it, who we share it with and the
          choices you have. Questions or requests: {mail}.
        </p>

        <h2>What we collect</h2>
        <ul>
          <li>
            <b>Order information you give us at checkout:</b> your name, email address, phone number, shipping address
            and billing address, and what you ordered.
          </li>
          <li>
            <b>Payment information:</b> you enter your card or other payment details directly into Stripe&rsquo;s secure
            checkout form. We never see or store your full card number. Stripe shares with us only limited details,
            such as the card brand, the last four digits and whether the payment succeeded.
          </li>
          <li>
            <b>Messages you send us,</b> such as emails about an order.
          </li>
          <li>
            <b>Technical information:</b> like most websites, our hosting provider automatically logs your IP address,
            browser type and the pages you request, for security and to keep the site running. Stripe&rsquo;s checkout
            form also collects device and browser information to prevent fraud and, if you choose to use it, to offer
            its Link saved-payment feature.
          </li>
          <li>
            <b>Your bag:</b> the items you add to your bag are stored in your own browser (local storage) so they&rsquo;re
            still there when you come back. They aren&rsquo;t sent to us until you check out.
          </li>
        </ul>
        <p>
          We don&rsquo;t use advertising trackers, analytics services or social media pixels, and we don&rsquo;t send
          marketing emails.
        </p>

        <h2>How we use it</h2>
        <ul>
          <li>To process your payment, print and ship your order, and send order and shipping updates.</li>
          <li>To answer your questions and handle replacements and refunds.</li>
          <li>To prevent fraud and keep the site secure.</li>
          <li>To keep the business, tax and accounting records the law requires.</li>
        </ul>

        <h2>Who we share it with</h2>
        <p>We share personal information only with the service providers that make an order happen:</p>
        <ul>
          <li>
            <b>Stripe</b> (payment processing): your payment, contact and address details.{" "}
            <a href="https://stripe.com/privacy">Stripe&rsquo;s privacy policy</a>.
          </li>
          <li>
            <b>Printful</b> (printing and fulfillment): your name, shipping address, email, phone number and the items
            ordered, so they can print, pack and ship your order and may email you shipping updates.{" "}
            <a href="https://www.printful.com/policies/privacy">Printful&rsquo;s privacy policy</a>.
          </li>
          <li>
            <b>Shipping carriers</b> (through Printful): your name and shipping address, to deliver your package.
          </li>
          <li>
            <b>Vercel</b> (website hosting): the technical information described above.
          </li>
          <li>
            <b>Others when required:</b> government authorities or other parties when the law requires it or to protect
            our rights, and a buyer or successor if the business is ever sold or transferred.
          </li>
        </ul>
        <p>
          Information is sent to these providers over encrypted (HTTPS/TLS) connections through their secure systems.
          We do not sell your personal information, and we do not share it for targeted advertising or with anyone for
          their own marketing.
        </p>

        <h2>How we protect it</h2>
        <p>
          The site runs only over HTTPS. Payments are handled entirely by Stripe, which is certified to the highest
          payment-card security standard (PCI DSS Level 1), so card numbers never touch our systems. Access to order
          information is limited to what&rsquo;s needed to run the store, and our accounts with these providers use
          strong authentication. No method of sending or storing data is perfectly secure, but we work to protect your
          information and will notify you if a breach affects it, as the law requires.
        </p>

        <h2>How long we keep it</h2>
        <p>
          We keep order records for as long as needed to fulfill and support your order and to meet tax, accounting
          and legal requirements (generally up to seven years), then delete them. Your bag stays in your browser until
          you check out or clear your browser data.
        </p>

        <h2>Your choices and rights</h2>
        <p>
          Wherever you live, you can ask us to tell you what personal information we have about you, give you a copy,
          correct it or delete it. Email {mail} from the address you used to order. We&rsquo;ll respond within 45 days.
          We may need to keep some information to meet legal obligations, such as tax records, and we&rsquo;ll tell you
          if so. We won&rsquo;t treat you differently for making a request. Depending on where you live, you may have
          additional rights under your state&rsquo;s law, and you can ask us about them at the same address.
        </p>

        <h2>Do Not Track and other privacy signals</h2>
        <p>
          We don&rsquo;t track you across other websites, and we don&rsquo;t let third parties collect information about
          your activity on our site over time and across other sites for advertising. Because we don&rsquo;t do this
          kind of tracking, our site doesn&rsquo;t change how it works when your browser sends a Do Not Track or Global
          Privacy Control signal. Stripe&rsquo;s checkout form collects device information only for fraud prevention
          and payment features, as described above.
        </p>

        <h2>California residents</h2>
        <p>
          We don&rsquo;t disclose personal information to third parties for their own direct marketing purposes
          (California Civil Code § 1798.83). You may request information about our privacy practices at {mail}.
        </p>

        <h2>Children</h2>
        <p>
          The site isn&rsquo;t directed to children under 13, and we don&rsquo;t knowingly collect their personal
          information. If you believe a child under 13 has given us personal information, email {mail} and we&rsquo;ll
          delete it.
        </p>

        <h2>Where we operate</h2>
        <p>
          We&rsquo;re based in the United States and sell to customers in the US and Canada. Your information is
          processed in the United States and wherever our service providers operate.
        </p>

        <h2>Changes to this policy</h2>
        <p>
          If we change this policy, we&rsquo;ll post the new version here and update the effective date above. If a
          change is significant, we&rsquo;ll say so clearly at the top of this page before it takes effect.
        </p>

        <h2>Contact</h2>
        <p>
          {SITE_NAME} · {mail} · See also our <Link href="/terms">Terms of Service</Link>.
        </p>
      </div>
    </div>
  );
}
