"use client";

import { Dispatch, SetStateAction, RefObject } from "react";
import dynamic from "next/dynamic";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useSearch } from "@/hooks/useSearch";
import { useSearchSuggestions } from "@/hooks/useSuggestion";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import SuggestionList from "./SearchSuggestion";

const DynamicSearchHistory = dynamic(() => import("./SearchHistory"), {
  ssr: false,
});

const SearchInput = ({
  setIsOpen,
  ref,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  ref?: RefObject<HTMLInputElement | null>;
}) => {
  const t = useTranslations("search");
  const {
    searchInput,
    setSearchInput,
    searchHistory,
    clearSearchHistory,
    submitSearch,
  } = useSearch();

  const debouncedSearchInput = useDebouncedValue(searchInput, 300);
  const { suggestions, autoComplete, loading } =
    useSearchSuggestions(debouncedSearchInput);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitSearch(e);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full bg-white rounded-xl shadow-lg">
      <form
        onSubmit={handleSearchSubmit}
        className="relative flex flex-col gap-3 p-4 bg-white rounded-md"
      >
        <h2 className="text-2xl text-green-800 font-bold">{t("title")}</h2>
        <div className="relative flex justify-start items-center gap-2 p-2 border border-gray-300 rounded">
          <input
            ref={ref}
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full focus:outline-none focus:ring-transparent"
            placeholder={t("placeholder")}
          />
          <button type="submit" className="">
            <Search size={24} color="green" />
          </button>
        </div>
        {loading ? (
          <span className="opacity-60">
            {t("loading")} &ldquo;{debouncedSearchInput}&rdquo;...
          </span>
        ) : (
          <SuggestionList
            query={debouncedSearchInput}
            autoComplete={autoComplete}
            suggestions={suggestions}
            onSelect={(value) => setSearchInput(value)}
          />
        )}
        {searchHistory.length > 0 && (
          <DynamicSearchHistory
            searchHistory={searchHistory}
            setSearchInput={setSearchInput}
            clearSearchHistory={clearSearchHistory}
          />
        )}
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="absolute top-2 right-2 text-xl text-gray-400 hover:text-black"
        >
          &times;
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
