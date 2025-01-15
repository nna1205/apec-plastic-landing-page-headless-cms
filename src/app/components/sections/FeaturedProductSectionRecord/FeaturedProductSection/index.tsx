import { type FragmentType, getFragmentData } from "@/graphql/types";
import { FeaturedProductSectionFragmentDoc } from "@/graphql/types/graphql";
import * as motion from "motion/react-client";

type Props = {
    fragment: FragmentType<typeof FeaturedProductSectionFragmentDoc>
}

export default function ProductSection({fragment} : Props) {
    const {sectionHeader} = getFragmentData(FeaturedProductSectionFragmentDoc, fragment)
  return (
    <section className="flex flex-col justify-start items-center">
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true, amount: 0.8 }}
      >
        <header className="flex flex-col justify-center items-center">
          <span className="text-sm lg:text-2xl">
            SẢN PHẨM CỦA NHỰA APEC LUÔN ĐẠT
          </span>
          <h2 className="font-black text-green-400 text-xl text-center line-clamp-3 lg:line-clamp-2 lg:text-5xl">
            CHẤT LƯỢNG CAO, THÂN THIỆN MÔI TRƯỜNG, KHÔNG BA VIA, ĐA DẠNG KÍCH CỠ
          </h2>
        </header>
      </motion.div>
    </section>
  );
}