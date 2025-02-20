"use server";

import { SuggestionDocument, SuggestionQuery, SiteLocale } from "@/graphql/types/graphql";
import { request } from "@/lib/datocms";
import { routing } from "@/../i18n/routing";

export async function getSuggestions(query: string, locale: SiteLocale) {
    if (!query.trim()) return [];
    
    const maxSuggestions = 2;
    const fallbackLocale = routing.defaultLocale;
    const data: SuggestionQuery = await request(SuggestionDocument, {
        query: query.trim().toLowerCase(),
        locale: locale,
        fallbackLocale: [fallbackLocale],
    });

    return data.allProducts.slice(0, maxSuggestions);
}