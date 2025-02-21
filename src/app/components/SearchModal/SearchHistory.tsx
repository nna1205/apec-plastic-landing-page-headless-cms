"use client";

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  memo,
  useTransition,
  useOptimistic,
} from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTranslations } from "next-intl";
import { Trash } from "lucide-react";

const SearchHistory = memo(
  ({
    searchHistory,
    setSearchInput,
    clearSearchHistory,
  }: {
    searchHistory: string[];
    setSearchInput: (query: string) => void;
    clearSearchHistory: () => void;
  }) => {
    const t = useTranslations("search");
    const [maxVisible, setMaxVisible] = useState<number>(searchHistory.length);
    const [expanded, setExpanded] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [optimisticHistory] = useOptimistic(searchHistory);
    const containerRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLUListElement>(null);

    const updateVisibleItems = useCallback(() => {
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
    }, []);

    useEffect(() => {
      // Calculate maxVisible on initial render
      updateVisibleItems();

      const observer = new ResizeObserver(() => {
        // Use startTransition to batch updates
        startTransition(() => {
          updateVisibleItems();
        });
      });

      if (containerRef.current) observer.observe(containerRef.current);

      return () => {
        observer.disconnect();
      };
    }, [updateVisibleItems, startTransition]);

    return (
      <div className="w-full max-h-40">
        <div className="w-full flex justify-between items-center mb-1">
          <span className="text-gray-500 text-sm opacity-60">
            {t("history_label")}
          </span>
          <button
            onClick={clearSearchHistory}
            className="text-red-300 text-center ml-auto text-xs flex justify-center items-center gap-2"
          >
            <Trash size={12} /> {t("clear_history_cta")}
          </button>
        </div>
        <div ref={containerRef} className="w-full overflow-hidden">
          {isPending ? (
            "Loading..."
          ) : (
            <ul ref={listRef} className="flex justify-start flex-wrap gap-2">
              <AnimatePresence initial={false}>
                {optimisticHistory
                  .slice(0, expanded ? optimisticHistory.length : maxVisible)
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
          )}

          {!isPending && optimisticHistory.length > maxVisible && (
            <div
              className="w-max mx-auto mt-2 text-xs opacity-60 cursor-pointer"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? t("history_show_less") : t("history_show_more")}
            </div>
          )}
        </div>
      </div>
    );
  }
);

SearchHistory.displayName = "SearchHistory";

export default SearchHistory;
