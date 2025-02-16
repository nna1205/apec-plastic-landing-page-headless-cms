import { type FragmentType, getFragmentData } from "@/app/graphql/types";
import { FeaturedProductSectionFragmentDoc } from "@/app/graphql/types/graphql";
import * as motion from "motion/react-client";
import FeaturedCategory from "@/app/components/Category/FeaturedCategory";

type Props = {
  fragment: FragmentType<typeof FeaturedProductSectionFragmentDoc>;
};

export default function FeaturedProductSection({ fragment }: Props) {
  const { sectionHeader, featuredProductsList } = getFragmentData(
    FeaturedProductSectionFragmentDoc,
    fragment
  );
  return (
    <section className="flex flex-col justify-start items-center">
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <header className="flex flex-col justify-center items-center">
          <span className="text-sm lg:text-2xl">{sectionHeader.subtitle}</span>
          <h2 className="font-black text-green-400 text-xl text-center line-clamp-3 lg:line-clamp-2 lg:text-5xl">
            {sectionHeader.title}
          </h2>
        </header>
        {featuredProductsList.map((group) => (
          <FeaturedCategory key={group.id} data={group} />
        ))}
      </motion.div>
    </section>
  );
}
