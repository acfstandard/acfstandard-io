import { redirect } from "@/i18n/navigation";

// The Sovereignty Index benchmark is not published: no score is collected
// anywhere, so the page redirects to the ACF Sovereignty Score™ overview.
export default async function SovereigntyIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect({ href: "/sovereignty-score", locale });
}
