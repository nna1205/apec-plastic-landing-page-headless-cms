import { request } from "@/lib/datocms";
import {
  PageStaticParamsDocument,
  PageDocument,
  type SiteLocale,
} from "@/graphql/types/graphql";
import { notFound } from "next/navigation";
import Content from "./Content";
import { toNextMetadata } from "@/utils/SEO";
import { routing } from "@/../i18n/routing";
import { setRequestLocale, getTranslations } from "next-intl/server";

export async function generateStaticParams() {
  const locales = routing.locales;

  const { allPages } = await request(PageStaticParamsDocument, {});

  return allPages.flatMap((page) =>
    locales.map((locale) => ({
      locale,
      slug: page.slug,
    }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: SiteLocale }>;
}) {
  const { slug, locale } = await params;
  const fallbackLocale = routing.defaultLocale;
  const t = await getTranslations("page_title");
  const pageData = await request(PageDocument, {
    slug: slug,
    locale: locale,
    fallbackLocale: [fallbackLocale],
  });

  if (!pageData.page) {
    notFound();
  }

  const metadata = toNextMetadata(pageData.page?._seoMetaTags || []);
  return {
    ...metadata,
    title: `${pageData.page?.title} | ${t("company_name")}`,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string; locale: SiteLocale }>;
}) {
  const { slug, locale } = await params;
  // Enable static rendering
  setRequestLocale(locale);
  const pageData = await request(PageDocument, { slug: slug, locale: locale });

  return <Content data={pageData} locale={locale} />;
}
