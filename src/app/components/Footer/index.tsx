import { LayoutQuery } from "@/graphql/types/graphql";
import Link from "next/link";
import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import { useTranslations } from "next-intl";

type FooterProps = LayoutQuery;

const Footer: React.FC<{ data: FooterProps }> = ({ data }) => {
  const t = useTranslations();
  return (
    <footer className="flex flex-col justify-center items-center border-t border-gray-200">
      <div className="w-full flex flex-col lg:flex-row px-10">
        <div className="w-full lg:w-1/2 flex flex-col gap-3 lg:gap-6 p-6 lg:p-10">
          <div className="flex justify-center items-center gap-3">
            <div className="block relative w-16 h-16 lg:w-24 lg:h-24">
              <Image
                src={data.brandDetail?.logo.url as string}
                alt="logo"
                fill
                sizes="(min-width: 100px) 50%, 100%"
              />
            </div>
            <div className="flex flex-col justify-start gap-2 mr-auto">
              <span className="text-green-800 text-3xl lg:text-5xl font-black">
                {data.brandDetail?.companyName}
              </span>
              <span className="text-lg lg:text-2xl font-light">
                {data.brandDetail?.companyFullname}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {data.brandDetail?.socialMedias.map((item) => {
              return (
                <div
                  key={item.id}
                  className="text-xl border-2 rounded-xl px-3 py-1 lg:text-md lg:px-6 lg:py-2"
                >
                  <Link href={item.url}>{item.label}</Link>
                </div>
              );
            })}
          </div>
          <div className="flex flex-col justify-start text-wrap text-base gap-1">
            {data.brandDetail?.addresses.map((item) => (
              <p
                key={item.id}
                className="inline-block flex-wrap items-center opacity-80"
              >
                {item.label}:{" "}
                <span className="font-bold opacity-100">
                  {item.addressDetail}
                </span>
              </p>
            ))}
          </div>
        </div>
        <div className="w-full lg:w-1/2 p-6 lg:p-10">
          <div className="">
            <p className="text-sm lg:text-base mb-2">{t("form_description")}</p>
            <ContactForm />
          </div>
        </div>
      </div>
      <div className="w-full bg-green-800 flex justify-center items-center text-white text-sm py-1 lg:text-md lg:py-2">
        &copy; {data.rootLayout?.copyrightStatement}
      </div>
    </footer>
  );
};

export default Footer;
