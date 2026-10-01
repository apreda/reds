import ProductPage, { productMetadata } from "@/components/ProductPage";
import { TEAMS } from "@/lib/teams";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return TEAMS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props) {
  return productMetadata((await params).slug, "city");
}

export default async function CityTeePage({ params }: Props) {
  return <ProductPage slug={(await params).slug} style="city" />;
}
