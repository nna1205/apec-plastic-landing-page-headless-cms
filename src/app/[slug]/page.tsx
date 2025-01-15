import { request } from "@/lib/datocms";
import {
  PageStaticParamsDocument,
  PageDocument,
} from "@/graphql/types/graphql";
import { notFound } from "next/navigation";
import HeroSection from "@/components/sections/HeroSectionRecord/HeroSection";
import TestimonialSection from "@/components/sections/TestimonialSectionRecord/TestimonialSection";

export async function generateStaticParams() {
  const { allPages } = await request(PageStaticParamsDocument, {});
  return allPages.map((page) => ({ slug: page.slug }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const pageData = await request(PageDocument, { slug: slug });

  if (!pageData) {
    notFound();
  }
  return (
    <>
      {pageData.page?.sections.map((section) => {
        switch (section.__typename) {
          case "HeroSectionRecord":
            return <HeroSection fragment={section} key={section.__typename} />;
          case "TestimonialSectionRecord":
            return (
              <TestimonialSection fragment={section} key={section.__typename} />
            );
          default:
            return null;
        }
      })}
    </>
  );
}
