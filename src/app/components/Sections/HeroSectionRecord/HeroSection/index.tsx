import { type FragmentType, getFragmentData } from "@/graphql/types";
import { HeroSectionFragmentDoc } from "@/graphql/types/graphql";
import { Link } from "@/../i18n/routing";
import * as motion from "motion/react-client";
import DatoImage from "@/components/ResponsiveImage";
import Button, { ButtonProps } from "@/components/Button";

type Props = {
  fragment: FragmentType<typeof HeroSectionFragmentDoc>;
};

const HeroSection = ({ fragment }: Props) => {
  const { sectionHeader, callToActions, image } = getFragmentData(
    HeroSectionFragmentDoc,
    fragment
  );

  return (
    <section className="w-full lg:h-[75vh] flex flex-col lg:flex-row justify-between lg:gap-6">
      <div className="w-full lg:w-1/2 flex flex-col gap-3 lg:gap-6 lg:py-12">
        <motion.div
          initial={{ opacity: 0, x: -100, y: -50 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          style={{ willChange: "transform, opacity" }}
        >
          <header className="flex flex-col gap-1">
            <h1 className="font-black text-3xl lg:text-[64px] leading-tight">
              {sectionHeader.title}
            </h1>
            <p className="text-xs lg:text-2xl">
              {sectionHeader.subtitle || ""}
            </p>
          </header>
          <div className="flex items-center gap-3 lg:gap-9 mt-6 lg:mt-9">
            {callToActions.map((item) => {
              return (
                <Button
                  key={item.id}
                  variant={item.variant as ButtonProps["variant"]}
                >
                  <Link
                    href={item.slug || "#"}
                    className="inline-block w-full h-full"
                  >
                    {item.label}
                  </Link>
                </Button>
              );
            })}
          </div>
        </motion.div>
      </div>
      <motion.div
        className="relative w-full h-[360px] lg:w-1/2 lg:h-full flex flex-col items-center"
        initial={{ opacity: 0, x: 100, y: -50 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        style={{ willChange: "transform, opacity" }}
      >
        <DatoImage
          responsiveImage={image.responsiveImage}
          style={{
            width: "100%",
            height: "auto",
          }}
          priority
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
