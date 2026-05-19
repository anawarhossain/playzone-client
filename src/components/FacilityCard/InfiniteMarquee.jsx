"use client";
import { motion } from "framer-motion";
import React from "react";

const InfiniteMarquee = ({ children, speed = 40 }) => {
  // কার্ডের লিস্টকে দুইবার রেন্ডার করা হচ্ছে যেন লুপটি নিরবচ্ছিন্ন (Seamless) হয়
  const duplicatedChildren = [
    ...React.Children.toArray(children),
    ...React.Children.toArray(children),
  ];

  return (
    <div className="relative flex overflow-hidden">
      {/* মেইন কন্টেইনার */}
      <motion.div
        className="flex gap-6 whitespace-nowrap"
        animate={{
          x: ["0%", "-50%"], // অর্ধেক পথ গেলে আবার শুরুতে ফিরে আসবে
        }}
        transition={{
          ease: "linear",
          duration: speed, // স্পিড কন্ট্রোল (যত বেশি হবে তত স্লো হবে)
          repeat: Infinity,
        }}
        // হোভার করলে স্ক্রোলিং থামবে (Optional)
        whileHover={{ animationPlayState: "paused" }}
      >
        {duplicatedChildren.map((child, index) => (
          <div
            key={index}
            className="shrink-0 w-75 sm:w-87 md:w-100"
          >
            {child}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default InfiniteMarquee;
