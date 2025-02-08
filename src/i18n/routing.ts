import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';
import { SiteLocale } from '@/graphql/types/graphql';
 
export const routing = defineRouting({
  // A list of all locales that are supported
  locales: Object.values(SiteLocale),
 
  // Used when no locale matches
  defaultLocale: SiteLocale.Vi,
});
 
// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);