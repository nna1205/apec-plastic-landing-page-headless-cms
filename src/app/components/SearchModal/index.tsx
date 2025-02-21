"use client";

import { useState, useRef, useEffect, useTransition } from "react";
import Modal from "@/components/Modal";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { Suspense } from "react";

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
    <div>
      <button
        onClick={() => startTransition(() => setIsOpen(true))}
        disabled={isPending}
        className="lg:w-[240px] flex justify-between items-center text-gray-300 bg-white lg:border-gray-300 lg:border px-3 py-1 text-sm rounded-lg"
      >
        <span className="hidden lg:block">{t("title")}</span>
        <Search size={24} color="green" />
      </button>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        {isOpen && (
          <Suspense fallback={<div className="p-4">Loading...</div>}>
            <DynamicSearchInput setIsOpen={setIsOpen} ref={inputRef} />
          </Suspense>
        )}
      </Modal>
    </div>
  );
}
