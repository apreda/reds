import Link from "next/link";
import { formatPrice, priceFor, productPath, type Style } from "@/lib/products";
import { cityName, teamLabel, type Team } from "@/lib/teams";
import ProductPhoto from "./ProductPhoto";

export default function ProductCard({ team, style = "tee" }: { team: Team; style?: Style }) {
  return (
    <Link href={productPath(team, style)} className="card">
      <div className="card-img">
        <ProductPhoto team={team} style={style} sizes="(max-width: 700px) 50vw, (max-width: 1000px) 33vw, 300px" />
      </div>
      <div className="card-body">
        <span className="card-league">{teamLabel(team)}</span>
        <span className="card-title">{cityName(team)}</span>
        <span className="card-price">{formatPrice(priceFor(style, "M"))}</span>
      </div>
    </Link>
  );
}
