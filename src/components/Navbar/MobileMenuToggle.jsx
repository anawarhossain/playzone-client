"use client";

import { useState } from "react";
import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/facilities", label: "All Facilities" },
  { href: "/dashboard", label: "Dashboard" },
];

const MobileMenuToggle = ({ isLoggedIn = false }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {/* Hamburger button — mobile only */}
      <button
        className="md:hidden flex flex-col justify-center items-center gap-1.5 w-10 h-10 rounded-lg hover:bg-surface-container transition-colors"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Toggle menu"
        aria-expanded={open}
      >
        <span
          className={`block h-0.5 w-5 bg-on-surface transition-all duration-300 ${
            open ? "rotate-45 translate-y-2" : ""
          }`}
        />
        <span
          className={`block h-0.5 w-5 bg-on-surface transition-all duration-300 ${
            open ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block h-0.5 w-5 bg-on-surface transition-all duration-300 ${
            open ? "-rotate-45 -translate-y-2" : ""
          }`}
        />
      </button>

      {/* Mobile dropdown */}
      {open && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-outline-variant shadow-lg md:hidden z-50">
          <div className="flex flex-col px-6 py-4 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-3 px-2 text-on-surface font-medium hover:text-primary border-b border-outline-variant/40 last:border-0 transition-colors"
              >
                {link.label}
              </Link>
            ))}

            <div className="flex gap-3 pt-4">
              {isLoggedIn ? (
                <Link
                  href="/dashboard"
                  onClick={() => setOpen(false)}
                  className="flex-1 text-center py-2.5 bg-primary-container text-white font-bold rounded-xl text-sm"
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="flex-1 text-center py-2.5 border-2 border-primary-container text-primary font-bold rounded-xl text-sm hover:bg-primary/5 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setOpen(false)}
                    className="flex-1 text-center py-2.5 bg-primary-container text-white font-bold rounded-xl text-sm hover:brightness-110 transition-all"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileMenuToggle;
