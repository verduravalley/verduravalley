import { getTranslations, setRequestLocale } from "next-intl/server";
import { SITE_URL } from "@/app/[locale]/layout";
import SustainabilityGovernanceClient from "@/components/marketing/sustainability/SustainabilityGovernanceClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "sustainabilityPage" });
  return {
    title: `${t("title")} | Verdura Valley`,
    description: t("heroDesc"),
    alternates: {
      canonical: `${SITE_URL}/${locale}/services/sustainability-governance`,
    },
  };
}

export default async function SustainabilityGovernancePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <SustainabilityGovernanceClient />;
}
