"use client";

import Link from "next/link";
import { useState } from "react";
import { X, Menu } from "lucide-react";
import { LayoutQuery } from "@/graphql/types/graphql";

const Navigation: React.FC<{ data: LayoutQuery["rootLayout"] }> = ({
  data,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="ml-auto lg:ml-0 bg-opacity-90 z-[9999]">
      <div className="container flex items-center justify-between mx-auto">
        <div className="lg:hidden">
          <button
            className="ml-auto select-none rounded-lg text-center align-middle text-xs font-medium uppercase text-inherit transition-all hover:bg-transparent focus:bg-transparent active:bg-transparent disabled:pointer-events-none disabled:opacity-50"
            onClick={toggleMobileMenu}
            type="button"
          >
            <Menu size={36} />
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`fixed top-0 left-0 min-h-screen w-screen bg-slate-100 shadow-lg transform transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          } lg:hidden z-50`}
        >
          <button onClick={toggleMobileMenu} className="absolute top-4 right-4">
            <X size={24} />
          </button>
          <ul className="flex flex-col h-full gap-6 p-4 mt-9 ml-9">
            {data?.navigtionLinks.map((item, index) => (
              <li
                key={index}
                className="flex items-center p-1 text-4xl gap-x-2 hover:text-green-400"
              >
                <Link
                  href={`/${item.page.slug}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center"
                >
                  {item.page.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Desktop Menu */}
        <div className="w-full hidden lg:block">
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
  );
};

export default Navigation;
