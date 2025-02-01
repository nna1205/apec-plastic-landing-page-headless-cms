/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "query Page($slug: String, $locale: SiteLocale, $fallbackLocale: [SiteLocale!]) {\n  page(\n    filter: {slug: {eq: $slug}}\n    locale: $locale\n    fallbackLocales: $fallbackLocale\n  ) {\n    _seoMetaTags {\n      attributes\n      content\n      tag\n    }\n    sections {\n      __typename\n      ... on HeroSectionRecord {\n        ...HeroSection\n      }\n      ... on TestimonialSectionRecord {\n        ...TestimonialSection\n      }\n      ... on ServicesSectionRecord {\n        ...ServiceSection\n      }\n      ... on FeaturedProductSectionRecord {\n        ...FeaturedProductSection\n      }\n    }\n  }\n}": types.PageDocument,
    "query PageStaticParams {\n  allPages {\n    slug\n  }\n}": types.PageStaticParamsDocument,
    "query Product($slug: String, $locale: SiteLocale, $fallbackLocale: [SiteLocale!]) {\n  product(\n    filter: {url: {eq: $slug}, title: {isBlank: \"false\"}}\n    locale: $locale\n    fallbackLocales: $fallbackLocale\n  ) {\n    id\n    title\n    url\n    description\n    material\n    variant\n    weight\n    packaging\n    retailPrice\n    dimension {\n      width\n      height\n      length\n    }\n    productImages {\n      id\n      responsiveImage {\n        src\n        srcSet\n        title\n        alt\n        width\n        height\n      }\n    }\n    productCategory {\n      id\n      title\n    }\n  }\n}": types.ProductDocument,
    "query ProductStaticParams {\n  allProducts {\n    url\n  }\n}": types.ProductStaticParamsDocument,
    "query Products($locale: SiteLocale, $fallbackLocale: [SiteLocale!]) {\n  allProducts(locale: $locale, fallbackLocales: $fallbackLocale) {\n    id\n    title\n    url\n    productCategory {\n      id\n      title\n      url\n    }\n    productImages {\n      id\n      title\n      url\n    }\n  }\n}": types.ProductsDocument,
    "fragment DatoImage on ResponsiveImage {\n  src\n  srcSet\n  base64\n  width\n  height\n  alt\n  title\n}": types.DatoImageFragmentDoc,
    "fragment FeaturedProductSection on FeaturedProductSectionRecord {\n  sectionHeader {\n    id\n    title\n    subtitle\n  }\n  featuredProductsList {\n    id\n    category {\n      id\n      title\n      url\n      description\n    }\n    categoryIcon\n    highlightCategory\n    featuredProducts {\n      id\n      title\n      url\n      productCategory {\n        title\n      }\n      productImages {\n        id\n        responsiveImage {\n          ...DatoImage\n        }\n      }\n    }\n  }\n}": types.FeaturedProductSectionFragmentDoc,
    "fragment HeroSection on HeroSectionRecord {\n  sectionHeader {\n    id\n    title\n    subtitle\n  }\n  callToActions {\n    id\n    label\n    slug\n    variant\n  }\n  image {\n    id\n    responsiveImage {\n      ...DatoImage\n    }\n  }\n}": types.HeroSectionFragmentDoc,
    "query ProductPolicySection($locale: SiteLocale, $fallbackLocale: [SiteLocale!]) {\n  productPolicy(locale: $locale, fallbackLocales: $fallbackLocale) {\n    id\n    content(locale: $locale, fallbackLocales: $fallbackLocale, markdown: false)\n  }\n}": types.ProductPolicySectionDocument,
    "fragment ServiceSection on ServicesSectionRecord {\n  sectionHeader {\n    id\n    title\n    subtitle\n  }\n  services {\n    id\n    label\n    description\n    icon\n    highlight\n  }\n  callToActions {\n    id\n    label\n    slug\n    variant\n  }\n  image {\n    id\n    responsiveImage {\n      ...DatoImage\n    }\n  }\n}": types.ServiceSectionFragmentDoc,
    "fragment TestimonialSection on TestimonialSectionRecord {\n  sectionHeader {\n    id\n    subtitle\n    title\n  }\n  customerFeedback {\n    id\n    variant\n    customerName\n    customerLocation\n    content\n    image {\n      id\n      responsiveImage {\n        ...DatoImage\n      }\n    }\n  }\n}": types.TestimonialSectionFragmentDoc,
    "query Locales {\n  _site {\n    locales\n  }\n}": types.LocalesDocument,
    "query Layout {\n  layout {\n    logo {\n      id\n      url\n      width\n      height\n    }\n    companyName\n    companyFullname\n    navigation {\n      page {\n        id\n        title\n        slug\n      }\n    }\n    contacts {\n      id\n      label\n      value\n      icon\n    }\n    socialContacts {\n      id\n      label\n      url\n      icon\n    }\n    addresses {\n      id\n      label\n      addressDetail\n    }\n    footerImage {\n      id\n      url\n    }\n    copyrightStatement\n  }\n}": types.LayoutDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Page($slug: String, $locale: SiteLocale, $fallbackLocale: [SiteLocale!]) {\n  page(\n    filter: {slug: {eq: $slug}}\n    locale: $locale\n    fallbackLocales: $fallbackLocale\n  ) {\n    _seoMetaTags {\n      attributes\n      content\n      tag\n    }\n    sections {\n      __typename\n      ... on HeroSectionRecord {\n        ...HeroSection\n      }\n      ... on TestimonialSectionRecord {\n        ...TestimonialSection\n      }\n      ... on ServicesSectionRecord {\n        ...ServiceSection\n      }\n      ... on FeaturedProductSectionRecord {\n        ...FeaturedProductSection\n      }\n    }\n  }\n}"): (typeof documents)["query Page($slug: String, $locale: SiteLocale, $fallbackLocale: [SiteLocale!]) {\n  page(\n    filter: {slug: {eq: $slug}}\n    locale: $locale\n    fallbackLocales: $fallbackLocale\n  ) {\n    _seoMetaTags {\n      attributes\n      content\n      tag\n    }\n    sections {\n      __typename\n      ... on HeroSectionRecord {\n        ...HeroSection\n      }\n      ... on TestimonialSectionRecord {\n        ...TestimonialSection\n      }\n      ... on ServicesSectionRecord {\n        ...ServiceSection\n      }\n      ... on FeaturedProductSectionRecord {\n        ...FeaturedProductSection\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query PageStaticParams {\n  allPages {\n    slug\n  }\n}"): (typeof documents)["query PageStaticParams {\n  allPages {\n    slug\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Product($slug: String, $locale: SiteLocale, $fallbackLocale: [SiteLocale!]) {\n  product(\n    filter: {url: {eq: $slug}, title: {isBlank: \"false\"}}\n    locale: $locale\n    fallbackLocales: $fallbackLocale\n  ) {\n    id\n    title\n    url\n    description\n    material\n    variant\n    weight\n    packaging\n    retailPrice\n    dimension {\n      width\n      height\n      length\n    }\n    productImages {\n      id\n      responsiveImage {\n        src\n        srcSet\n        title\n        alt\n        width\n        height\n      }\n    }\n    productCategory {\n      id\n      title\n    }\n  }\n}"): (typeof documents)["query Product($slug: String, $locale: SiteLocale, $fallbackLocale: [SiteLocale!]) {\n  product(\n    filter: {url: {eq: $slug}, title: {isBlank: \"false\"}}\n    locale: $locale\n    fallbackLocales: $fallbackLocale\n  ) {\n    id\n    title\n    url\n    description\n    material\n    variant\n    weight\n    packaging\n    retailPrice\n    dimension {\n      width\n      height\n      length\n    }\n    productImages {\n      id\n      responsiveImage {\n        src\n        srcSet\n        title\n        alt\n        width\n        height\n      }\n    }\n    productCategory {\n      id\n      title\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductStaticParams {\n  allProducts {\n    url\n  }\n}"): (typeof documents)["query ProductStaticParams {\n  allProducts {\n    url\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Products($locale: SiteLocale, $fallbackLocale: [SiteLocale!]) {\n  allProducts(locale: $locale, fallbackLocales: $fallbackLocale) {\n    id\n    title\n    url\n    productCategory {\n      id\n      title\n      url\n    }\n    productImages {\n      id\n      title\n      url\n    }\n  }\n}"): (typeof documents)["query Products($locale: SiteLocale, $fallbackLocale: [SiteLocale!]) {\n  allProducts(locale: $locale, fallbackLocales: $fallbackLocale) {\n    id\n    title\n    url\n    productCategory {\n      id\n      title\n      url\n    }\n    productImages {\n      id\n      title\n      url\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment DatoImage on ResponsiveImage {\n  src\n  srcSet\n  base64\n  width\n  height\n  alt\n  title\n}"): (typeof documents)["fragment DatoImage on ResponsiveImage {\n  src\n  srcSet\n  base64\n  width\n  height\n  alt\n  title\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment FeaturedProductSection on FeaturedProductSectionRecord {\n  sectionHeader {\n    id\n    title\n    subtitle\n  }\n  featuredProductsList {\n    id\n    category {\n      id\n      title\n      url\n      description\n    }\n    categoryIcon\n    highlightCategory\n    featuredProducts {\n      id\n      title\n      url\n      productCategory {\n        title\n      }\n      productImages {\n        id\n        responsiveImage {\n          ...DatoImage\n        }\n      }\n    }\n  }\n}"): (typeof documents)["fragment FeaturedProductSection on FeaturedProductSectionRecord {\n  sectionHeader {\n    id\n    title\n    subtitle\n  }\n  featuredProductsList {\n    id\n    category {\n      id\n      title\n      url\n      description\n    }\n    categoryIcon\n    highlightCategory\n    featuredProducts {\n      id\n      title\n      url\n      productCategory {\n        title\n      }\n      productImages {\n        id\n        responsiveImage {\n          ...DatoImage\n        }\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment HeroSection on HeroSectionRecord {\n  sectionHeader {\n    id\n    title\n    subtitle\n  }\n  callToActions {\n    id\n    label\n    slug\n    variant\n  }\n  image {\n    id\n    responsiveImage {\n      ...DatoImage\n    }\n  }\n}"): (typeof documents)["fragment HeroSection on HeroSectionRecord {\n  sectionHeader {\n    id\n    title\n    subtitle\n  }\n  callToActions {\n    id\n    label\n    slug\n    variant\n  }\n  image {\n    id\n    responsiveImage {\n      ...DatoImage\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductPolicySection($locale: SiteLocale, $fallbackLocale: [SiteLocale!]) {\n  productPolicy(locale: $locale, fallbackLocales: $fallbackLocale) {\n    id\n    content(locale: $locale, fallbackLocales: $fallbackLocale, markdown: false)\n  }\n}"): (typeof documents)["query ProductPolicySection($locale: SiteLocale, $fallbackLocale: [SiteLocale!]) {\n  productPolicy(locale: $locale, fallbackLocales: $fallbackLocale) {\n    id\n    content(locale: $locale, fallbackLocales: $fallbackLocale, markdown: false)\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ServiceSection on ServicesSectionRecord {\n  sectionHeader {\n    id\n    title\n    subtitle\n  }\n  services {\n    id\n    label\n    description\n    icon\n    highlight\n  }\n  callToActions {\n    id\n    label\n    slug\n    variant\n  }\n  image {\n    id\n    responsiveImage {\n      ...DatoImage\n    }\n  }\n}"): (typeof documents)["fragment ServiceSection on ServicesSectionRecord {\n  sectionHeader {\n    id\n    title\n    subtitle\n  }\n  services {\n    id\n    label\n    description\n    icon\n    highlight\n  }\n  callToActions {\n    id\n    label\n    slug\n    variant\n  }\n  image {\n    id\n    responsiveImage {\n      ...DatoImage\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment TestimonialSection on TestimonialSectionRecord {\n  sectionHeader {\n    id\n    subtitle\n    title\n  }\n  customerFeedback {\n    id\n    variant\n    customerName\n    customerLocation\n    content\n    image {\n      id\n      responsiveImage {\n        ...DatoImage\n      }\n    }\n  }\n}"): (typeof documents)["fragment TestimonialSection on TestimonialSectionRecord {\n  sectionHeader {\n    id\n    subtitle\n    title\n  }\n  customerFeedback {\n    id\n    variant\n    customerName\n    customerLocation\n    content\n    image {\n      id\n      responsiveImage {\n        ...DatoImage\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Locales {\n  _site {\n    locales\n  }\n}"): (typeof documents)["query Locales {\n  _site {\n    locales\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Layout {\n  layout {\n    logo {\n      id\n      url\n      width\n      height\n    }\n    companyName\n    companyFullname\n    navigation {\n      page {\n        id\n        title\n        slug\n      }\n    }\n    contacts {\n      id\n      label\n      value\n      icon\n    }\n    socialContacts {\n      id\n      label\n      url\n      icon\n    }\n    addresses {\n      id\n      label\n      addressDetail\n    }\n    footerImage {\n      id\n      url\n    }\n    copyrightStatement\n  }\n}"): (typeof documents)["query Layout {\n  layout {\n    logo {\n      id\n      url\n      width\n      height\n    }\n    companyName\n    companyFullname\n    navigation {\n      page {\n        id\n        title\n        slug\n      }\n    }\n    contacts {\n      id\n      label\n      value\n      icon\n    }\n    socialContacts {\n      id\n      label\n      url\n      icon\n    }\n    addresses {\n      id\n      label\n      addressDetail\n    }\n    footerImage {\n      id\n      url\n    }\n    copyrightStatement\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;