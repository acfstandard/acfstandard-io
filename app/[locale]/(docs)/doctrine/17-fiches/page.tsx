import { redirect } from "@/i18n/navigation";

// Former URL of the card list (17 cards); the toolkit now has 45.
export default async function LegacyFichesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect({ href: "/doctrine/fiches", locale });
}
