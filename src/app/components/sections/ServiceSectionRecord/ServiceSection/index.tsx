import { type FragmentType, getFragmentData } from "@/graphql/types";
import { ServiceSectionFragmentDoc } from "@/graphql/types/graphql";
import Link from "next/link";
import * as motion from "motion/react-client";
import DatoImage from "@/components/ResponsiveImage";
import Button, { ButtonProps } from "@/components/Button";
import Icon from "@/components/LucideIcon";

type Props = {
  fragment: FragmentType<typeof ServiceSectionFragmentDoc>;
};

const ServiceSection = ({ fragment }: Props) => {
  const { sectionHeader, services, callToActions, image } = getFragmentData(
    ServiceSectionFragmentDoc,
    fragment
  );
  return (
    <section className="flex flex-col-reverse justify-between gap-3 lg:flex-row lg:gap-6">
      <motion.div
        className="relative w-full h-80 rounded-xl lg:w-1/2 lg:h-full"
        initial={{ opacity: 0, x: -50, y: -50 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, amount: 0.25 }}
      >
        <DatoImage
          responsiveImage={image.responsiveImage}
          className="rounded-lg"
          fill
          sizes="(min-width: 1024px) 50%, 100%"
        />
      </motion.div>
      <div className="w-full flex flex-col justify-between items-center lg:w-1/2">
        <motion.div
          className="flex flex-col items-center gap-0 lg:gap-3"
          initial={{ opacity: 0, x: 100, y: -50 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.8 }}
        >
          <h2 className="text-3xl line-clamp-2 font-black text-green-400 mb-1 lg:text-5xl">
            {sectionHeader.title}
          </h2>
          <p className="text-xs lg:text-xl">{sectionHeader.subtitle}</p>
          <Button variant={callToActions[0].variant as ButtonProps["variant"]}>
            <Link href={callToActions[0].url || "#"}>
              {callToActions[0].label}
            </Link>
          </Button>
        </motion.div>
        <div className="w-full flex lg:justify-between lg:items-end gap-3 mt-3 lg:mt-9">
          <motion.div
            className="w-1/2 flex flex-col gap-3 rounded-md bg-green-800 p-3 lg:p-6 lg:gap-6"
            initial={{ opacity: 0, x: "-50%", y: -50 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="bg-green-400 rounded-full p-3 w-min">
              <Icon
                name="truck"
                className="w-6 h-6 lg:w-10 lg:h-10"
                color="white"
              />
            </div>
            <span className="text-md lg:text-3xl line-clamp-2 text-white font-bold">
              VẬN CHUYỂN <br /> TOÀN QUỐC
            </span>
          </motion.div>
          <motion.div
            className="w-1/2 h-min mt-auto rounded-md bg-green-400 text-white p-3 lg:p-6"
            initial={{ opacity: 0, x: "-50%", y: -50 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <span className="text-md lg:text-3xl line-clamp-2 font-bold">
              MIỄN PHÍ <br /> VẬN CHUYỂN
            </span>
            <p className="text-xs lg:text-sm line-clamp-2">
              Dành cho đơn hàng trên 2 triệu đồng
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
