"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import { Facebook, Share, ClipboardCopy } from "lucide-react";
import { ProductQuery, SiteLocale } from "@/graphql/types/graphql";
import { useTranslations, useLocale } from "next-intl";

const ProductShare: React.FC<{ data: ProductQuery["product"] }> = ({
  data,
}) => {
  const locale = useLocale() as SiteLocale;
  const productUrl = `${
    process.env.NEXT_PUBLIC_SITE_URL || "http://apecplastic.vercel.app"
  }/${locale}/products/${data!.id}`;

  const [supportsWebShare, setSupportsWebShare] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    setSupportsWebShare(!!navigator.share);
  }, []);

  const handleFacebookShare = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      productUrl
    )}`;
    window.open(facebookUrl, "_blank");
  };

  const handleWebShare = async () => {
    const shareContent = `✨${data!.title} | ${t(
      "page_title.product_detail"
    )}\n${data!.description}\n${t(
      "share_content.more_detail"
    )}: ${productUrl}\n${t("share_content.contact_us")}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${data!.title} | ${t("page_title.product_detail")}`,
          text: shareContent,
          url: productUrl,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      alert("Web Share API is not supported in your browser.");
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(productUrl).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 5000);
    });
  };

  const t = useTranslations();

  return (
    <>
      {/* Open Graph and Meta Tags */}
      <Head>
        <title>{data!.title}</title>
        <meta
          name="description"
          content={
            data!.description && data!.description.trim() !== ""
              ? data!.description
              : "No description"
          }
        />
        <meta property="og:title" content={data!.title} />
        <meta
          property="og:description"
          content={
            data!.description && data!.description.trim() !== ""
              ? data!.description
              : "No description"
          }
        />
        <meta
          property="og:image"
          content={data!.productImages[0].responsiveImage?.src}
        />
        <meta property="og:url" content={productUrl} />
        <meta property="og:type" content="product" />
        <meta property="og:site_name" content={t("page_title.company_name")} />
      </Head>

      <div className="mr-auto flex justify-center items-center gap-3">
        <span className="">{`${t("product.share")}:`}</span>
        {supportsWebShare ? (
          <>
            {/* Facebook Share */}
            <button
              type="button"
              aria-label="Share on Facebook"
              onClick={handleFacebookShare}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              <Facebook className="w-4 h-4 lg:w-6 lg:h-6" />
            </button>

            {/* Web Share API */}
            <button
              type="button"
              aria-label="Share on social media"
              onClick={handleWebShare}
              className="bg-slate-300 w-min flex justify-center items-center text-sm gap-2 px-3 py-2 rounded lg:text-base lg:px-4"
            >
              {t("product.send")}
              <Share className="w-4 h-4 lg:w-5 lg:h-5" />
            </button>
          </>
        ) : (
          <button
            type="button"
            aria-label="Copy link"
            onClick={handleCopyLink}
            className="bg-slate-300  flex justify-center items-center gap-2 px-4 py-2 rounded"
          >
            {copySuccess ? "Đã copy" : "Copy liên kết"}
            <ClipboardCopy size={24} color={copySuccess ? "green" : "black"} />
          </button>
        )}
      </div>
    </>
  );
};

export default ProductShare;
