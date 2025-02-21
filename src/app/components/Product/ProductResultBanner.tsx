import { useTranslations } from "next-intl";
import { PackageX } from "lucide-react";

const ProductResultBanner: React.FC<{
  query: string;
  showNotFoundBanner: boolean;
}> = ({ query, showNotFoundBanner }) => {
  const t = useTranslations("search");

  return (
    <>
      {showNotFoundBanner ? (
        <div className="w-full flex justify-start items-center gap-3 text-center p-3 mb-3 border border-gray-400 bg-gray-200 rounded-xl">
          <PackageX size={24} />
          <div className="text-start">
            <h1 className="text-base">
              {t("result_empty_label")}{" "}
              <span className="font-bold text-green-800">
                &ldquo;{query}&rdquo;
              </span>
            </h1>
            <p className="text-xs opacity-60">
              {t("result_empty_description")}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex justify-start items-center text-xl text-slate-800 mb-3 gap-1">
          <h1>
            {t("result_label")}{" "}
            <span className="font-bold text-green-800">
              &ldquo;{query}&rdquo;
            </span>
          </h1>
        </div>
      )}
    </>
  );
};

export default ProductResultBanner;
