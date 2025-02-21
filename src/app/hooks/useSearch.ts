import { useState, useEffect, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { usePathname, useRouter} from "@/../i18n/routing";

export function useSearch() {
  const [isPending, startTransition] = useTransition();
  const [searchInput, setSearchInput] = useState("");
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem("searchHistory") || "[]");
    setSearchHistory(storedHistory);
  }, []);

  const updateSearchHistory = (query: string) => {
    if (!query.trim()) return;
    const updatedHistory = [query, ...searchHistory.filter((q) => q !== query)].slice(0, 10);
    setSearchHistory(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
  };

  const clearSearchHistory = () => {
    localStorage.removeItem("searchHistory");
    setSearchHistory([]);
  };

  const submitSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(() => {
      const params = new URLSearchParams(searchParams);

      if (searchInput.trim()) {
        updateSearchHistory(searchInput.trim());
        params.set("type", "search");
        params.set("value", searchInput.trim());
      } else {
        params.delete("type");
        params.delete("value");
      }

    // Handle the case where user is on /[locale]/products/[id] 
    // or any other routes
    if (!pathname.includes("/products") || pathname.includes("/products/")) {
      router.push({
        pathname: "/products",
        query: Object.fromEntries(params),
      });
    } else if (pathname.includes("/products")) {
      // Stay on "/[locale]/products" and update search params
      router.push(`${pathname}?${params.toString()}`);
    }

      // Clear the search input
      setSearchInput("");
    });
  };

  return {
    searchInput,
    setSearchInput,
    searchHistory,
    clearSearchHistory,
    submitSearch,
    isPending,
  };
}
