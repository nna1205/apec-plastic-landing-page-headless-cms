"use client";

import { ProductsQuery } from "@/graphql/types/graphql";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState, useEffect, useMemo, memo } from "react";
import { motion } from "motion/react";

type CategoryFilterProps = ProductsQuery["allProducts"];

const CategoryFilter: React.FC<{ data: CategoryFilterProps }> = memo(
  ({ data }) => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const t = useTranslations("product");

    const uniqueCategories = useMemo(
      () => [
        // Manually add "All Products" filter
        { id: "all", title: t("filter_label"), url: "" },
        ...new Map(
          data.map((product) => [
            product.productCategory.id,
            product.productCategory,
          ])
        ).values(),
      ],
      [data, t]
    );

    // Local state to track selected category for instant UI update
    const [selectedCategory, setSelectedCategory] = useState<string>("all");

    // Sync local state with URL params
    // on first load or when search params change
    useEffect(() => {
      if (searchParams?.get("type") === "category") {
        setSelectedCategory(searchParams.get("value") || "all");
      } else if (searchParams?.get("type") === "search") {
        setSelectedCategory("");
      } else {
        setSelectedCategory("all");
      }
    }, [searchParams]);

    const handleCategoryChange = (categoryID: string) => {
      // Optimistic UI: Update state instantly
      setSelectedCategory(categoryID);

      const params = new URLSearchParams(searchParams);
      if (categoryID !== "all") {
        params.set("type", "category");
        params.set("value", categoryID);
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
        {uniqueCategories.map((category) => (
          <li key={category.id}>
            <button
              className={`relative w-max lg:w-full flex items-center text-start hover:font-bold p-3 rounded-lg box-border ${
                selectedCategory === category.id && "text-white font-bold"
              }`}
              onClick={() => handleCategoryChange(category.id)}
            >
              {category.title}
              {selectedCategory === category.id && (
                <motion.div
                  layoutId="category-highlight"
                  className="absolute inset-0 bg-green-800 rounded-lg -z-10"
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
  }
);

CategoryFilter.displayName = "CategoryFilter";

export default CategoryFilter;
