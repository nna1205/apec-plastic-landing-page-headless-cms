"use client";

import { Link } from "@/../i18n/routing";
import React, { useState } from "react";
import { X, Menu, CornerUpRight } from "lucide-react";
import { LayoutQuery } from "@/graphql/types/graphql";
import SearchModal from "@/components/SearchModal/";
import LocaleSelector from "@/components/LocaleSelector";
import Image from "next/image";

export const MobileMenu: React.FC<{
  data: LayoutQuery;
}> = ({ data }) => {
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="lg:ml-0 bg-opacity-90 lg:hidden mr-3">
      <div className="lg:hidden">
        <button
          className="ml-auto select-none rounded-lg text-center align-middle text-xs font-medium uppercase text-inherit transition-all hover:bg-transparent focus:bg-transparent active:bg-transparent disabled:pointer-events-none disabled:opacity-50"
          onClick={toggleMobileMenu}
          type="button"
          aria-label="Open menu"
        >
          <Menu size={36} />
        </button>
      </div>
      <div
        className={`fixed top-0 left-0 min-h-screen w-screen px-6 flex flex-col gap-y-9 bg-slate-100 shadow-lg transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:hidden z-50`}
      >
        <button
          type="button"
          aria-label="Close menu"
          onClick={toggleMobileMenu}
          className="absolute top-8 right-8"
        >
          <X size={24} />
        </button>
        <ul className="flex flex-col h-full gap-y-9 py-3 mt-20">
          {data?.rootLayout?.navigtionLinks.map((item, index) => (
            <li
              key={index}
              className="flex items-center text-4xl gap-x-2 hover:text-green-400"
            >
              <Link
                href={`/${item.page.slug}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full flex items-center"
              >
                {item.page.title}
                <CornerUpRight size={16} className="ml-auto mr-6" />
              </Link>
            </li>
          ))}
        </ul>
        <LocaleSelector />
        <div className="mt-auto mb-20 w-full flex lg:flex-col justify-between lg:justify-items-start lg:gap-6">
          <div className="flex justify-center items-center gap-2 lg:gap-3">
            <div className="block relative w-10 h-10 lg:w-24 lg:h-24">
              <Image
                src={data?.brandDetail?.logo.url as string}
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
      </div>
    </nav>
  );
};

export const DesktopMenu: React.FC<{ data: LayoutQuery["rootLayout"] }> = ({
  data,
}) => {
  return (
    <>
      <nav className="hidden lg:block ml-auto lg:ml-0 bg-opacity-90">
        <div className="container flex items-center justify-between mx-auto">
          <div className="w-full">
            <ul className="flex gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
              {data?.navigtionLinks.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center p-1 text-lg gap-x-2 hover:text-green-400"
                >
                  <Link
                    href={`/${item.page.slug}`}
                    className="line-clamp-1 flex items-center"
                  >
                    {item.page.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
      <div className="ml-auto lg:ml-0 flex gap-2 items-center">
        <SearchModal />
        <div className="hidden lg:inline-block">
          <LocaleSelector />
        </div>
      </div>
    </>
  );
};
