"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, USER_DROPDOWN_LINKS } from "./constants/navigation";
import NavLink from "./NavLink";
import { RiLogoutCircleLine } from "react-icons/ri";
import { authClient } from "@/app/lib/auth-client";
import { useRouter } from "next/navigation";



const MobileMenuToggle = ({ isLoggedIn = false, user }) => {
  const [open, setOpen] = useState(false);
  
    const router = useRouter();

  const LogoutHandeler = async () => {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/login"); // redirect to login page
          },
        },
      });
    };

  return (
    <>
      {/* Hamburger Button */}
      <button
        className="relative z-70 w-10 h-10 flex flex-col justify-center items-center gap-1.5 bg-gray-50 rounded-xl"
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
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-60 md:hidden"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[80%] max-w-sm  z-60 shadow-2xl p-6 md:hidden flex flex-col"
            >
              <div className="mt-16 flex flex-col gap-2">
                
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
                  <div className="p-2 ">
                    {USER_DROPDOWN_LINKS.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        // onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-primary/5  hover:text-primary transition-colors text-sm font-medium"
                      >
                        <span className="material-symbols-outlined text-lg">
                          {link.icon}
                        </span>
                        {link.label}
                      </Link>
                    ))}
                    <div className="my-1 border-t border-gray-50" />
                    <button
                      onClick={LogoutHandeler}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-50 text-red-600 transition-colors text-sm font-medium w-full text-left cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-lg">
                        <RiLogoutCircleLine />
                      </span>{" "}
                      Logout
                    </button>
                  </div>
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
