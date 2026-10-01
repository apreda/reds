import ProductPage, { productMetadata } from "@/components/ProductPage";
import { TEAMS } from "@/lib/teams";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return TEAMS.filter((t) => t.nepo).map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props) {
  return productMetadata((await params).slug, "nepo-jersey");
}

export default async function NepoPhilJerseyPage({ params }: Props) {
  return <ProductPage slug={(await params).slug} style="nepo-jersey" />;
}
