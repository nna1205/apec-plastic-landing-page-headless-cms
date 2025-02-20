import { type FragmentType, getFragmentData } from "@/graphql/types";
import { TestimonialSectionFragmentDoc } from "@/graphql/types/graphql";
import * as motion from "motion/react-client";
import TestimonialCard from "./TestimonialCard";

type Props = {
  fragment: FragmentType<typeof TestimonialSectionFragmentDoc>;
};

const TestimonialSection = ({ fragment }: Props) => {
  const { sectionHeader, customerFeedback } = getFragmentData(
    TestimonialSectionFragmentDoc,
    fragment
  );
  return (
    <section className="relative z-0 w-full">
      <div className="flex flex-col justify-start items-center py-12 before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-screen before:-z-10 before:h-full before:bg-slate-100">
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
        >
          <h2 className="font-black text-center text-black text-xl line-clamp-2 mb-3 lg:mb-10 lg:text-5xl">
            {sectionHeader.title}
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 grid-rows-4 gap-4 md:grid-cols-2 md:grid-rows-2 text-4xl w-full">
          {customerFeedback.map((item) => (
            <TestimonialCard key={item.id} data={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
