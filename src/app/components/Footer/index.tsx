import { LayoutQuery } from "@/graphql/types/graphql";
import Link from "next/link";
import Image from "next/image";
import Icon, { IconName } from "@/components/LucideIcon";

type FooterProps = LayoutQuery;

const Footer: React.FC<{ data: FooterProps }> = ({ data }) => {
  return (
    <footer className="flex flex-col justify-center items-center">
      <div className="w-full flex flex-col lg:flex-row bg-green-400">
        <div className="w-full lg:w-1/2 flex flex-col text-white gap-3 lg:gap-6 p-6 lg:p-20">
          <div className="flex flex-col justify-start gap-2 mr-auto">
            <span className="text-3xl lg:text-5xl font-black">
              {data.brandDetail?.companyName}
            </span>
            <span className="text-lg lg:text-2xl font-light">
              {data.brandDetail?.companyFullname}
            </span>
            <div className="flex lg:justify-start items-start lg:items-center gap-2 lg:gap-6 text-md lg:text-xl">
              {data.brandDetail?.contacts.map((item) => (
                <div key={item.id} className="flex items-center gap-1">
                  <Icon name={item.icon as IconName} size={24} color="white" />
                  <span className="text-white">{item.value}</span>
                </div>
              ))}
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
          <div className="flex flex-col justify-start text-wrap text-base gap-1 lg:gap-3">
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
          {/* <NewsLetterSignup /> */}
        </div>
        <div className="w-full lg:w-1/2 relative h-[240px] lg:h-[640px]">
          <Image
            src={data.rootLayout?.footerImage.url as string}
            alt="Apec Plastic"
            fill
            sizes="(min-width: 1024px) 50%, 100%"
          />
        </div>
      </div>
      <div className="w-full bg-green-800 flex justify-center items-center text-white text-sm py-2 lg:text-2xl lg:py-4">
        {data.rootLayout?.copyrightStatement}
      </div>
    </footer>
  );
};

export default Footer;
