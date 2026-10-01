import type { Metadata } from "next";
import ProductPage, { productMetadata } from "@/components/ProductPage";
import { TEAMS } from "@/lib/teams";

// Short links to share, named by city: sellmyteam.com/cincinnati. Same page as
// /shirt/<slug>, with that team's color on the link preview.
type Props = { params: Promise<{ team: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return TEAMS.map((t) => ({ team: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).team;
  return { ...(await productMetadata(slug, "tee")), alternates: { canonical: `/shirt/${slug}` } };
}

export default async function ShortLink({ params }: Props) {
  return <ProductPage slug={(await params).team} style="tee" />;
}
