"use client";

import dynamic from "next/dynamic";
import { ProductQuery } from "@/graphql/types/graphql";

const DynamicProductContactForm = dynamic(
  () => import("./ProductContactForm"),
  {
    ssr: false,
    loading: () => <div>Loading...</div>,
  }
);

export default function ProductContactFormWrapper({
  data,
}: {
  data: ProductQuery["product"];
}) {
  return <DynamicProductContactForm data={data} />;
}
