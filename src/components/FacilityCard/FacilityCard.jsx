// components/FacilityCard.jsx
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CiLocationOn } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import BookingButton from "./BookingButton"; // সেই আলাদা ক্লায়েন্ট বাটনটি

const FacilityCard = ({ id, image, tag, rating, title, location, price }) => {
  return (
    // কার্ডের ওপর ক্লিক করলে ডিটেইলস পেজে যাবে
    <Link href={`/facilities/${id}`} className="block h-full group">
      <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden group-hover:shadow-2xl transition-all duration-500 flex flex-col h-full cursor-pointer">
        {/* Image Section */}
        <div className="relative w-full h-52 sm:h-60 overflow-hidden">
          <Image
            alt={title}
            className="object-cover group-hover:scale-110 transition-transform duration-700"
            src={image || "/images/placeholder.jpg"}
            fill
            sizes="(max-w-768px) 100vw, 33vw"
          />

          {tag && (
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-primary shadow-sm">
              {tag}
            </div>
          )}

          <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1.5 border border-white/20">
            <FaStar className="text-amber-400 text-xs" />
            <span className="text-xs font-bold text-white">{rating}</span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-bold text-gray-800 line-clamp-1 group-hover:text-primary transition-colors mb-2">
            {title}
          </h3>

          <div className="flex items-start gap-1 text-gray-500 mb-6">
            <CiLocationOn className="text-lg shrink-0 mt-0.5 text-primary" />
            <span className="text-sm line-clamp-1">{location}</span>
          </div>

          {/* Footer Section */}
          <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center">
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase">
                Price
              </p>
              <p className="text-xl font-black text-gray-900">
                ${price}
                <span className="text-xs font-normal text-gray-400">/hr</span>
              </p>
            </div>

            {/* বুকিং বাটনে ক্লিক করলে যেন ডিটেইলস পেজে না যায়, তার জন্য ইভেন্ট হ্যান্ডেলিং বাটন কম্পোনেন্টে করা আছে */}

            <BookingButton id={id} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FacilityCard;
