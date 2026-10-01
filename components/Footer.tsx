import Link from "next/link";
import { LEAGUES } from "@/lib/teams";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <div className="logo" style={{ textAlign: "left" }}>
              Sell My Team
            </div>
            <p style={{ color: "#555", fontSize: 14, maxWidth: 300, marginTop: 14 }}>
              Protest tees for fans whose owners stopped listening. Printed to order, one shirt at a time.
            </p>
          </div>
          <div>
            <h4>Shop</h4>
            <ul>
              {LEAGUES.map((l) => (
                <li key={l.id}>
                  <Link href={`/shop?league=${l.id}`}>{l.sport}</Link>
                </li>
              ))}
              <li><Link href="/shop?style=hoodie">Hoodies</Link></li>
            </ul>
          </div>
          <div>
            <h4>About</h4>
            <ul>
              <li><Link href="/story">The Oakland Story</Link></li>
              <li><Link href="/faq">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h4>Help</h4>
            <ul>
              <li><Link href="/faq#shipping">Shipping</Link></li>
              <li><Link href="/faq#sizing">Sizing</Link></li>
              <li><Link href="/faq#returns">Returns</Link></li>
              <li><Link href="/privacy">Privacy Policy</Link></li>
              <li><Link href="/terms">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <p className="fine">
          Sell My Team is an independent fan project. We are not affiliated with, licensed, sponsored or endorsed by
          Major League Baseball, the National Basketball Association, the National Football League, any club, or any owner. Our shirts carry no team names or logos, only the word
          SELL. &copy; {new Date().getFullYear()} Sell My Team.
        </p>
      </div>
    </footer>
  );
}
