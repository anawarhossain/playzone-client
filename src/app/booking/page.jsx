"use server";

import React from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { FiCheckCircle, FiClock, FiXCircle } from "react-icons/fi";
import { HiOutlineTicket } from "react-icons/hi";
import Link from "next/link";
import {
  cancelBooking,
  getUserBookings,
  updateBookingStatus,
} from "../lib/data"; // ✅ updateBookingStatus import
import StatCard from "@/components/dashboard/StatCard";
import BookingRow from "@/components/dashboard/BookingRow";
import { auth } from "../lib/auth";

const BookingsPage = async ({ searchParams }) => {
  const param = await searchParams;

  // ১. সেশন চেক (সার্ভার সাইড)
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/login");

  const user = session.user;
  const activeTab = param.status || "All";

  const summaryData = await getUserBookings(user?.email, "All");

  // Active tab অনুযায়ী filter করা
  const allBookings =
    activeTab === "All"
      ? summaryData
      : summaryData.filter(
          (b) => b.status.toLowerCase() === activeTab.toLowerCase(),
        );

  // ৩. Stats calculation
  const stats = {
    total: summaryData.length,
    confirmed: summaryData.filter((b) => b.status === "Confirmed").length,
    pending: summaryData.filter((b) => b.status === "Pending").length,
    cancelled: summaryData.filter((b) => b.status === "Cancelled").length,
  };

  // ৪. Cancel Server Action
  async function handleCancelBooking(bookingId) {
    "use server";
    try {
      await cancelBooking(bookingId);
    } catch (error) {
      console.error("Cancel failed:", error.message);
      throw error;
    }
  }

  // ✅ ৫. Status Change Server Action
  async function handleStatusChange(bookingId, currentStatus, newStatus) {
    "use server";
    try {
      await updateBookingStatus(bookingId, currentStatus, newStatus);
    } catch (error) {
      console.error("Status update failed:", error.message);
      throw error;
    }
  }

  return (
    <div className="flex min-h-screen bg-[#F8F9FD] w-full">
      <main className="flex-1 p-4 md:p-8">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-black text-gray-900">My Bookings</h1>
            <p className="text-gray-500 text-sm">
              Manage your facility bookings
            </p>
          </div>

          {/* Tabs - URL based filtering */}
          <div className="flex bg-gray-100 p-1 rounded-xl gap-1 overflow-x-auto w-full md:w-auto">
            {["All", "Pending", "Confirmed", "Cancelled"].map((tab) => (
              <Link
                key={tab}
                href={`/booking?status=${tab}`}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  activeTab === tab
                    ? "bg-primary-container text-white shadow-md"
                    : "text-gray-500 hover:bg-white"
                }`}
              >
                {tab}
              </Link>
            ))}
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          <StatCard
            label="Total Bookings"
            value={stats.total}
            icon={HiOutlineTicket}
            colorClass="border-blue-500"
          />
          <StatCard
            label="Confirmed"
            value={stats.confirmed}
            icon={FiCheckCircle}
            colorClass="border-green-500"
          />
          <StatCard
            label="Pending"
            value={stats.pending}
            icon={FiClock}
            colorClass="border-gray-400"
          />
          <StatCard
            label="Cancelled"
            value={stats.cancelled}
            icon={FiXCircle}
            colorClass="border-red-500"
          />
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead className="bg-[#F1F4FF]">
                <tr>
                  {[
                    "Facility",
                    "Sport",
                    "Date",
                    "Time Slot",
                    "Duration",
                    "Price",
                    "Status",
                    "Action",
                  ].map((heading) => (
                    <th
                      key={heading}
                      className="p-4 text-[10px] font-black text-gray-500 uppercase tracking-widest"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {allBookings.map((booking) => {
                  const formattedBooking = {
                    ...booking,
                    facility: booking.facilityName,
                    time: booking.slot,
                    duration: `${booking.hours} hrs`,
                    date: {
                      day: new Date(booking.date).getDate(),
                      month: new Date(booking.date).toLocaleString("default", {
                        month: "short",
                      }),
                      year: new Date(booking.date).getFullYear(),
                    },
                  };
                  return (
                    <BookingRow
                      key={booking._id}
                      booking={formattedBooking}
                      onCancel={handleCancelBooking}
                      onStatusChange={handleStatusChange} // ✅ status change action পাস করা হচ্ছে
                    />
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {allBookings.length === 0 && (
            <div className="py-20 text-center flex flex-col items-center">
              <HiOutlineTicket size={50} className="text-gray-200 mb-4" />
              <p className="text-gray-400 font-bold">
                No {activeTab.toLowerCase()} bookings found!
              </p>
              <Link
                href="/facilities"
                className="mt-4 text-primary-container font-bold text-sm underline"
              >
                Book a facility now
              </Link>
            </div>
          )}

          {/* Table Footer */}
          <div className="p-4 flex justify-between items-center bg-gray-50/50">
            <p className="text-xs text-gray-400">
              Showing <span className="font-bold">{allBookings.length}</span>{" "}
              bookings
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookingsPage;
