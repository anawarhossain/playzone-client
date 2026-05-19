import React from "react";
import Link from "next/link";
import { IoLogoIonic } from "react-icons/io";
import UserMenu from "./UserMenu";
import MobileMenuToggle from "./MobileMenuToggle";
import NavLink from "./NavLink";
import { NAV_LINKS } from "./constants/navigation";

const Navbar = ({ isLoggedIn = false, userImage, userName }) => {
  return (
    <nav className="sticky top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="bg-primary-container p-2 rounded-xl group-hover:rotate-12 transition-transform">
            <IoLogoIonic size={24} className="text-white" />
          </div>
          <span className="text-2xl font-black tracking-tight text-gray-900">
            Play<span className="text-primary-container">Zone</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <div key={link.href} className="px-4">
              <NavLink href={link.href} label={link.label} />
            </div>
          ))}
        </div>

        {/* Desktop Auth/User Area */}
        <div className="hidden md:flex items-center gap-5">
          {isLoggedIn ? (
            <UserMenu userImage={userImage} userName={userName} />
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="text-sm font-bold text-gray-700 hover:text-primary px-4 py-2 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="bg-primary-container text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-primary-container/30 transition-all active:scale-95"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <MobileMenuToggle isLoggedIn={isLoggedIn} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
