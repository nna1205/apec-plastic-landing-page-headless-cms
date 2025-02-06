"use client";

import { useRef, useState, useEffect } from "react";
import { Search, Trash } from "lucide-react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

export default function SearchModal() {
  const [searchInput, setSearchInput] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);

  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    const storedHistory = JSON.parse(
      localStorage.getItem("searchHistory") || "[]"
    );
    setSearchHistory(storedHistory);
  }, []);

  const updateSearchHistory = (query: string) => {
    if (!query.trim()) return;
    let updatedHistory = [
      query,
      ...searchHistory.filter((q) => q !== query),
    ].slice(0, 10);
    setSearchHistory(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
  };

  const clearSearchHistory = () => {
    localStorage.removeItem("searchHistory");
    setSearchHistory([]);
  };

  const openModal = () => {
    dialogRef.current?.showModal();
  };

  const closeModal = () => {
    dialogRef.current?.close();
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    // Close the dialog if the click is outside the modal content
    const dialog = dialogRef.current;
    if (dialog && e.target === dialog) {
      closeModal();
    }
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    let locale = pathname.split("/")[1];

    if (searchInput.trim()) {
      updateSearchHistory(searchInput.trim());
      params.set("type", "search");
      params.set("value", searchInput.trim());
    } else {
      params.delete("type");
      params.delete("value");
    }

    if (pathname.includes("/products")) {
      replace(`${pathname}?${params.toString()}`);
    } else {
      replace(`/${locale}/products?${params.toString()}`);
    }
    setSearchInput("");
    closeModal();
  };

  const { t } = useTranslation();

  return (
    <div>
      <button
        onClick={openModal}
        className="lg:w-[240px] flex justify-between items-center text-gray-300 bg-white lg:border-gray-300 lg:border px-3 py-1 text-sm rounded-lg"
      >
        <span className="hidden lg:block">{t("search_title")}</span>
        <Search size={24} color="green" />
      </button>

      <dialog
        ref={dialogRef}
        onClick={handleOverlayClick}
        className="w-full max-w-lg rounded-lg p-4 backdrop:bg-opacity-80 backdrop-blur-md border border-gray-200 shadow-lg"
      >
        <form
          method="dialog"
          onSubmit={handleSearchSubmit}
          className="relative flex flex-col gap-4 p-4 bg-white rounded-md"
        >
          <h2 className="text-2xl text-green-800 font-bold">
            {t("search_title")}
          </h2>
          <div className="flex justify-start items-center gap-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400">
            <input
              type="text"
              value={searchInput}
              placeholder="Bạn đang tìm sản phẩm gì?"
              className="w-full focus:outline-none focus:ring-0"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchInput(e.target.value)
              }
            />
            <button type="submit" className="">
              <Search size={24} color="green" />
            </button>
          </div>
          {searchHistory.length > 0 && (
            <div className="max-h-40 overflow-y-auto mt-2">
              <div className="flex justify-between items-center mb-1">
                <span className="text-gray-500 text-sm opacity-60">
                  {t("search_history")}
                </span>
              </div>
              <ul className="flex max-w-full gap-2">
                {searchHistory.map((query, index) => (
                  <li
                    key={index}
                    className="cursor-pointer border border-gray-300 px-3 py-1 rounded"
                    onClick={() => setSearchInput(query)}
                  >
                    {query}
                  </li>
                ))}
              </ul>
              <button
                onClick={clearSearchHistory}
                className="text-red-300 text-center w-max mx-auto text-sm flex justify-center items-center gap-2"
              >
                <Trash size={16} /> {t("clear_history")}
              </button>
            </div>
          )}
          <button
            type="button"
            onClick={closeModal}
            className="absolute top-2 right-2 text-gray-400 hover:text-black"
          >
            &times;
          </button>
        </form>
      </dialog>
    </div>
  );
}
