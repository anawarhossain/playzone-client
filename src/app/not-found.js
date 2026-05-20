"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  HiOutlineHome,
  HiOutlineSearch,
  HiOutlineViewGrid,
} from "react-icons/hi";
import { IoFootball } from "react-icons/io5";
import { GiBasketballBall, GiBoxingGlove, GiShuttlecock, GiTennisBall, GiWeightLiftingUp } from "react-icons/gi";
import { LiaSwimmerSolid } from "react-icons/lia";


const NotFoundPage = () => {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 relative overflow-hidden text-center">
      {/* Background Decorative Icons (Faint Icons) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] text-gray-900">
        <GiBasketballBall className="absolute top-10 left-10 text-8xl -rotate-12" />
        <GiShuttlecock className="absolute top-20 right-20 text-7xl rotate-45" />
        <GiWeightLiftingUp className="absolute bottom-20 left-20 text-9xl -rotate-12" />
        <LiaSwimmerSolid className="absolute bottom-40 right-10 text-8xl" />
        <GiTennisBall className="absolute top-1/2 left-40 text-6xl" />
        <GiBoxingGlove className="absolute top-1/3 right-1/4 text-7xl -rotate-45" />
      </div>

      <div className="relative z-10 max-w-xl w-full">
        {/* Large 404 with Ball Icon */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center justify-center gap-2 mb-8"
        >
          <span className="text-[120px] md:text-[150px] font-black text-primary-container leading-none">
            4
          </span>
          <div className="relative group">
            <div className="absolute inset-0 bg-primary-container/20 rounded-full blur-xl group-hover:blur-2xl transition-all" />
            <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full border-[8px] md:border-[12px] border-primary-container flex items-center justify-center bg-white shadow-2xl">
              <IoFootball className="text-primary-container text-5xl md:text-7xl animate-spin-slow" />
            </div>
          </div>
          <span className="text-[120px] md:text-[150px] font-black text-primary-container leading-none">
            4
          </span>
        </motion.div>

        {/* Central Illustration (Whistle/Center Circle Concept) */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative w-48 h-48 md:w-64 md:h-64 mx-auto mb-10 group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-[2.5rem] shadow-2xl rotate-3 group-hover:rotate-0 transition-transform duration-500" />
          <div className="absolute inset-2 bg-gradient-to-tr from-rose-900/20 to-transparent rounded-[2.5rem]" />

          <div className="absolute inset-0 flex items-center justify-center">
            {/* 3D Button/Whistle Graphic */}
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-b from-gray-400 to-gray-600 shadow-[0_15px_40px_rgba(0,0,0,0.5)] flex items-center justify-center p-2">
              <div className="w-full h-full rounded-full bg-gradient-to-t from-gray-200 to-gray-400 border-4 border-gray-500 shadow-inner flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-gray-600/20" />
              </div>
            </div>
          </div>

          {/* Floating Question Badge */}
          <div className="absolute bottom-4 right-4 bg-primary-container text-white w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center shadow-xl rotate-12 group-hover:rotate-0 transition-all font-black text-xl">
            ?
          </div>
        </motion.div>

        {/* Content Section */}
        <div className="space-y-4 mb-10">
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">
            Oops! You&apos;re Offside!
          </h1>
          <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-md mx-auto">
            Looks like this page took a wrong turn. The facility you&apos;re
            looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link
            href="/"
            className="flex items-center gap-2 px-8 py-4 bg-primary-container text-white font-bold rounded-2xl shadow-xl shadow-primary-container/20 hover:brightness-110 active:scale-95 transition-all w-full sm:w-auto justify-center"
          >
            <HiOutlineHome size={20} />
            Back to Home
          </Link>

          <Link
            href="/facilities"
            className="flex items-center gap-2 px-8 py-4 bg-white border-2 border-primary-container text-primary-container font-bold rounded-2xl hover:bg-primary-container/5 transition-all w-full sm:w-auto justify-center"
          >
            <HiOutlineViewGrid size={20} />
            Browse Facilities
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFoundPage;
