"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import getAvailableLocales, { getFallbackLocale } from "@/i18n/setting";
import { type SiteLocale } from "@/graphql/types/graphql";
import * as motion from "motion/react-client";
import { AnimatePresence } from "motion/react";
import { Globe, ChevronDown, Check } from "lucide-react";
import i18n from "@/i18n";
import { useTranslation } from "react-i18next";

export default function LocaleSelector() {
  const { t } = useTranslation();
  const [locales, setLocales] = useState<SiteLocale[]>([]);
  const [selectedLocale, setSelectedLocale] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    async function fetchLocales() {
      const availableLocales = await getAvailableLocales();
      const savedLocale = localStorage.getItem("selectedLocale");
      const fallbackLocale = savedLocale || (await getFallbackLocale());
      setLocales(availableLocales);
      setSelectedLocale(fallbackLocale);
      i18n.changeLanguage(fallbackLocale);
    }
    fetchLocales();
  }, []);

  const handleSelect = (locale: SiteLocale) => {
    setSelectedLocale(locale);
    localStorage.setItem("selectedLocale", locale);
    i18n.changeLanguage(locale);

    // Extract current path without the locale part
    const pathSegments = pathname.split("/").filter(Boolean);
    pathSegments[0] = locale; // Replace the first segment with the selected locale
    router.push(`/${pathSegments.join("/")}`);

    setIsOpen(false);
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
            transition={{ duration: 0.1 }}
            className="absolute right-0 top-8 mt-2 w-full min-w-[124px] bg-white text-right text-black rounded-lg border border-gray-300 ring-1 ring-black ring-opacity-5
        focus:outline-none"
          >
            <p className="text-xs opacity-30 px-3 pt-1 w-full truncate">
              {t("search_language")}
            </p>
            {locales.map((locale) => (
              <li
                key={locale}
                onClick={() => handleSelect(locale)}
                className="flex justify-center items-center pl-2 pr-3 py-1 hover:bg-gray-200 cursor-pointer"
              >
                {selectedLocale === locale && (
                  <Check size={24} className="opacity-80 mr-2" />
                )}
                {getLocaleName(locale)}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setIsOpen(false)}
        className="flex items-center gap-2 bg-white text-black rounded-md focus:outline-none"
      >
        <Globe size={20} className="opacity-60" />
        {selectedLocale.toUpperCase()}
        <ChevronDown className="w-4 h-4" />
      </button>
    </div>
  );
}
