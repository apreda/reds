import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <div className="logo" style={{ textAlign: "left" }}>
              Sell The Team
            </div>
            <p style={{ color: "#555", fontSize: 14, maxWidth: 300, marginTop: 14 }}>
              Protest tees for fans whose owners stopped listening. Printed to order, one shirt at a time.
            </p>
          </div>
          <div>
            <h4>Shop</h4>
            <ul>
              <li><Link href="/shop?league=mlb">Baseball</Link></li>
              <li><Link href="/shop?league=nfl">Football</Link></li>
              <li><Link href="/shop?league=nba">Basketball</Link></li>
              <li><Link href="/shop?league=nhl">Hockey</Link></li>
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
            </ul>
          </div>
        </div>
        <p className="fine">
          Sell The Team is an independent fan project. We are not affiliated with, licensed, sponsored or endorsed by
          MLB, the NFL, the NBA, the NHL, or any team or owner. Team names appear on this site only to help fans find
          their city&rsquo;s shirt; they are never printed on our products. &copy; {new Date().getFullYear()} Sell The Team.
        </p>
      </div>
    </footer>
  );
}
