import Image from "next/image";
import { colorLabel, garment, mockupPath, type Style } from "@/lib/products";
import type { Team } from "@/lib/teams";

// Photo of the printed shirt or hoodie. It fills its parent, which must be
// position: relative with a fixed aspect ratio.
export default function ProductPhoto({
  team,
  style,
  sizes,
  eager,
}: {
  team: Team;
  style: Style;
  sizes: string;
  eager?: boolean;
}) {
  return (
    <Image
      src={mockupPath(team, style)}
      alt={`${colorLabel(team, style)} ${garment(style)} with SELL on the front`}
      fill
      sizes={sizes}
      className="photo"
      {...(eager ? { loading: "eager", fetchPriority: "high" } : {})}
    />
  );
}
