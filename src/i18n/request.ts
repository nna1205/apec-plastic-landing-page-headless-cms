import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';
import { type SiteLocale } from "@/graphql/types/graphql";
 
export default getRequestConfig(async ({requestLocale}) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale as SiteLocale;
 
  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as SiteLocale)) {
    locale = routing.defaultLocale as SiteLocale;
  }
 
  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});