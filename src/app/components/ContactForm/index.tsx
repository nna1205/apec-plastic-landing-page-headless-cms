"use client";

import dynamic from "next/dynamic";

const DynamicContactForm = dynamic(() => import("./ContactForm"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

export default function ContactFormWrapper() {
  return <DynamicContactForm />;
}
