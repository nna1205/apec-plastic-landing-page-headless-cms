"use client";

import { useState } from "react";
import * as motion from "motion/react-client";
import { AnimatePresence } from "motion/react";
import Image from "next/image";
import { ProductRecord } from "@/graphql/types/graphql";

const ProductImageCarousel: React.FC<{
  data: ProductRecord["productImages"];
}> = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % data.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + data.length) % data.length);
  };

  return (
    <div className="relative w-full h-full mx-auto lg:w-1/2">
      {/* Carousel Container */}
      <div className="overflow-hidden relative w-full h-[280px] bg-gray-200 rounded-lg lg:h-[480px]">
        <AnimatePresence>
          {data.map(
            (image, index) =>
              index === currentIndex && (
                <motion.div
                  key={image.id}
                  className="absolute w-full h-full"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                >
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1024px) 50%, 100%"
                    className="object-cover rounded-lg"
                  />
                </motion.div>
              )
          )}
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-200"
      >
        &#9664;
      </button>
      <button
        onClick={handleNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-200"
      >
        &#9654;
      </button>

      {/* Pagination Thumbnails */}
      <div className="mt-4 flex justify-start items-center gap-4 overflow-x-auto">
        {data.map((image, index) => (
          <div
            key={image.id}
            className={`relative w-12 h-12 cursor-pointer border-2 rounded-md lg:w-20 lg:h-20${
              index === currentIndex ? "border-blue-600" : "border-gray-300"
            }`}
            onClick={() => setCurrentIndex(index)}
          >
            <Image
              src={image.url}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 50%, 100%"
              className={`object-cover rounded-md ${
                index === currentIndex ? "opacity-100" : "opacity-70"
              } hover:opacity-100 transition-opacity`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImageCarousel;
