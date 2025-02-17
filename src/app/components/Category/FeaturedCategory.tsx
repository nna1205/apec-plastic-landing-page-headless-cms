import { FeaturedProductSectionFragment } from "@/graphql/types/graphql";
import * as motion from "motion/react-client";
import Icon, { IconName } from "@/components/LucideIcon";
import FeaturedProductCard from "@/components/Product/FeaturedProductCard";

type FeaturedCategoryProps =
  FeaturedProductSectionFragment["featuredProductsList"][0];

const FeaturedCategory: React.FC<{ data: FeaturedCategoryProps }> = ({
  data,
}) => {
  return (
    <div className="mt-6">
      {data.highlightCategory ? (
        <motion.div
          key={data.id}
          className="grid grid-cols-2 gap-3 mb-6 lg:grid-cols-3 lg:gap-6"
          initial={{ opacity: 0, x: -100, y: -50 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="bg-green-800 p-3 rounded-sm lg:rounded-xl lg:-6">
            <div className="bg-green-400 rounded-full p-3 w-min">
              <Icon
                name={data.categoryIcon?.toLowerCase() as IconName}
                color="white"
                className="w-12 h-12 lg:w-24 lg:h-24"
              />
            </div>
            <h3 className="font-black text-xl text-white line-clamp-2 mt-2 lg:text-6xl lg:mt-6">
              {data.category.title}
            </h3>
            <p className="opacity-80 text-white text-sm lg:text-lg">
              {data.category.description}
            </p>
          </div>
          {data.featuredProducts.map((product) => (
            <FeaturedProductCard
              key={product.id}
              data={product}
              highlight={data.highlightCategory}
            />
          ))}
        </motion.div>
      ) : (
        <motion.div
          key={data.id}
          className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-6"
          initial={{ opacity: 0, x: -100, y: -50 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <div className="bg-green-400 p-3 rounded-sm lg:rounded-xl lg:p-6">
            <div className="bg-white rounded-full p-3 w-min">
              <Icon
                name={data.categoryIcon?.toLowerCase() as IconName}
                color="black"
                className="w-12 h-12 lg:w-24 lg:h-24"
              />
            </div>
            <h3 className="font-black text-xl text-white line-clamp-2 mt-2 lg:text-5xl lg:mt-6">
              {data.category.title}
            </h3>
            <p className="opacity-80 text-white text-xs lg:text-base">
              {data.category.description}
            </p>
          </div>
          {data.featuredProducts.map((product) => (
            <FeaturedProductCard
              key={product.id}
              data={product}
              highlight={data.highlightCategory}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default FeaturedCategory;
