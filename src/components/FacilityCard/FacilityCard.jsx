// components/FacilityCard.jsx
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CiLocationOn, CiTimer } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import BookingButton from "./BookingButton"; // সেই আলাদা ক্লায়েন্ট বাটনটি
import { HiOutlineUsers } from "react-icons/hi";

const FacilityCard = ({
  id,
  image,
  tag,
  rating,
  title,
  location,
  price,
  capacity,
  availability,
}) => {
  return (
    <Link href={`/facilities/${id}`} className="block h-full group">
      <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden group-hover:shadow-2xl transition-all duration-500 flex flex-col h-full">
        {/* Image Section */}
        <div className="relative w-full h-52 sm:h-60 overflow-hidden">
          <Image
            alt={title}
            className="object-cover group-hover:scale-110 transition-transform duration-700"
            src={image || "https://placehold.co/600x400?text=No+Image"} // ফলব্যাক ইমেজ
            fill
          />
          {/* Tag & Rating UI ... */}
        </div>

        {/* Content Section */}
        <div className="p-6 flex flex-col grow">
          <h3 className="text-xl font-bold text-gray-800 line-clamp-1 group-hover:text-primary transition-colors mb-2">
            {title}
          </h3>
          {/* Location, Capacity, Availability UI ... */}

          <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center">
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
                Price
              </p>
              <p className="text-xl font-black text-gray-900">
                ৳{price}{" "}
                <span className="text-xs font-normal text-gray-400">/hr</span>
              </p>
            </div>
              <BookingButton id={id} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FacilityCard;
