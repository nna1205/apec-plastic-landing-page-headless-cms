import { LayoutQuery } from "@/graphql/types/graphql";
import { Link } from "@/../i18n/routing";
import Image from "next/image";
import Icon, { IconName } from "@/components/LucideIcon";
import Navigation from "./Navigation";
import SearchModal from "@/components/SearchModal";
import LocaleSelector from "@/components/LocaleSelector";

type HeaderProps = LayoutQuery;

const Header: React.FC<{ data: HeaderProps }> = ({ data }) => {
  return (
    <header className="fixed top-0 left-0 w-screen z-50">
      <div className="w-full bg-green-800 flex items-center gap-6 py-3 px-6 lg:px-20 text-white text-sm lg:text-lg">
        {data.brandDetail?.contacts.map((item) => (
          <a key={item.id} className="flex justify-center items-center">
            <Icon
              name={item.icon as IconName}
              className="h-4 w-4 lg:w-6 lg:h-6"
            />
            <span className="ml-2 font-bold">{item.value}</span>
          </a>
        ))}
      </div>
      <div className="bg-white w-full px-6 lg:px-20 py-1 lg:py-3 relative flex lg:justify-between items-center shadow-sm">
        <Link href="/home" className="flex justify-center items-center gap-3">
          <div className="relative w-10 h-10 lg:w-16 lg:h-16">
            <Image
              src={data.brandDetail?.logo.url as string}
              alt="logo"
              fill
              sizes="(min-width: 1024px) 50%, 100%"
            />
          </div>
          <div className="hidden lg:flex lg:w-full flex-col items-start">
            <span className="line-clamp-1 text-2xl font-bold">
              {data.brandDetail?.companyName}
            </span>
            <span className="line-clamp-1 text-sm font-light">
              {data.brandDetail?.companyFullname}
            </span>
          </div>
        </Link>
        <Navigation data={data.rootLayout} />
        <div className="flex gap-2 items-center">
          <SearchModal />
          <LocaleSelector />
        </div>
      </div>
    </header>
  );
};

export default Header;
