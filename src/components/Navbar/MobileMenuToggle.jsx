"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "./constants/navigation";
import NavLink from "./NavLink";



const MobileMenuToggle = ({ isLoggedIn = false }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {/* Hamburger Button */}
      <button
        className="relative z-[70] w-10 h-10 flex flex-col justify-center items-center gap-1.5 bg-gray-50 rounded-xl"
        onClick={() => setOpen(!open)}
      >
        <span
          className={`h-0.5 w-5 bg-gray-900 transition-all ${open ? "rotate-45 translate-y-2" : ""}`}
        />
        <span
          className={`h-0.5 w-5 bg-gray-900 transition-all ${open ? "opacity-0" : ""}`}
        />
        <span
          className={`h-0.5 w-5 bg-gray-900 transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`}
        />
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60] md:hidden"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-white z-[65] shadow-2xl p-6 md:hidden flex flex-col"
            >
              <div className="mt-16 flex flex-col gap-2">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-4 mb-2">
                  Menu
                </p>
                {NAV_LINKS.map((link) => (
                  <NavLink
                    key={link.href}
                    href={link.href}
                    label={link.label}
                    isMobile // এখানে মোবাইল মোড অন করে দেওয়া হলো
                    onClick={() => setOpen(false)}
                  />
                ))}
              </div>

              {/* Mobile Auth Buttons */}
              <div className="mt-auto pb-10 space-y-3">
                {!isLoggedIn ? (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setOpen(false)}
                      className="block w-full text-center py-3.5 border-2 border-primary-container text-primary font-bold rounded-2xl"
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setOpen(false)}
                      className="block w-full text-center py-4 bg-primary-container text-white font-bold rounded-2xl shadow-lg shadow-primary-container/20"
                    >
                      Get Started
                    </Link>
                  </>
                ) : (
                  <Link
                    href="/dashboard"
                    onClick={() => setOpen(false)}
                    className="block w-full text-center py-4 bg-primary/5 text-primary font-bold rounded-2xl"
                  >
                    Go to Dashboard
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileMenuToggle;
