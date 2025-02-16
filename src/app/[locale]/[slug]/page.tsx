import { request } from "@/app/lib/datocms";
import {
  PageStaticParamsDocument,
  PageDocument,
  type SiteLocale,
} from "@/app/graphql/types/graphql";
import { notFound } from "next/navigation";
import HeroSection from "@/app/components/Sections/HeroSectionRecord/HeroSection/index";
import TestimonialSection from "@/app/components/Sections/TestimonialSectionRecord/TestimonialSection/index";
import ServiceSection from "@/app/components/Sections/ServiceSectionRecord/ServiceSection/index";
import FeaturedProductSection from "@/app/components/Sections/FeaturedProductSectionRecord/FeaturedProductSection/index";
import { toNextMetadata } from "@/app/utils/SEO";
import { routing } from "@/i18n/routing";
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
    fallbackLocale: [fallbackLocale as SiteLocale],
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
  const pageData = await request(PageDocument, { slug: slug, locale: locale });

  if (!pageData || !routing.locales.includes(locale as SiteLocale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);
  return (
    <div className="overflow-x-hidden min-h-screen py-10 my-20 gap-8 px-4 lg:p-20 font-[family-name:var(--font-geist-sans)]">
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
