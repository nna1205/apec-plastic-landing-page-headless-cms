"use client";

import { useState, useRef, useEffect, useTransition } from "react";
import Modal from "@/components/Modal";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";

const DynamicSearchInput = dynamic(() => import("./SearchInput"), {
  ssr: false,
});

export default function SearchModal() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const t = useTranslations("search");

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => startTransition(() => setIsOpen(true))}
        disabled={isPending}
        type="button"
        aria-label="Open search modal"
        className="w-[180px] lg:w-[240px] flex justify-between items-center bg-white border-gray-300 border px-1 lg:px-3 py-1 text-sm rounded-lg"
      >
        <span className="opacity-40">{t("title")}</span>
        <Search className="w-4 h-4 lg:w-6 lg:h-6" color="green" />
      </button>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        {isOpen && <DynamicSearchInput setIsOpen={setIsOpen} ref={inputRef} />}
      </Modal>
    </>
  );
}
