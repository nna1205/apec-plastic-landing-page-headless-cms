"use client";

import { useState, useRef, useEffect } from "react";
import Modal from "@/app/components/Modal";
import SearchInput from "./SearchInput";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";

export default function SearchModal() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("search");

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="lg:w-[240px] flex justify-between items-center text-gray-300 bg-white lg:border-gray-300 lg:border px-3 py-1 text-sm rounded-lg"
      >
        <span className="hidden lg:block">{t("title")}</span>
        <Search size={24} color="green" />
      </button>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <SearchInput setIsOpen={setIsOpen} ref={inputRef} />
      </Modal>
    </div>
  );
}
