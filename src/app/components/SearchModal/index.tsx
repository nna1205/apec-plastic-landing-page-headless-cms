"use client";

import { useRef, useState } from "react";
import { Search } from "lucide-react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function SearchModal() {
  const [searchInput, setSearchInput] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

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
    if (searchInput.trim()) {
      params.set("type", "search");
      params.set("value", searchInput.trim());
    } else {
      params.delete("type");
      params.delete("value");
    }
    if (pathname !== "/products") {
      replace(`/products?${params.toString()}`);
    } else {
      replace(`${pathname}?${params.toString()}`);
    }
    setSearchInput("");
    closeModal();
  };

  return (
    <div>
      <button
        onClick={openModal}
        className="lg:w-[240px] flex justify-between items-center text-gray-300 bg-white lg:border-gray-300 lg:border px-3 py-1 text-sm rounded-lg"
      >
        <span className="hidden lg:block">Tìm kiếm sản phẩm</span>
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
            Tìm kiếm sản phẩm
          </h2>
          <div className="flex justify-start items-center gap-2">
            <input
              type="text"
              value={searchInput}
              placeholder="Bạn đang tìm sản phẩm gì?"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchInput(e.target.value)
              }
            />
            <button type="submit" className="">
              <Search size={24} color="green" />
            </button>
          </div>
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
