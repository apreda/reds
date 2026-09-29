import Link from "next/link";
import { formatPrice, priceFor } from "@/lib/products";
import { fanLabel, leagueName, type Team } from "@/lib/teams";
import Tee from "./Tee";

export default function ProductCard({ team }: { team: Team }) {
  return (
    <Link href={`/shirt/${team.slug}`} className="card">
      <div className="card-img">
        <Tee team={team} />
      </div>
      <div className="card-body">
        <span className="card-league">{leagueName(team.league)}</span>
        <span className="card-title">SELL Tee — {team.city}</span>
        <span className="card-sub">For {fanLabel(team)} fans</span>
        <span className="card-price">{formatPrice(priceFor("M"))}</span>
      </div>
    </Link>
  );
}
