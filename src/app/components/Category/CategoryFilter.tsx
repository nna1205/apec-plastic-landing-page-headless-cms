"use client";

import { ProductsQuery } from "@/app/graphql/types/graphql";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

type CategoryFilterProps = ProductsQuery["allProducts"][0]["productCategory"];

const CategoryFilter: React.FC<{ data: CategoryFilterProps[] }> = ({
  data,
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const t = useTranslations("product");

  // Local state to track selected category for instant UI update
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Sync local state with URL params on first load or when search params change
  useEffect(() => {
    const categoryFromParams =
      searchParams?.get("type") === "category" ? searchParams.get("value") : "";
    setSelectedCategory(categoryFromParams || null);
  }, [searchParams]);

  const handleCategoryChange = (category: string) => {
    // Optimistic UI: Update state instantly
    setSelectedCategory(category || null);

    const params = new URLSearchParams(searchParams);
    if (category.trim()) {
      params.set("type", "category");
      params.set("value", category);
    } else {
      params.delete("type");
      params.delete("value");
    }

    // Update URL without full reload
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <motion.ul
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15 }}
      className="z-10 w-full lg:w-1/5 flex lg:flex-col justify-start lg:gap-9 text-xs lg:text-xl"
    >
      <li>
        <button
          className={`relative w-max lg:w-full flex items-center text-start hover:font-bold p-3 rounded-lg box-border ${
            selectedCategory === null && "text-white font-bold"
          }`}
          onClick={() => handleCategoryChange("")}
        >
          {t("filter_label")}
          {selectedCategory === null && (
            <motion.div
              layoutId="category-highlight"
              className="absolute inset-0 bg-green-400 rounded-lg -z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </button>
      </li>
      {data.map((category) => (
        <li key={category.id}>
          <button
            className={`relative w-max lg:w-full flex items-center text-start hover:font-bold p-3 rounded-lg box-border ${
              selectedCategory === category.url && "text-white font-bold"
            }`}
            onClick={() => handleCategoryChange(category.url)}
          >
            {category.title}
            {selectedCategory === category.url && (
              <motion.div
                layoutId="category-highlight"
                className="absolute inset-0 bg-green-400 rounded-lg -z-10 text-white font-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </button>
        </li>
      ))}
    </motion.ul>
  );
};

export default CategoryFilter;
