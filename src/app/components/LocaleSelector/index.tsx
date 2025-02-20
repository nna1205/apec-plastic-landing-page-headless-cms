"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { routing, useRouter, usePathname } from "@/../i18n/routing";
import { type SiteLocale } from "@/graphql/types/graphql";
import { motion } from "motion/react";
import { AnimatePresence } from "motion/react";
import { Globe, ChevronDown, Check } from "lucide-react";

export default function LocaleSelector() {
  const t = useTranslations();
  const locale = useLocale() as SiteLocale;
  const router = useRouter();
  const pathname = usePathname();

  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const savedLocale = localStorage.getItem(
      "selectedLocale"
    ) as SiteLocale | null;
    if (savedLocale && savedLocale !== locale) {
      handleLocaleChange(savedLocale);
    }
  });

  const handleLocaleChange = (nextLocale: SiteLocale) => {
    localStorage.setItem("selectedLocale", nextLocale);
    startTransition(() => {
      router.replace({ pathname }, { locale: nextLocale });
    });
  };

  const getLocaleName = (locale: string) => {
    return (
      new Intl.DisplayNames(["en"], { type: "language" }).of(locale) || locale
    );
  };

  useEffect(() => {
    // Add scroll listener to close the dropdown when scrolling
    window.addEventListener("scroll", () => setIsOpen(false));

    return () => {
      window.removeEventListener("scroll", () => setIsOpen(false));
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="relative inline-block border border-gray-300 gap-2 px-3 py-1 rounded-lg"
    >
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 top-8 mt-2 w-full min-w-[124px] bg-white text-black rounded-lg border border-gray-300 ring-1 ring-black ring-opacity-5 py-1"
          >
            <label className="text-xs opacity-30 px-3 truncate">
              {t("select_language")}
            </label>
            {routing.locales.map((cur) => (
              <li
                key={cur}
                onClick={() => handleLocaleChange(cur as SiteLocale)}
              >
                <button
                  disabled={isPending}
                  className="flex justify-start items-center px-3 hover:bg-gray-200 cursor-pointer"
                >
                  <span className="text-sm">{getLocaleName(cur)}</span>
                  {locale === cur && (
                    <Check size={16} className="opacity-80 ml-1" />
                  )}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        // onBlur={() => setIsOpen(false)}
        className="flex items-center gap-2 bg-white text-black rounded-md focus:outline-none"
      >
        <Globe size={20} className="opacity-60" />
        {locale.toUpperCase()}
        <ChevronDown className="w-4 h-4" />
      </button>
    </div>
  );
}
