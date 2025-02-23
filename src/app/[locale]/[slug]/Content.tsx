import { PageQuery, SiteLocale } from "@/graphql/types/graphql";
import { memo } from "react";
import { routing } from "@/../i18n/routing";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";

const HeroSection = dynamic(
  () => import("@/components/Sections/HeroSectionRecord/HeroSection")
);
const TestimonialSection = dynamic(
  () =>
    import("@/components/Sections/TestimonialSectionRecord/TestimonialSection")
);
const ServiceSection = dynamic(
  () => import("@/components/Sections/ServiceSectionRecord/ServiceSection")
);
const FeaturedProductSection = dynamic(
  () =>
    import(
      "@/components/Sections/FeaturedProductSectionRecord/FeaturedProductSection"
    )
);

const Content = memo(
  ({ data, locale }: { data: PageQuery; locale: SiteLocale }) => {
    const sections = data.page?.sections || [];

    if (!sections.length || !routing.locales.includes(locale as SiteLocale)) {
      notFound();
    }
    return (
      <div className="w-screen min-h-screen py-10 my-20 gap-8 px-4 lg:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-40 row-start-2 items-center sm:items-start">
          {sections.map((section) => {
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
);

Content.displayName = "Content";

export default Content;
