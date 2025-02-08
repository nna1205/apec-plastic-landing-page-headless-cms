import { useTranslations } from "next-intl";
import { Link } from "@/../i18n/routing";

export default function NotFoundPage() {
  const t = useTranslations("not_found");

  return (
    <div className="flex flex-col-reverse lg:flex-row items-center justify-center px-6 py-20 h-screen text-center">
      <div className="flex flex-col justify-start items-start text-start gap-1 lg:gap-3">
        <h1 className="text-green-800 text-[128px] leading-none font-black">
          404
        </h1>
        <span className="text-start text-2xl lg:text-5xl font-bold">
          {t("title")}
        </span>
        <p className="">{t("description")}</p>
        <Link
          href="/home"
          className="text-2xl px-6 py-2 mt-3 lg:mt-9 border-2 border-slate-300 text-green-800 rounded-xl"
        >
          {t("back_cta")}
        </Link>
      </div>
    </div>
  );
}
