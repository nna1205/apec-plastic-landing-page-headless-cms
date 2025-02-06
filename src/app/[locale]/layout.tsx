import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { request } from "@/lib/datocms";
import { LayoutDocument, type SiteLocale } from "@/graphql/types/graphql";
import { getFallbackLocale } from "@/i18n/setting";

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: SiteLocale }>;
}>) {
  const { locale } = await params;
  const fallbackLocale = await getFallbackLocale();
  const data = await request(LayoutDocument, {
    locale: locale,
    fallbackLocale: [fallbackLocale],
  });
  return (
    <>
      <Header data={data} />
      {children}
      <Footer data={data} />
    </>
  );
}
