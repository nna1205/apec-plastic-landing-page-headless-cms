import { LayoutQuery } from "@/graphql/types/graphql";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import ContactFormWrapper from "@/components/ContactForm";

type FooterProps = LayoutQuery;

const Footer: React.FC<{ data: FooterProps }> = ({ data }) => {
  const t = useTranslations();
  return (
    <footer className="flex flex-col justify-center items-center border-t border-gray-200 py-3">
      <div className="w-full flex flex-col lg:flex-row px-6 py-6 lg:py-0 lg:px-10">
        <div className="w-full lg:w-1/2 flex flex-col gap-3 lg:gap-6 lg:p-10">
          <div className="w-full flex lg:flex-col justify-between lg:justify-items-start lg:gap-6">
            <div className="flex justify-center items-center gap-2 lg:gap-3">
              <div className="block relative w-10 h-10 lg:w-24 lg:h-24">
                <Image
                  src={data.brandDetail?.logo.url as string}
                  alt="logo"
                  fill
                  sizes="(min-width: 100px) 50%, 100%"
                />
              </div>
              <div className="flex flex-col justify-start lg:gap-2 mr-auto">
                <span className="text-green-800 text-lg lg:text-5xl font-black">
                  {data.brandDetail?.companyName}
                </span>
                <span className="text-[10px] lg:text-2xl font-light">
                  {data.brandDetail?.companyFullname}
                </span>
              </div>
            </div>
            <div className="text-gray-400 lg:underline lg:underline-offset-2 flex lg:gap-3">
              {data.brandDetail?.socialMedias.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="text-base lg:border-2 rounded-xl px-3 py-1 lg:text-xl lg:px-6 lg:py-2"
                  >
                    <Link href={item.url}>{item.label}</Link>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col justify-start text-wrap text-base gap-1">
            {data.brandDetail?.addresses.map((item) => (
              <p
                key={item.id}
                className="inline-block flex-wrap items-center opacity-80"
              >
                {item.label}:{" "}
                <span className="font-semibold opacity-100">
                  {item.addressDetail}
                </span>
              </p>
            ))}
          </div>
        </div>
        <div className="w-full lg:w-1/2 lg:p-10 mt-9 lg:mt-0">
          <div className="">
            <p className="text-sm lg:text-base mb-2 font-medium">
              {t("form_description")}
            </p>
            <ContactFormWrapper />
          </div>
        </div>
      </div>
      <div className="w-full text-center text-gray-400 text-sm lg:text-md">
        &copy; {data.rootLayout?.copyrightStatement}
      </div>
    </footer>
  );
};

export default Footer;
