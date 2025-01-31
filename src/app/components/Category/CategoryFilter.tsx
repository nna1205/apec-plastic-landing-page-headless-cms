"use client";

import { ProductsQuery } from "@/graphql/types/graphql";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

type CategoryFilterProps = ProductsQuery["allProducts"][0]["productCategory"];

const CategoryFilter: React.FC<{ data: CategoryFilterProps[] }> = ({
  data,
}) => {
  const searchParams = useSearchParams();
  const selectedCategory =
    searchParams?.get("type") === "category" && searchParams?.get("value");
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams);
    if (category.trim()) {
      params.set("type", "category");
      params.set("value", category);
    } else {
      params.delete("type");
      params.delete("value");
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <ul className="w-full lg:w-1/5 flex lg:flex-col justify-start lg:gap-9 text-xs lg:text-xl">
      <li>
        <button
          className={`w-max lg:w-full flex items-center hover:font-bold p-3 rounded-lg box-border ${
            !selectedCategory && "bg-green-400 text-white font-bold"
          }`}
          onClick={() => handleCategoryChange("")}
        >
          Tất cả sản phẩm
        </button>
      </li>
      {data.map((category) => (
        <li key={category.id}>
          <button
            className={`w-max lg:w-full flex items-center hover:font-bold p-3 rounded-lg box-border ${
              selectedCategory === category.url &&
              "bg-green-400 text-white font-bold"
            }`}
            onClick={() => handleCategoryChange(category.url)}
          >
            {category.title}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default CategoryFilter;
