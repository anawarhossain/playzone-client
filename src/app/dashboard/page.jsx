import BookingRow from "@/components/dashboard/BookingRow";
import SidebarLink from "@/components/dashboard/SidebarLink";
import StatCard from "@/components/dashboard/StatCard";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  FiCheckCircle,
  FiClock,
  FiGrid,
  FiPlusCircle,
  FiXCircle,
} from "react-icons/fi";
import { HiOutlineTicket } from "react-icons/hi";
import {
  LuCalendarDays,
  LuLayoutDashboard,
  LuLogOut,
  LuSettings,
  LuUsers,
} from "react-icons/lu";

const BOOKINGS_DATA = [
  {
    id: 1,
    facility: "Premium Football Ground",
    sport: "Football",
    date: { month: "Oct", day: "25", year: "2024" },
    time: "6AM - 8AM",
    duration: "2 hrs",
    price: "1,600",
    status: "Confirmed",
    image: "https://images.unsplash.com/photo-1544698310-74ea9d1c8258",
  },
  {
    id: 2,
    facility: "Cricket Nets",
    sport: "Cricket",
    date: { month: "Oct", day: "26", year: "2024" },
    time: "4PM - 6PM",
    duration: "2 hrs",
    price: "1,200",
    status: "Pending",
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da",
  },
  {
    id: 1,
    facility: "Premium Football Ground",
    sport: "Football",
    date: { month: "Oct", day: "25", year: "2024" },
    time: "6AM - 8AM",
    duration: "2 hrs",
    price: "1,600",
    status: "Confirmed",
    image: "https://images.unsplash.com/photo-1544698310-74ea9d1c8258",
  },
  {
    id: 2,
    facility: "Cricket Nets",
    sport: "Cricket",
    date: { month: "Oct", day: "26", year: "2024" },
    time: "4PM - 6PM",
    duration: "2 hrs",
    price: "1,200",
    status: "Pending",
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da",
  },
];

const DashboardPage = () => {
  return (
    <div className="flex min-h-screen bg-[#F8F9FD]">
      {/* Sidebar */}
      <aside className="w-64 bg-inverse-surface text-white flex flex-col p-6 sticky top-0 h-screen">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-10 h-10 rounded-full bg-primary-container overflow-hidden border-2 border-white/20">
            <Image
              src="https://i.pravatar.cc/150?u=admin"
              width={40}
              height={40}
              alt="User"
            />
          </div>
          <div>
            <p className="text-sm font-bold truncate">Admin User</p>
            <p className="text-[10px] text-gray-400 truncate">
              admin@playzone.com
            </p>
          </div>
        </div>

        <nav className="space-y-2 flex-grow">
          <SidebarLink icon={LuLayoutDashboard} label="Dashboard" />
          <SidebarLink icon={LuCalendarDays} label="Bookings" active />
          <SidebarLink icon={FiGrid} label="Facilities" />
          <SidebarLink icon={LuUsers} label="Customers" />
          <SidebarLink icon={LuSettings} label="Settings" />
        </nav>

        <button className="flex items-center gap-3 text-gray-400 hover:text-red-400 p-3 transition-colors mt-auto text-sm font-bold">
          <LuLogOut size={20} /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-black text-gray-900">Add New Facilitie</h1>
        <Link
          className="text-primary-container font-bold text-2xl"
          href={"/dashboard/new"}
        >
          <FiPlusCircle className="" />
        </Link>
        </div>

        {/* Header */}
        <header className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-black text-gray-900">My Bookings</h1>
            <p className="text-gray-500 text-sm">
              Manage all your facility bookings with ease
            </p>
          </div>
          <div className="flex bg-gray-100 p-1 rounded-xl gap-1">
            {["All", "Pending", "Confirmed", "Cancelled"].map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${tab === "All" ? "bg-primary-container text-white shadow-md" : "text-gray-500 hover:bg-white"}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <StatCard
            label="Total Bookings"
            value="12"
            icon={HiOutlineTicket}
            colorClass="border-blue-500"
          />
          <StatCard
            label="Confirmed"
            value="8"
            icon={FiCheckCircle}
            colorClass="border-green-500"
          />
          <StatCard
            label="Pending"
            value="3"
            icon={FiClock}
            colorClass="border-gray-400"
          />
          <StatCard
            label="Cancelled"
            value="1"
            icon={FiXCircle}
            colorClass="border-red-500"
          />
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#F1F4FF]">
              <tr>
                <th className="p-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                  Facility
                </th>
                <th className="p-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                  Sport
                </th>
                <th className="p-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                  Date
                </th>
                <th className="p-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                  Time Slot
                </th>
                <th className="p-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                  Duration
                </th>
                <th className="p-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                  Price
                </th>
                <th className="p-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                  Status
                </th>
                <th className="p-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {BOOKINGS_DATA.map((booking, index) => (
                <BookingRow key={index} booking={booking} />
              ))}
            </tbody>
          </table>

          {/* Footer of table */}
          <div className="p-4 flex justify-between items-center bg-gray-50/50">
            <p className="text-xs text-gray-400">
              Showing <span className="font-bold">1 to 5</span> of 12 bookings
            </p>
            <div className="flex items-center gap-1">
              <button className="p-1 text-gray-400">{"<"}</button>
              <button className="w-8 h-8 rounded-lg bg-primary-container text-white font-bold text-xs">
                1
              </button>
              <button className="w-8 h-8 rounded-lg text-gray-400 font-bold text-xs">
                2
              </button>
              <button className="p-1 text-gray-400">{">"}</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
