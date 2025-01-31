"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import getAvailableLocales, { getFallbackLocale } from "@/i18n/setting";
import { type SiteLocale } from "@/graphql/types/graphql";
import { Globe } from "lucide-react";

export default function LocaleSelector() {
  const [locales, setLocales] = useState<SiteLocale[]>([]);
  const [selectedLocale, setSelectedLocale] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    async function fetchLocales() {
      const availableLocales = await getAvailableLocales();
      const savedLocale = localStorage.getItem("selectedLocale");
      const fallbackLocale = savedLocale || (await getFallbackLocale());
      setLocales(availableLocales);
      setSelectedLocale(fallbackLocale);
    }
    fetchLocales();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = event.target.value;
    setSelectedLocale(newLocale);
    localStorage.setItem("selectedLocale", newLocale);

    // Extract current path without the locale part
    const pathSegments = pathname.split("/").filter(Boolean);
    pathSegments[0] = newLocale; // Replace the first segment with the selected locale

    router.push(`/${pathSegments.join("/")}`);
  };

  return (
    <div className="flex justify-center items-center gap-2 border border-slate-300 rounded-md px-3 py-1">
      <Globe size={24} className="opacity-60" />
      <select value={selectedLocale} onChange={handleChange}>
        {locales.map((locale) => (
          <option key={locale} value={locale}>
            {locale.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
}
