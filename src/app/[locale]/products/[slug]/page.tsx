import { request } from "@/lib/datocms";
import {
  ProductStaticParamsDocument,
  ProductDocument,
  type SiteLocale,
} from "@/graphql/types/graphql";
import { notFound } from "next/navigation";
import ProductContainer from "@/components/Product";
import ProductContactForm from "@/components/Product/ProductContactForm";
import ProductRelated from "@/components/Product/ProductRelated";
import { getFallbackLocale } from "@/i18n/setting";

export async function generateStaticParams() {
  const { allProducts } = await request(ProductStaticParamsDocument, {});
  return allProducts.map((product) => ({ slug: product.url }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string; locale: SiteLocale }>;
}) {
  const { slug, locale } = await params;
  const fallbackLocale = await getFallbackLocale();
  const productData = await request(ProductDocument, {
    slug: slug,
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
        <section className="flex flex-col justify-start">
          <span className="text-xl lg:text-3xl font-black">
            NHỰA APEC CAM KẾT
          </span>
          <ul className="flex flex-col list-disc pl-3 lg:pl-6 text-sm lg:text-2xl">
            <li className="">Giao hàng trong thời gian ngắn nhất.</li>
            <li className="">
              Được đổi trả 1 đổi 1 hoàn toàn miễn phí nếu khi nhận sản phẩm bị
              VỠ – HỎNG – KHÔNG GIỐNG VỚI HÌNH ẢNH.
            </li>
            <li className="">
              Hỗ trợ giải quyết đơn hàng trong thời gian sớm nhất với phương án
              tốt nhất để khách hàng luôn cảm thấy hài lòng và yên tâm khi mua
              sắm.
            </li>
          </ul>
          <span className="text-xl lg:text-3xl font-black mt-3">
            Chúng tôi nhận gia công theo khuôn của khách hoặc ra khuôn khi đủ số
            lượng sản xuất tối thiểu. Hân hạnh được hợp tác cùng quý khách!
          </span>
        </section>
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
        />
      </main>
    </div>
  );
}
