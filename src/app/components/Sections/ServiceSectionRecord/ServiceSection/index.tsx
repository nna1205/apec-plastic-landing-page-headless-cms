import { type FragmentType, getFragmentData } from "@/graphql/types";
import { ServiceSectionFragmentDoc } from "@/graphql/types/graphql";
import { Link } from "@/../i18n/routing";
import * as motion from "motion/react-client";
import DatoImage from "@/components/ResponsiveImage";
import Button, { ButtonProps } from "@/components/Button";
import Icon, { IconName } from "@/components/LucideIcon";

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
        className="relative w-full h-full rounded-xl lg:w-1/2"
        initial={{ opacity: 0, x: -50, y: -50 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
      >
        <DatoImage
          responsiveImage={image.responsiveImage}
          className="rounded-lg"
          style={{
            width: "100%",
            height: "auto",
          }}
          priority
        />
      </motion.div>
      <div className="w-full lg:w-1/2">
        <motion.div
          className="flex flex-col justify-between items-center gap-0 lg:gap-3"
          initial={{ opacity: 0, x: 100, y: -50 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
        >
          <div className="">
            <h2 className="text-3xl line-clamp-2 font-black text-green-400 mb-1 lg:text-5xl">
              {sectionHeader.title}
            </h2>
            <p className="text-xs lg:text-xl">{sectionHeader.subtitle}</p>
            <Button
              variant={callToActions[0].variant as ButtonProps["variant"]}
              className="mr-auto"
            >
              <Link href={callToActions[0].slug || "#"}>
                {callToActions[0].label}
              </Link>
            </Button>
          </div>
          <div className="w-full flex lg:justify-between lg:items-end gap-3 mt-3 lg:mt-9">
            {services.map((item) =>
              item.highlight ? (
                <div
                  key={item.id}
                  className="w-1/2 flex flex-col gap-3 rounded-md bg-green-800 p-3 lg:p-6 lg:gap-6"
                >
                  <div className="bg-green-400 rounded-full p-3 w-min">
                    <Icon
                      name={item.icon?.toLowerCase() as IconName}
                      className="w-6 h-6 lg:w-10 lg:h-10"
                      color="white"
                    />
                  </div>
                  <span className="text-md lg:text-3xl line-clamp-2 text-white font-bold">
                    {item.label}
                  </span>
                </div>
              ) : (
                <div
                  key={item.id}
                  className="w-1/2 h-min mt-auto rounded-md bg-green-400 text-white p-3 lg:p-6"
                >
                  <span className="text-md lg:text-3xl line-clamp-2 font-bold">
                    {item.label}
                  </span>
                  <p className="text-xs lg:text-sm line-clamp-2">
                    {item.description}
                  </p>
                </div>
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceSection;
