import { Quote, CircleUserRound } from "lucide-react";
//import Image from "next/image";
import * as motion from "motion/react-client";
import DatoImage from "@/components/ResponsiveImage";
import { TestimonialSectionFragment } from "@/graphql/types/graphql";

type FeedbackProps = TestimonialSectionFragment["customerFeedback"][0];

const TestimonialCard: React.FC<{ data: FeedbackProps }> = ({ data }) => {
  const layoutOrder =
    data.variant === "primary"
      ? "row-span-2 md:row-span-2 md:col-span-1 order-1"
      : data.variant === "secondary"
      ? "md:row-span-1 md:col-span-1 order-2"
      : "md:row-span-1 md:col-span-1 order-3";

  if (data.variant === "secondary" || data.variant === "tertiary")
    return (
      <motion.div
        className={`${layoutOrder} ${
          data.variant === "tertiary" && "flex-row-reverse"
        } w-full flex justify-between items-center gap-3 rounded p-3 shadow-md border-slate-200 border bg-white`}
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <div className="relative w-full">
          <DatoImage
            responsiveImage={data.image.responsiveImage}
            quality={100}
            style={{
              width: "100%",
              height: "auto",
            }}
            className="h-full w-full object-contain"
          />
        </div>
        <div className="h-full flex flex-col justify-between items-start">
          <div className="flex flex-col justify-start items-start">
            <Quote className="text-green-800 w-9 h-9" />
            <p className="font-bold text-sm lg:text-xl">{data.content}</p>
          </div>
          <div className="w-min flex gap-1">
            <CircleUserRound className="w-8 h-8 lg:w-10 lg:h-10" />
            <div className="flex flex-col w-max">
              <span className="text-xs lg:font-medium">
                {data.customerName}
              </span>
              <span className="text-xs lg:text-sm opacity-80">
                {data.customerLocation}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    );
  return (
    <motion.div
      className={`${layoutOrder} relative w-full h-full rounded overflow-hidden`}
      initial={{ opacity: 0, y: -100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true, amount: 0.5 }}
    >
      <DatoImage
        responsiveImage={data.image.responsiveImage}
        quality={100}
        style={{
          width: "100%",
          height: "auto",
        }}
        className="h-full w-full object-contain"
      />
      <div className="w-full absolute z-10 top-0 p-3">
        <div className="bg-white p-3 rounded">
          <div className="w-min flex gap-1">
            <CircleUserRound className="w-8 h-8 lg:w-10 lg:h-10" />
            <div className="flex flex-col w-max">
              <span className="text-xs lg:font-medium">
                {data.customerName}
              </span>
              <span className="text-xs lg:text-sm opacity-80">
                {data.customerLocation}
              </span>
            </div>
          </div>
          <div className="flex justify-start items-start gap-3 mt-3 w-full">
            <Quote className="text-green-800 w-12 h-12" />
            <p className="font-bold text-xl lg:text-2xl">{data.content}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
