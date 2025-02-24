import { request } from "@/lib/datocms";
import {
  ProductStaticParamsDocument,
  ProductDocument,
  type SiteLocale,
  type ProductRecord,
} from "@/graphql/types/graphql";
import { notFound } from "next/navigation";
import ProductDetail from "@/components/Product";
import ProductImageCarousel from "@/components/Product/ProductImageCarousel";
import ProductPolicySection from "@/components/Sections/ProductPolicySectionRecord/ProductPolicySection";
import type { Metadata } from "next";
import { routing } from "@/../i18n/routing";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { cache } from "react";
import dynamic from "next/dynamic";

const ProductContactForm = dynamic(
  () => import("@/components/Product/ProductContactForm")
);

const ProductRelated = dynamic(
  () => import("@/components/Product/ProductRelated")
);

export async function generateStaticParams() {
  const locales = routing.locales;
  const { allProducts } = await request(ProductStaticParamsDocument, {});
  return allProducts.flatMap((product) =>
    locales.map((locale) => ({ locale, id: product.id }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: ProductRecord["id"]; locale: SiteLocale }>;
}): Promise<Metadata> {
  const { id, locale } = await params;
  const fallbackLocale = routing.defaultLocale;
  const t = await getTranslations("page_title");
  const productData = await request(ProductDocument, {
    id: id,
    locale: locale,
    fallbackLocale: [fallbackLocale],
  });

  if (!productData) {
    return notFound();
  }

  return {
    title: `${productData.product?.title} | ${t("company_name")}`,
    description: productData.product?.description,
  };
}

const fetchProduct = cache(
  async (
    id: ProductRecord["id"],
    locale: SiteLocale,
    fallbackLocale: SiteLocale
  ) => {
    const productData = await request(ProductDocument, {
      id: id,
      locale: locale,
      fallbackLocale: [fallbackLocale],
    });
    return productData.product;
  }
);

export default async function Page({
  params,
}: {
  params: Promise<{ id: ProductRecord["id"]; locale: SiteLocale }>;
}) {
  const { id, locale } = await params;
  const fallbackLocale = routing.defaultLocale;

  setRequestLocale(locale);
  const t = await getTranslations("product");

  const productData = await fetchProduct(id, locale, fallbackLocale);

  if (!productData || !routing.locales.includes(locale as SiteLocale)) {
    notFound();
  }
  return (
    <div className="overflow-x-hidden min-h-screen px-4 py-10 my-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="w-full flex flex-col justify-center items-start gap-6">
        <div className="w-full h-full flex flex-col justify-center gap-6 lg:gap-12 lg:flex-row">
          <ProductImageCarousel data={productData} />
          <ProductDetail data={productData} />
        </div>
        <ProductPolicySection locale={locale} fallbackLocale={fallbackLocale} />
        <section
          id="contact-form"
          className="relative w-full my-9 scroll-mt-40"
        >
          <div className="flex gap-6 justify-center py-9 w-full flex-col lg:flex-row lg:gap-10 before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-screen before:-z-10 before:h-full before:bg-slate-100">
            <span className="w-full text-black font-black text-2xl lg:line-clamp-4 lg:w-1/2 lg:text-5xl lg:leading-[64px]">
              {t("form_contact.section_title")}
            </span>
            <ProductContactForm data={productData} />
          </div>
        </section>
        <ProductRelated
          product={productData}
          locale={locale}
          fallbackLocale={fallbackLocale}
        />
      </main>
    </div>
  );
}
