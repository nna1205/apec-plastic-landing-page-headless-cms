"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import { Facebook, Share, ClipboardCopy } from "lucide-react";
import { ProductQuery } from "@/graphql/types/graphql";
import { useTranslations } from "next-intl";

const ProductShare: React.FC<{ data: ProductQuery["product"] }> = ({
  data,
}) => {
  const productUrl = `${
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  }/products/${data!.id}`;

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
    if (navigator.share) {
      try {
        await navigator.share({
          title: data!.title,
          text:
            data!.description && data!.description.trim() !== ""
              ? data!.description
              : "No description",
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

  const t = useTranslations("product");

  return (
    <>
      {/* Open Graph and Meta Tags */}
      <Head>
        <title>{data!.title}</title>
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
      </Head>

      <div className="mr-auto flex justify-center items-center gap-3">
        <span className="">{`${t("share")}:`}</span>
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
              {t("send")}
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
