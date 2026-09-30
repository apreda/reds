import Image from "next/image";
import { mockupPath } from "@/lib/products";
import type { Team } from "@/lib/teams";

// Photo mockup of the shirt. It fills its parent, which must be
// position: relative with a fixed aspect ratio.
export default function Tee({ team, sizes, eager }: { team: Team; sizes: string; eager?: boolean }) {
  return (
    <Image
      src={mockupPath(team)}
      alt={`${team.shirt} t-shirt printed with SELL and ${team.city}`}
      fill
      sizes={sizes}
      className="tee"
      {...(eager ? { loading: "eager", fetchPriority: "high" } : {})}
    />
  );
}
