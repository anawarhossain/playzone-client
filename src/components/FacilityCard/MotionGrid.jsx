// components/MotionGrid.jsx
"use client";
import { motion } from "framer-motion";

// কন্টেইনারের ভ্যারিয়েন্ট (চাইল্ডদের স্ট্যাগার করবে)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // একটির কতক্ষণ পর পরেরটি আসবে
    },
  },
};

// প্রতিটি কার্ডের ভ্যারিয়েন্ট
const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const MotionGrid = ({ children }) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }} // একবারই অ্যানিমেশন হবে
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {React.Children.map(children, (child) => (
        <motion.div variants={itemVariants}>{child}</motion.div>
      ))}
    </motion.div>
  );
};

import React from "react";
export default MotionGrid;
