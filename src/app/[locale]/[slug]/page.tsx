import { request } from "@/lib/datocms";
import {
  PageStaticParamsDocument,
  PageDocument,
  type SiteLocale,
} from "@/graphql/types/graphql";
import { notFound } from "next/navigation";
import HeroSection from "@/components/Sections/HeroSectionRecord/HeroSection";
import TestimonialSection from "@/components/Sections/TestimonialSectionRecord/TestimonialSection";
import ServiceSection from "@/components/Sections/ServiceSectionRecord/ServiceSection";
import FeaturedProductSection from "@/components/Sections/FeaturedProductSectionRecord/FeaturedProductSection";
import getAvailableLocales, { getFallbackLocale } from "@/i18n/setting";
import { toNextMetadata } from "@/utils/SEO";

export async function generateStaticParams() {
  const locales = await getAvailableLocales();

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
  const allLocales = await getAvailableLocales();
  const fallbackLocale = await getFallbackLocale();
  const pageData = await request(PageDocument, {
    slug: slug,
    locale: locale,
    fallbackLocale: [fallbackLocale],
  });

  if (!pageData || !allLocales.includes(locale)) {
    return notFound();
  }

  return toNextMetadata(pageData.page?._seoMetaTags || []);
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string; locale: SiteLocale }>;
}) {
  const { slug, locale } = await params;
  const allLocales = await getAvailableLocales();
  const pageData = await request(PageDocument, { slug: slug, locale: locale });

  if (!pageData || !allLocales.includes(locale)) {
    notFound();
  }
  return (
    <div className="w-screen min-h-screen py-10 my-20 gap-8 px-4 lg:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-40 row-start-2 items-center sm:items-start">
        {pageData.page?.sections.map((section) => {
          switch (section.__typename) {
            case "HeroSectionRecord":
              return (
                <HeroSection fragment={section} key={section.__typename} />
              );
            case "TestimonialSectionRecord":
              return (
                <TestimonialSection
                  fragment={section}
                  key={section.__typename}
                />
              );
            case "ServicesSectionRecord":
              return (
                <ServiceSection fragment={section} key={section.__typename} />
              );
            case "FeaturedProductSectionRecord":
              return (
                <FeaturedProductSection
                  fragment={section}
                  key={section.__typename}
                />
              );
            default:
              return null;
          }
        })}
      </main>
    </div>
  );
}
