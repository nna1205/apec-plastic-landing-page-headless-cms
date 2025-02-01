import { request } from "@/lib/datocms";
import {
  ProductPolicySectionDocument,
  type SiteLocale,
} from "@/graphql/types/graphql";
import ReactMarkdown from "react-markdown";

const ProductPolicySection: React.FC<{
  locale: SiteLocale;
  fallbackLocale: SiteLocale;
}> = async ({ locale, fallbackLocale }) => {
  const data = await request(ProductPolicySectionDocument, {
    locale: locale,
    fallbackLocale: fallbackLocale,
  });

  return (
    <section className="flex flex-col justify-start">
      <div className="mt-4">
        {/* Render Markdown content with Tailwind classes applied */}
        <ReactMarkdown
          children={data.productPolicy?.content || ""}
          components={{
            // Override <h1>, <h2>, etc.
            h1: ({ node, ...props }) => (
              <h1 className="text-2xl lg:text-4xl font-bold mb-4" {...props} />
            ),
            h2: ({ node, ...props }) => (
              <h2
                className="text-xl lg:text-3xl font-semibold mb-3"
                {...props}
              />
            ),
            p: ({ node, ...props }) => (
              <p className="text-base lg:text-lg mb-3" {...props} />
            ),
            ul: ({ node, ...props }) => (
              <ul
                className="list-disc pl-6 lg:pl-8 text-sm lg:text-xl"
                {...props}
              />
            ),
            li: ({ node, ...props }) => <li className="mb-2" {...props} />,
            strong: ({ node, ...props }) => (
              <strong className="font-bold text-black" {...props} />
            ),
            em: ({ node, ...props }) => (
              <em className="italic text-black" {...props} />
            ),
          }}
        />
      </div>
    </section>
  );
};

export default ProductPolicySection;
