// app/facilities/[id]/page.jsx
import React from "react";
import Image from "next/image";
import { getSingleFacility } from "@/app/lib/data";
import InfoBadge from "@/components/DetailsPage/InfoBadge";
import AmenityChip from "@/components/DetailsPage/AmenityChip";
import {
  HiOutlineLocationMarker,
  HiOutlineUsers,
  HiOutlineCurrencyBangladeshi,
  HiOutlineClock,
} from "react-icons/hi";
import { FaStar, FaParking, FaFirstAid } from "react-icons/fa";
import BookingSidebar from "@/components/DetailsPage/BookingSidebar"; // আলাদা কম্পোনেন্ট
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";

const FacilityDetailsPage = async ({ params }) => {
  
  const paramslink = await params;
  const facility = await getSingleFacility(paramslink.id);
  // console.log(facility, "facililtyjdfhfdf")

  const {token} = await auth.api.getToken({
    headers: await headers()
  })
  // console.log(token)

  

  if (!facility)
    return <div className="py-20 text-center">Facility not found!</div>;

  return (
    <div className="min-h-screen bg-surface">
      <main className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column */}
          <div className="lg:col-span-8">
            <div className="relative w-full h-100 md:h-125 rounded-[2.5rem] overflow-hidden shadow-2xl">
              <Image
                src={facility.image}
                alt={facility.name}
                fill
                className="object-cover"
              />
            </div>

            <section className="mt-10">
              <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">
                {facility.name}
              </h1>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                <InfoBadge
                  icon={HiOutlineLocationMarker}
                  label="Location"
                  value={facility.location}
                />
                <InfoBadge
                  icon={HiOutlineUsers}
                  label="Capacity"
                  value={facility.capacity}
                />
                <InfoBadge
                  icon={HiOutlineCurrencyBangladeshi}
                  label="Price"
                  value={`৳${facility.price}/hr`}
                />
                <InfoBadge
                  icon={HiOutlineClock}
                  label="Status"
                  value="Available"
                />
              </div>

              <div className="mb-12">
                <h3 className="text-xl font-black text-gray-900 mb-4">
                  About This Facility
                </h3>
                <p className="text-gray-500 leading-relaxed">
                  {facility.description}
                </p>
              </div>
            </section>
          </div>

          {/* Right Column: Booking Sidebar (Client Component) */}
          <div className="lg:col-span-4">
            <BookingSidebar facility={facility} token={token} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default FacilityDetailsPage;
