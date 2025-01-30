import { LocalesDocument, type SiteLocale } from '@/graphql/types/graphql';
import { request } from '@/lib/datocms';

export default async function getAvailableLocales() {
  const { _site } = await request(LocalesDocument);
  const result = _site.locales;

  return result;
}

export async function getFallbackLocale() {
  const locales = await getAvailableLocales();
  return locales[0]; //using the first ordered locale as fallback
}