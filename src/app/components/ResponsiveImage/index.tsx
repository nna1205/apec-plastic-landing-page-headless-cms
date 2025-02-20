import Image, { ImageProps } from "next/image";
import { type FragmentType, getFragmentData } from "@/graphql/types";
import { DatoImageFragmentDoc } from "@/graphql/types/graphql";
import { boolean } from "zod";

type DatoImageProps = {
  responsiveImage?: FragmentType<typeof DatoImageFragmentDoc> | null;
  priority?: boolean;
} & Omit<ImageProps, "src" | "alt" | "width" | "height">; // Exclude conflicting props from ImageProps

const DatoImage: React.FC<DatoImageProps> = ({
  responsiveImage,
  priority = false,
  ...rest // Collect all additional props
}) => {
  if (!responsiveImage) {
    return null;
  }

  // Use getFragmentData to extract the data from the fragment
  const data = getFragmentData(DatoImageFragmentDoc, responsiveImage);

  const { src, alt, title } = data;

  return (
    <Image src={src} priority={priority} alt={alt || title || ""} {...rest} />
  );
};

export default DatoImage;
