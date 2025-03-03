import { Link } from "@/../i18n/routing";
import { SuggestionQuery } from "@/graphql/types/graphql";
import { Package2, MoveUpLeft, CornerUpRight } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

type SuggestionListProps = {
  query: string;
  autoComplete: string[];
  suggestions: SuggestionQuery["allProducts"];
  onSelect: (value: string) => void;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const highlightMatch = (text: string, query: string) => {
  if (!query) return text;
  const index = text.toLowerCase().indexOf(query.toLowerCase());
  if (index === -1) return text;

  return (
    <div className="w-full truncate opacity-80">
      {text.substring(0, index)}
      <span className="font-bold text-green-800 opacity-100">
        {text.substring(index, index + query.length)}
      </span>
      {text.substring(index + query.length)}
    </div>
  );
};

export default function SuggestionList({
  query,
  autoComplete,
  suggestions,
  onSelect,
  setIsOpen,
}: SuggestionListProps) {
  return (
    <div className=" w-full flex flex-col justify-start items-center">
      {autoComplete.length > 0 && (
        <ul className="w-full flex flex-col">
          {autoComplete.map((item, index) => (
            <li
              key={index}
              className="w-full flex items-center p-2 cursor-pointer hover:bg-gray-100 rounded-md"
              onClick={() => onSelect(item)}
            >
              {highlightMatch(item, query)}
              <MoveUpLeft size={16} className="ml-auto" />
            </li>
          ))}
        </ul>
      )}

      {suggestions.length > 0 && (
        <div className="w-full flex flex-col mt-3">
          <span className="text-gray-500 text-xs opacity-60 p-0 m-0">
            Sản phẩm
          </span>
          <ul className="w-full flex flex-col text-start">
            {suggestions.map((product) => (
              <li
                key={product.id}
                className="w-full p-2 border-gray-200 hover:bg-gray-100 rounded-md"
              >
                <Link
                  href={`/products/${product.id}`}
                  className="w-full flex items-center gap-3"
                  onClick={() => setIsOpen(false)}
                >
                  <Package2 size={16} color="green" />
                  <div className="">
                    <div className="text-lg font-semibold">
                      {highlightMatch(product.title, query)}
                    </div>
                    <div className="max-w-80 text-sm text-gray-600 line-clamp-1">
                      {!product.description
                        ? "No description"
                        : highlightMatch(product.description, query)}
                    </div>
                  </div>
                  <CornerUpRight size={16} className="ml-auto" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
