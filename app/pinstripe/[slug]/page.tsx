import ProductPage, { productMetadata } from "@/components/ProductPage";
import { TEAMS } from "@/lib/teams";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return TEAMS.filter((t) => t.pinstripe).map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props) {
  return productMetadata((await params).slug, "pinstripe");
}

export default async function PinstripePage({ params }: Props) {
  return <ProductPage slug={(await params).slug} style="pinstripe" />;
}
