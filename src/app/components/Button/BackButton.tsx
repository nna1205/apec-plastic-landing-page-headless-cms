"use client";

import { useRouter } from "next/navigation";
import { memo } from "react";
import { useTranslations } from "next-intl";
import { ArrowLeft } from "lucide-react";

const BackButton: React.FC<{ className?: string }> = memo(({ className }) => {
  const router = useRouter();
  const t = useTranslations();

  return (
    <button
      type="button"
      aria-label={t("back_cta")}
      onClick={() => router.back()}
      className={`flex items-center gap-2 text-xs lg:text-base text-gray-600 hover:text-gray-900 ${className}`}
    >
      <ArrowLeft className="h-4 w-4" />
      {t("back_cta")}
    </button>
  );
});

BackButton.displayName = "BackButton";

export default BackButton;
