"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { USER_DROPDOWN_LINKS } from "./constants/navigation";
import { MdExpandMore } from "react-icons/md";
import { RiLogoutCircleLine } from "react-icons/ri";

const UserMenu = ({ userImage, userName, MemberSince }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const dateObj = new Date(MemberSince);
  const year = dateObj.getFullYear();

  // বাইরের কোথাও ক্লিক করলে মেনু বন্ধ হবে
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target))
        setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const initials =
    userName
      ?.split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "U";

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 cursor-pointer group focus:outline-none"
      >
        <div className="relative w-9 h-9 rounded-full overflow-hidden border-2 border-primary-container group-hover:scale-105 transition-transform">
          {userImage ? (
            <Image
              src={userImage}
              alt={userName}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-primary-container flex items-center justify-center text-white text-xs font-bold">
              {initials}
            </div>
          )}
        </div>
        <span
          className={`material-symbols-outlined text-secondary transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        >
          <MdExpandMore />
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 mt-3 w-60 bg-white rounded-2xl shadow-2xl border border-gray-100 z-[60] overflow-hidden"
          >
            <div className="px-5 py-4 bg-surface-container-low border-b border-gray-100">
              <p className="font-bold text-gray-900 truncate">
                {userName || "Sports Player"}
              </p>
              <p className="text-xs text-gray-500">Member since {year}</p>
            </div>
            <div className="p-2">
              {USER_DROPDOWN_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-primary/5 text-gray-700 hover:text-primary transition-colors text-sm font-medium"
                >
                  <span className="material-symbols-outlined text-lg">
                    {link.icon}
                  </span>
                  {link.label}
                </Link>
              ))}
              <div className="my-1 border-t border-gray-50" />
              <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-50 text-red-600 transition-colors text-sm font-medium w-full text-left cursor-pointer">
                <span className="material-symbols-outlined text-lg">
                  <RiLogoutCircleLine />
                </span>{" "}
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


export default UserMenu;
