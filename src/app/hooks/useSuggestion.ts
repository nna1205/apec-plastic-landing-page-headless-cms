import { useState, useEffect } from "react";
import { getSuggestions } from "@/actions/getSuggestions";
import { SuggestionQuery, type SiteLocale } from "@/graphql/types/graphql"
import { routing } from "@/../i18n/routing";
import { useLocale } from "next-intl";

export function useSearchSuggestions(query: string) {
  const [suggestions, setSuggestions] = useState<SuggestionQuery["allProducts"]>([]);
  const [autoComplete, setAutoComplete] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const locale = useLocale() as SiteLocale;
  const fallbackLocale = routing.defaultLocale;

  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      setLoading(true);
      try {
      const data = await getSuggestions(query, locale)
      setSuggestions(data);
      setAutoComplete(data.map((product) => product.title));
      setLoading(false);
    } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }
    
    fetchSuggestions();
  }, [query, locale, fallbackLocale]);

  return { suggestions, autoComplete, loading };
}
