"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Menu, X } from "lucide-react";
import { useState } from "react";
import SearchComponent from "../Search/page";

interface NavLink {
  href: string;
  label: string;
}

interface NavbarClientProps {
  navLinks: NavLink[];
  authButton: React.ReactNode;
}

export default function NavbarClient({ navLinks, authButton }: NavbarClientProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-3xl font-extrabold tracking-wide text-orange-500"
        >
          Foodie 🍔
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden items-center gap-3 md:flex">
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`rounded-xl px-5 py-2 text-sm font-medium transition-all duration-300
                  ${isActive
                    ? "bg-orange-500 text-white shadow-lg"
                    : "text-gray-700 hover:bg-orange-100 hover:text-orange-500"
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <SearchComponent />
          <Link
            href="/favorites"
            className="hover:text-orange-500 transition-all duration-300"
          >
            <Heart size={20} className="transition-all duration-300 hover:fill-orange-500" />
          </Link>
          {authButton}
        </div>

        {/* Mobile: AuthButton + Hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          {authButton}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-lg p-2 transition hover:bg-orange-100"
          >
            {isOpen ? (
              <X className="text-orange-500" size={28} />
            ) : (
              <Menu className="text-orange-500" size={28} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden transition-all duration-300 md:hidden
          ${isOpen ? "max-h-[500px] border-t" : "max-h-0"}
        `}
      >
        <ul className="flex flex-col gap-2 bg-white px-6 py-4">
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className={`block rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300
                    ${isActive
                      ? "bg-orange-500 text-white shadow-lg"
                      : "text-gray-700 hover:bg-orange-100 hover:text-orange-500"
                    }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}

          {/* Favorite */}
          <li>
            <Link
              href="/favorites"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium
              text-gray-700 transition-all duration-300
              hover:bg-orange-100 hover:text-orange-500"
            >
              Favorite
              <Heart size={20} className="transition-all duration-300 hover:fill-orange-500" />
            </Link>
          </li>

          {/* Search */}
          <li className="px-4 py-2">
            <SearchComponent />
          </li>
        </ul>
      </div>
    </nav>
  );
}