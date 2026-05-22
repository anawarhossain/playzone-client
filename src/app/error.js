"use client"; // এরর পেজ অবশ্যই ক্লায়েন্ট কম্পোনেন্ট হতে হবে

import React, { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { HiOutlineRefresh } from "react-icons/hi";
import { FiAlertTriangle } from "react-icons/fi";
import Image from "next/image";
import { CiLogin } from "react-icons/ci";

export default function Error({ error, reset }) {

  useEffect(() => {
    console.error("App Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-center items-center justify-center p-6 relative overflow-hidden font-sans text-center">
      {/* Background Decorative Images (Corner Stadiums) */}
      <div className="absolute -bottom-20 -left-20 w-80 h-80 opacity-10 rotate-12 pointer-events-none">
        <Image
          src="https://images.unsplash.com/photo-1508098682722-e99c43a406b2"
          alt="stadium"
          fill
          className="object-cover rounded-3xl"
        />
      </div>
      <div className="absolute -top-20 -right-20 w-96 h-96 opacity-10 -rotate-12 pointer-events-none">
        <Image
          src="https://images.unsplash.com/photo-1574629810360-7efbbe195018"
          alt="stadium"
          fill
          className="object-cover rounded-3xl"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full z-10"
      >
        {/* Main Error Icon */}
        <div className="relative w-40 h-40 mx-auto mb-10">
          <div className="absolute inset-0 bg-orange-100 rounded-full animate-pulse" />
          <div className="absolute inset-4 bg-orange-50 rounded-full flex items-center justify-center shadow-inner">
            <span className="text-orange-500 text-7xl font-black italic">
              !
            </span>
          </div>
          {/* Small Warning Badge */}
          <div className="absolute top-4 right-4 bg-white shadow-lg rounded-lg p-1.5 border border-orange-100">
            <FiAlertTriangle className="text-orange-500" size={20} />
          </div>
        </div>

        {/* Text Content */}
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 tracking-tight">
          Unauthorized
        </h1>
        <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-md mx-auto mb-10">
          An unexpected error occurred on our end. Don&apos;t worry — it&apos;s
          not your fault. Please{" "}
          <span className="text-red-500 text-2xl font-bold">login</span>{" "}
          or and try again.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <button
            onClick={() => reset()}
            className="flex items-center gap-2 px-8 py-4 bg-primary-container text-white font-bold rounded-2xl shadow-xl shadow-primary-container/20 hover:brightness-110 active:scale-95 transition-all cursor-pointer  sm:w-auto text-center"
          >
            <HiOutlineRefresh size={20} />
            Try Again
          </button>

          <Link
            href="/login"
            className="flex items-center gap-2 px-8 py-4 bg-white border-2 border-primary-container/30 text-primary-container font-bold rounded-2xl hover:bg-primary-container/5 transition-all  sm:w-auto sm:text-center"
          >
            <CiLogin className="" size={20} />
            Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
