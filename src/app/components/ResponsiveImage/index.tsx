import Image, { ImageProps } from "next/image";
import { type FragmentType, getFragmentData } from "@/graphql/types";
import { DatoImageFragmentDoc } from "@/graphql/types/graphql";

type DatoImageProps = {
  responsiveImage?: FragmentType<typeof DatoImageFragmentDoc> | null;
} & Omit<ImageProps, "src" | "alt" | "width" | "height">; // Exclude conflicting props from ImageProps

const DatoImage: React.FC<DatoImageProps> = ({
  responsiveImage,
  ...rest // Collect all additional props
}) => {
  if (!responsiveImage) {
    return null;
  }

  // Use getFragmentData to extract the data from the fragment
  const data = getFragmentData(DatoImageFragmentDoc, responsiveImage);

  const { src, alt, title } = data;

  return <Image src={src} alt={alt || title || ""} {...rest} />;
};

export default DatoImage;
