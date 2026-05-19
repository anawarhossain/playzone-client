// components/MotionScroll.jsx
"use client";
import { motion } from "framer-motion";
import React from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }, // একটির পর একটি আসবে
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: 50 }, // ডান দিক থেকে বামে আসবে
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const MotionScroll = ({ children }) => {
  return (
    <div className="relative overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        drag="x" // মাউস বা আঙুল দিয়ে ডানে-বামে ড্র্যাগ করা যাবে
        dragConstraints={{ right: 0, left: -600 }} // আপনার কার্ডের সংখ্যা অনুযায়ী এটি এডজাস্ট হবে
        className="flex gap-6 cursor-grab active:cursor-grabbing px-2"
      >
        {React.Children.map(children, (child) => (
          <motion.div
            variants={itemVariants}
            className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-[380px]" // কার্ডের নির্দিষ্ট উইডথ
          >
            {child}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default MotionScroll;
