import { redirect } from "next/navigation";
import { SiteLocale } from "@/graphql/types/graphql";

// This page only renders when the app is built statically (output: 'export')
export default async function Page({
  params,
}: {
  params: Promise<{ locale: SiteLocale }>;
}) {
  const { locale } = await params;

  redirect(`/${locale}/home`);
}
