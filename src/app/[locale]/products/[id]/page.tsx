import { request } from "@/lib/datocms";
import {
  ProductStaticParamsDocument,
  ProductDocument,
  type SiteLocale,
  type ProductRecord,
} from "@/graphql/types/graphql";
import { notFound } from "next/navigation";
import ProductContainer from "@/components/Product";
import ProductContactForm from "@/components/Product/ProductContactForm";
import ProductRelated from "@/components/Product/ProductRelated";
import ProductPolicySection from "@/components/Sections/ProductPolicySectionRecord/ProductPolicySection";
import { getFallbackLocale } from "@/i18n/setting";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const { allProducts } = await request(ProductStaticParamsDocument, {});
  return allProducts.map((product) => ({ id: product.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: ProductRecord["id"]; locale: SiteLocale }>;
}): Promise<Metadata> {
  const { id, locale } = await params;
  const fallbackLocale = await getFallbackLocale();
  const productData = await request(ProductDocument, {
    id: id,
    locale: locale,
    fallbackLocale: [fallbackLocale],
  });

  if (!productData) {
    return notFound();
  }

  return {
    title: productData.product?.title,
    description: productData.product?.description,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: ProductRecord["id"]; locale: SiteLocale }>;
}) {
  const { id, locale } = await params;
  const fallbackLocale = await getFallbackLocale();
  const productData = await request(ProductDocument, {
    id: id,
    locale: locale,
    fallbackLocale: [fallbackLocale],
  });

  if (!productData) {
    notFound();
  }
  return (
    <div className="w-screen min-h-screen px-4 py-10 my-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="w-full flex flex-col justify-center items-start gap-6">
        <ProductContainer data={productData.product} />
        <ProductPolicySection locale={locale} fallbackLocale={fallbackLocale} />
        <section
          id="contact-form"
          className="relative w-full my-9 scroll-mt-40"
        >
          <div className="flex gap-6 justify-center py-9 w-full flex-col lg:flex-row lg:gap-10 before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-screen before:-z-10 before:h-full before:bg-slate-100">
            <span className="w-full text-black font-black text-2xl lg:line-clamp-4 lg:w-1/2 lg:text-5xl lg:leading-[64px]">
              ĐỂ LẠI THÔNG TIN LIÊN LẠC CỦA BẠN ĐỂ NHỰA APEC CÓ THỂ TƯ VẤN KĨ
              HƠN VỀ SẢN PHẨM
            </span>
            <ProductContactForm data={productData.product} />
          </div>
        </section>
        <ProductRelated
          productCategory={productData.product?.productCategory.title}
          locale={locale}
          fallbackLocale={fallbackLocale}
        />
      </main>
    </div>
  );
}
