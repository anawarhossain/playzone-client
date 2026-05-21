"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import StatusBadge from "./StatusBadge";
import Image from "next/image";

const BookingRow = ({ booking, onCancel }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState(null);

  // ✅ Cancel handler — server action কল করে, তারপর page refresh
  const handleCancel = () => {
    if (!confirm("Are you sure you want to cancel this booking?")) return;

    setError(null);
    startTransition(async () => {
      try {
        await onCancel(booking._id);
        router.refresh(); // ✅ page re-fetch করবে নতুন data সহ
      } catch (err) {
        setError("Failed to cancel. Please try again.");
      }
    });
  };

  return (
    <>
      <tr
        className={`border-b border-gray-50 hover:bg-gray-50/50 transition-colors ${
          isPending ? "opacity-50 pointer-events-none" : ""
        }`}
      >
        <td className="py-4 px-4">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0">
              <Image
                src={booking.image}
                alt={booking.facility}
                fill
                className="object-cover"
              />
            </div>
            <span className="font-bold text-gray-800 text-sm leading-tight">
              {booking.facility}
            </span>
          </div>
        </td>

        <td className="py-4 px-4">
          <span className="text-xs font-semibold text-primary-container bg-primary/5 px-2 py-1 rounded-md">
            {booking.sport}
          </span>
        </td>

        <td className="py-4 px-4">
          <div className="text-xs font-bold text-gray-700">
            <p>
              {booking.date.month} {booking.date.day}
            </p>
            <p className="text-gray-400 font-medium">{booking.date.year}</p>
          </div>
        </td>

        <td className="py-4 px-4 text-xs font-bold text-gray-600">
          {booking.time}
        </td>

        <td className="py-4 px-4 text-xs text-gray-500">{booking.duration}</td>

        <td className="py-4 px-4 font-black text-gray-900 text-sm">
          ৳{booking.price}
        </td>

        <td className="py-4 px-4">
          <StatusBadge status={booking.status} />
        </td>

        <td className="py-4 px-4">
          {booking.status === "Cancelled" ? (
            <span className="text-[10px] italic text-gray-300">No Action</span>
          ) : booking.status === "Confirmed" ? (
            // ✅ Confirmed বুকিং cancel করা যাবে না — UI-তেও বন্ধ
            <span className="text-[10px] italic text-gray-300">
              Contact support
            </span>
          ) : (
            <button
              onClick={handleCancel}
              disabled={isPending}
              className="text-[10px] font-bold text-red-500 border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors cursor-pointer disabled:opacity-40"
            >
              {isPending ? "Cancelling..." : "Cancel"}
            </button>
          )}
        </td>
      </tr>

      {/* ✅ Error message row */}
      {error && (
        <tr>
          <td colSpan={8} className="px-4 pb-2">
            <p className="text-xs text-red-500">{error}</p>
          </td>
        </tr>
      )}
    </>
  );
};

export default BookingRow;
