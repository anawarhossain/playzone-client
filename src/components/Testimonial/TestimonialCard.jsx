// components/TestimonialCard.jsx
import Image from "next/image";
import React from "react";
import { FaStar } from "react-icons/fa";

const TestimonialCard = ({ name, image, rating = 5, comment }) => {
  return (
    <div className="bg-white rounded-[2rem] p-8 shadow-sm hover:shadow-md transition-shadow duration-300 border border-white/50 h-full flex flex-col">
      {/* Header: Avatar, Name and Rating */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative w-14 h-14 shrink-0">
          <Image
            src={image || "/images/avatar-placeholder.jpg"}
            alt={name}
            fill
            className="rounded-full object-cover border-2 border-gray-100"
          />
        </div>

        <div>
          <h4 className="font-bold text-gray-900 text-lg leading-tight">
            {name}
          </h4>
          <div className="flex items-center gap-1 mt-1">
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                size={14}
                className={index < rating ? "text-amber-400" : "text-gray-200"}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Quote / Comment */}
      <p className="text-gray-600 leading-relaxed italic text-base italic-font">
        &quot;{comment}&quot;
      </p>
    </div>
  );
};

export default TestimonialCard;
