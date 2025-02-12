import { useState, useEffect } from "react";
import { request } from "@/lib/datocms"
import { SuggestionDocument, SuggestionQuery, type SiteLocale } from "@/graphql/types/graphql"
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
      const data = await request(SuggestionDocument, {
        query: query.trim().toLowerCase(),
        locale: locale,
        fallbackLocale: [fallbackLocale],
      });
      setSuggestions(data.allProducts.slice(0, 2));
      setAutoComplete(data.allProducts.map((product) => product.title));
      setLoading(false);
    } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }
    
    fetchSuggestions();
  }, [query]);

  return { suggestions, autoComplete, loading };
}
