import Link from "next/link";
import { formatPrice, priceFor, productName } from "@/lib/products";
import { divisionName, type Team } from "@/lib/teams";
import Tee from "./Tee";

export default function ProductCard({ team }: { team: Team }) {
  return (
    <Link href={`/shirt/${team.slug}`} className="card">
      <div className="card-img">
        <Tee team={team} sizes="(max-width: 700px) 50vw, (max-width: 1000px) 33vw, 300px" />
      </div>
      <div className="card-body">
        <span className="card-league">{divisionName(team.division)}</span>
        <span className="card-title">{productName(team)}</span>
        <span className="card-price">{formatPrice(priceFor("M"))}</span>
      </div>
    </Link>
  );
}
