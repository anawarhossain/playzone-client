"use client";
import React, { useState } from "react";
import Image from "next/image";

import {
  FaStar,
  FaParking,
  FaSwimmingPool,
  FaWifi,
  FaFirstAid,
} from "react-icons/fa";
import { MdOutlineWash, MdOutlineDryCleaning } from "react-icons/md";
import { LuLightbulb } from "react-icons/lu";
import InfoBadge from "@/components/DetailsPage/InfoBadge";
import CustomInput from "@/components/SearchBar/CustomInput";
import { HiOutlineClock, HiOutlineCurrencyBangladeshi, HiOutlineLocationMarker, HiOutlineShieldCheck, HiOutlineUsers } from "react-icons/hi";
import CustomSelect from "@/components/SearchBar/CustomSelect";
import { HiCheckBadge } from "react-icons/hi2";
import AmenityChip from "@/components/DetailsPage/AmenityChip";

const FacilityDetailsPage = () => {
  const [hours, setHours] = useState(2);
  const pricePerHour = 800;

  const amenities = [
    { icon: FaParking, label: "Parking" },
    { icon: MdOutlineDryCleaning, label: "Changing Room" },
    { icon: LuLightbulb, label: "Floodlights" },
    { icon: FaFirstAid, label: "First Aid" },
    { icon: MdOutlineWash, label: "Washroom" },
  ];

  return (
    <div className="min-h-screen bg-surface">
      {/* Breadcrumbs */}
      <nav className="max-w-7xl mx-auto px-4 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
        Home &gt; All Facilities &gt;{" "}
        <span className="text-gray-900">Football Ground - Mirpur</span>
      </nav>

      <main className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Image & Content */}
          <div className="lg:col-span-8">
            {/* Image Gallery */}
            <section className="space-y-4">
              <div className="relative w-full h-[400px] md:h-[500px] rounded-[2.5rem] overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1574629810360-7efbbe195018"
                  alt="Main Ground"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-6 right-6 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full text-white text-xs font-bold border border-white/20">
                  1/4
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="relative h-24 md:h-32 rounded-3xl overflow-hidden cursor-pointer group"
                  >
                    <Image
                      src={`https://images.unsplash.com/photo-1544698310-74ea9d1c8258?q=${i}`}
                      alt="thumb"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform"
                    />
                    {i === 3 && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white font-bold text-xl">
                        +1
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Title & Stats */}
            <section className="mt-10">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 bg-primary/10 text-primary-container text-[10px] font-black uppercase rounded-full">
                  Football
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                Premium Football Ground - Mirpur
              </h1>

              <div className="flex flex-wrap items-center gap-6 mb-10">
                <div className="flex items-center gap-1.5">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <FaStar key={s} className="text-amber-400" size={14} />
                    ))}
                  </div>
                  <span className="text-sm font-black text-gray-800">4.8</span>
                  <span className="text-sm text-gray-400 font-medium">
                    (124 reviews)
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-green-500 text-sm font-bold">
                  <HiCheckBadge size={20} /> Verified
                </div>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                <InfoBadge
                  icon={HiOutlineLocationMarker}
                  label="Location"
                  value="Mirpur, Dhaka"
                />
                <InfoBadge
                  icon={HiOutlineUsers}
                  label="Capacity"
                  value="22 Players"
                />
                <InfoBadge
                  icon={HiOutlineCurrencyBangladeshi}
                  label="Price"
                  value="৳800/hour"
                />
                <InfoBadge
                  icon={HiOutlineClock}
                  label="Status"
                  value="Available"
                />
              </div>

              {/* About Section */}
              <div className="mb-12">
                <h3 className="text-xl font-black text-gray-900 mb-4">
                  About This Facility
                </h3>
                <p className="text-gray-500 leading-relaxed text-sm md:text-base">
                  Our Premium Football Ground in Mirpur is designed for
                  high-performance play. We feature professional-grade synthetic
                  turf that provides excellent ball roll and player comfort
                  while minimizing the risk of injury.
                  <br />
                  <br />
                  Whether you&apos;re organizing a corporate tournament or a
                  friendly weekend match, our facility offers the professional
                  atmosphere every player deserves.
                </p>
              </div>

              {/* Amenities */}
              <div>
                <h3 className="text-xl font-black text-gray-900 mb-6">
                  Amenities
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {amenities.map((item, i) => (
                    <AmenityChip key={i} icon={item.icon} label={item.label} />
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Booking Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              {/* Booking Card */}
              <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border border-gray-50 p-8">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-lg font-black text-gray-800">
                    Book This Facility
                  </h3>
                  <p className="text-2xl font-black text-gray-900">
                    ৳{pricePerHour}
                    <span className="text-xs text-gray-400 font-normal">
                      {" "}
                      / hour
                    </span>
                  </p>
                </div>

                <div className="space-y-5">
                  <CustomInput
                    label="Facility Name"
                    value="Premium Football Ground - Mirpur"
                    readOnly
                    className="bg-gray-50"
                  />
                  <CustomInput
                    label="Booking Date"
                    type="date"
                    icon={<HiOutlineClock size={20} />}
                  />
                  <CustomSelect
                    label="Select Time Slot"
                    options={["06:00 AM - 08:00 AM", "08:00 AM - 10:00 AM"]}
                  />

                  {/* Hours Counter */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                      Number of Hours
                    </label>
                    <div className="flex items-center justify-between border border-gray-100 rounded-2xl p-2 bg-gray-50">
                      <button
                        onClick={() => setHours(Math.max(1, hours - 1))}
                        className="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm hover:bg-gray-100 cursor-pointer font-bold text-xl"
                      >
                        -
                      </button>
                      <span className="font-black text-gray-800">{hours}</span>
                      <button
                        onClick={() => setHours(hours + 1)}
                        className="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm hover:bg-gray-100 cursor-pointer font-bold text-xl"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="bg-primary/5 rounded-2xl p-5 space-y-3 mt-8">
                    <div className="flex justify-between text-sm text-gray-500 font-medium">
                      <span>
                        ৳{pricePerHour} x {hours} hours
                      </span>
                      <span className="text-gray-900 font-bold">
                        ৳{pricePerHour * hours}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500 font-medium">
                      <span>Service Fee</span>
                      <span className="text-gray-900 font-bold">৳0</span>
                    </div>
                    <div className="pt-3 border-t border-primary/10 flex justify-between items-center">
                      <span className="text-gray-900 font-black">Total</span>
                      <span className="text-xl font-black text-primary-container">
                        ৳{pricePerHour * hours}
                      </span>
                    </div>
                  </div>

                  <button className="w-full py-4 bg-primary-container text-white font-black rounded-2xl shadow-xl shadow-primary-container/20 hover:brightness-110 transition-all active:scale-95 cursor-pointer">
                    Confirm Booking
                  </button>
                  <p className="text-center text-[10px] text-gray-400 font-bold uppercase">
                    Free cancellation before 24 hours
                  </p>
                </div>
              </div>

              {/* Security Badge */}
              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 flex gap-4 items-center">
                <div className="p-3 bg-white rounded-xl shadow-sm text-primary-container">
                  <HiOutlineShieldCheck size={28} />
                </div>
                <div>
                  <p className="text-xs font-black text-gray-800">
                    Payment Security
                  </p>
                  <p className="text-[10px] text-gray-400 font-medium leading-relaxed">
                    Your booking is protected by our secure payment system and
                    player guarantee.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FacilityDetailsPage;
