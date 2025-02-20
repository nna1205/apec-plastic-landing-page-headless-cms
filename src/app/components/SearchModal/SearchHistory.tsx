"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

export default function SearchHistory({
  searchHistory,
  setSearchInput,
}: {
  searchHistory: string[];
  setSearchInput: (query: string) => void;
}) {
  const t = useTranslations("search");
  const [maxVisible, setMaxVisible] = useState<number>(searchHistory.length);
  const [expanded, setExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const updateVisibleItems = () => {
      if (!containerRef.current || !listRef.current) return;

      const containerWidth = containerRef.current.clientWidth;
      const children = Array.from(listRef.current.children) as HTMLElement[];
      let totalWidth = 0;
      let visibleCount = children.length;

      for (let i = 0; i < children.length; i++) {
        totalWidth += children[i].offsetWidth;
        if (i > 0) {
          // Add the actual gap dynamically
          const computedStyle = window.getComputedStyle(children[i]);
          const gapSize = parseFloat(computedStyle.marginLeft); // Get the gap size dynamically
          totalWidth += gapSize;
        }

        if (totalWidth > containerWidth) {
          visibleCount = i;
          break;
        }
      }

      setMaxVisible(Math.max(1, visibleCount));
    };

    const observer = new ResizeObserver(updateVisibleItems);
    if (containerRef.current) observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [searchHistory]);

  return (
    <div ref={containerRef} className="w-full">
      <ul
        ref={listRef}
        className="flex justify-start flex-wrap gap-2 overflow-hidden"
      >
        <AnimatePresence initial={false}>
          {searchHistory
            .slice(0, expanded ? searchHistory.length : maxVisible)
            .map((query) => (
              <motion.li
                key={query}
                layout
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="cursor-pointer border border-gray-300 px-3 py-1 rounded"
                onClick={() => setSearchInput(query)}
              >
                {query}
              </motion.li>
            ))}
        </AnimatePresence>
      </ul>

      {searchHistory.length > maxVisible && (
        <div
          className="w-max mx-auto mt-2 text-xs opacity-60 cursor-pointer"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? t("history_show_less") : t("history_show_more")}
        </div>
      )}
    </div>
  );
}
