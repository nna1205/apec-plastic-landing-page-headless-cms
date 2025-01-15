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
    "query Page($slug: String) {\n  page(filter: {slug: {eq: $slug}}) {\n    _seoMetaTags {\n      attributes\n      content\n      tag\n    }\n    sections {\n      __typename\n      ... on HeroSectionRecord {\n        ...HeroSection\n      }\n      ... on TestimonialSectionRecord {\n        ...TestimonialSection\n      }\n      ... on ServicesSectionRecord {\n        ...ServiceSection\n      }\n    }\n  }\n}": types.PageDocument,
    "query PageStaticParams {\n  allPages {\n    slug\n  }\n}": types.PageStaticParamsDocument,
    "fragment DatoImage on ResponsiveImage {\n  src\n  srcSet\n  base64\n  width\n  height\n  alt\n  title\n}": types.DatoImageFragmentDoc,
    "fragment HeroSection on HeroSectionRecord {\n  sectionHeader {\n    id\n    title\n    subtitle\n  }\n  callToActions {\n    id\n    label\n    url\n    variant\n  }\n  image {\n    id\n    responsiveImage {\n      ...DatoImage\n    }\n  }\n}": types.HeroSectionFragmentDoc,
    "fragment ServiceSection on ServicesSectionRecord {\n  sectionHeader {\n    id\n    title\n    subtitle\n  }\n  services {\n    id\n    label\n    description\n    icon\n    highlight\n  }\n  callToActions {\n    id\n    label\n    url\n    variant\n  }\n  image {\n    id\n    responsiveImage {\n      ...DatoImage\n    }\n  }\n}": types.ServiceSectionFragmentDoc,
    "fragment TestimonialSection on TestimonialSectionRecord {\n  sectionHeader {\n    id\n    subtitle\n    title\n  }\n  customerFeedback {\n    id\n    variant\n    customerName\n    customerLocation\n    content\n    image {\n      id\n      responsiveImage {\n        ...DatoImage\n      }\n    }\n  }\n}": types.TestimonialSectionFragmentDoc,
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
export function graphql(source: "query Page($slug: String) {\n  page(filter: {slug: {eq: $slug}}) {\n    _seoMetaTags {\n      attributes\n      content\n      tag\n    }\n    sections {\n      __typename\n      ... on HeroSectionRecord {\n        ...HeroSection\n      }\n      ... on TestimonialSectionRecord {\n        ...TestimonialSection\n      }\n      ... on ServicesSectionRecord {\n        ...ServiceSection\n      }\n    }\n  }\n}"): (typeof documents)["query Page($slug: String) {\n  page(filter: {slug: {eq: $slug}}) {\n    _seoMetaTags {\n      attributes\n      content\n      tag\n    }\n    sections {\n      __typename\n      ... on HeroSectionRecord {\n        ...HeroSection\n      }\n      ... on TestimonialSectionRecord {\n        ...TestimonialSection\n      }\n      ... on ServicesSectionRecord {\n        ...ServiceSection\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query PageStaticParams {\n  allPages {\n    slug\n  }\n}"): (typeof documents)["query PageStaticParams {\n  allPages {\n    slug\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment DatoImage on ResponsiveImage {\n  src\n  srcSet\n  base64\n  width\n  height\n  alt\n  title\n}"): (typeof documents)["fragment DatoImage on ResponsiveImage {\n  src\n  srcSet\n  base64\n  width\n  height\n  alt\n  title\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment HeroSection on HeroSectionRecord {\n  sectionHeader {\n    id\n    title\n    subtitle\n  }\n  callToActions {\n    id\n    label\n    url\n    variant\n  }\n  image {\n    id\n    responsiveImage {\n      ...DatoImage\n    }\n  }\n}"): (typeof documents)["fragment HeroSection on HeroSectionRecord {\n  sectionHeader {\n    id\n    title\n    subtitle\n  }\n  callToActions {\n    id\n    label\n    url\n    variant\n  }\n  image {\n    id\n    responsiveImage {\n      ...DatoImage\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ServiceSection on ServicesSectionRecord {\n  sectionHeader {\n    id\n    title\n    subtitle\n  }\n  services {\n    id\n    label\n    description\n    icon\n    highlight\n  }\n  callToActions {\n    id\n    label\n    url\n    variant\n  }\n  image {\n    id\n    responsiveImage {\n      ...DatoImage\n    }\n  }\n}"): (typeof documents)["fragment ServiceSection on ServicesSectionRecord {\n  sectionHeader {\n    id\n    title\n    subtitle\n  }\n  services {\n    id\n    label\n    description\n    icon\n    highlight\n  }\n  callToActions {\n    id\n    label\n    url\n    variant\n  }\n  image {\n    id\n    responsiveImage {\n      ...DatoImage\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment TestimonialSection on TestimonialSectionRecord {\n  sectionHeader {\n    id\n    subtitle\n    title\n  }\n  customerFeedback {\n    id\n    variant\n    customerName\n    customerLocation\n    content\n    image {\n      id\n      responsiveImage {\n        ...DatoImage\n      }\n    }\n  }\n}"): (typeof documents)["fragment TestimonialSection on TestimonialSectionRecord {\n  sectionHeader {\n    id\n    subtitle\n    title\n  }\n  customerFeedback {\n    id\n    variant\n    customerName\n    customerLocation\n    content\n    image {\n      id\n      responsiveImage {\n        ...DatoImage\n      }\n    }\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;