import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = { title: "FAQ", description: "Shipping, sizing, returns and more." };

const QA: { id?: string; q: string; a: React.ReactNode }[] = [
  {
    id: "shipping",
    q: "How long does shipping take?",
    a: "Every shirt is printed to order by our production partner. Most orders ship within 2–5 business days and arrive 3–7 business days after that in the US (a little longer to Canada). You'll get tracking by email when it ships. Shipping is free on every order to the US and Canada.",
  },
  {
    id: "sizing",
    q: "How do the tees and hoodies fit?",
    a: (
      <>
        <p>
          Tees are the Bella+Canvas 3001, a soft, lightweight unisex tee with a modern retail fit. Hoodies are the Gildan
          18500, a classic unisex heavy blend hoodie with a roomier fit. If you like a looser tee, size up. Approximate body width /
          length in inches:
        </p>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ textAlign: "left", borderBottom: "1px solid var(--line)" }}>
              <th style={{ padding: "8px 0" }}>Size</th>
              <th>Tee</th>
              <th>Hoodie</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["S", "18", "28", "20", "27"],
              ["M", "20", "29", "22", "28"],
              ["L", "22", "30", "24", "29"],
              ["XL", "24", "31", "26", "30"],
              ["2XL", "26", "32", "28", "31"],
              ["3XL", "28", "33", "30", "32"],
            ].map(([s, tw, tl, hw, hl]) => (
              <tr key={s} style={{ borderBottom: "1px solid var(--line)" }}>
                <td style={{ padding: "8px 0" }}>{s}</td>
                <td>
                  {tw}&Prime; / {tl}&Prime;
                </td>
                <td>
                  {hw}&Prime; / {hl}&Prime;
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    ),
  },
  {
    id: "returns",
    q: "Can I return or exchange?",
    a: (
      <>
        Because each shirt is made just for you, we can&rsquo;t accept returns for the wrong size or a change of heart.
        If your order arrives misprinted, damaged, or defective, email{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> a photo within 30 days of delivery and we&rsquo;ll send
        a replacement or refund, free. Full details are in our <Link href="/terms#warranty">Limited Warranty</Link>.
      </>
    ),
  },
  {
    q: "Are you affiliated with MLB or the teams?",
    a: "No. Sell My Team is an independent fan project with no connection to Major League Baseball, the National Basketball Association, the National Football League, any club, or any owner. Our shirts never carry team names or logos — just the word SELL, in white, on a color fans will recognize. Team names never appear on our shirts or product listings, but you can still search for your team's name in the shop.",
  },
  {
    q: "Is this the original Oakland shirt?",
    a: "No. The original 2023 shirt was made by the fan group Oakland 68s with Oaklandish. Our Oakland tee is a tribute to it, and the rest of the collection carries the idea to every other city.",
  },
  {
    q: "My city has more than one team. Which shirt is mine?",
    a: "Each team's shirt comes in the color fans think of for that team, so teams that share a city get the same city name and the color tells them apart. Search your team's name on the shop page and it'll show up.",
  },
  {
    q: "Do you ship internationally?",
    a: "Right now we ship to the US and Canada. More countries soon.",
  },
];

export default function FAQ() {
  return (
    <div className="wrap">
      <h1 className="display page-title">FAQ</h1>
      <div className="details" style={{ maxWidth: 760, marginBottom: 90 }}>
        {QA.map(({ id, q, a }) => (
          <details key={q} id={id} open={id === "shipping"}>
            <summary>{q}</summary>
            <div className="content">{a}</div>
          </details>
        ))}
      </div>
    </div>
  );
}
