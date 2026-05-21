"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import StatusBadge from "./StatusBadge";
import Image from "next/image";

const BookingRow = ({ booking, onCancel, onStatusChange }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isStatusPending, startStatusTransition] = useTransition();
  const [error, setError] = useState(null);
  const [hasStatusChanged, setHasStatusChanged] = useState(false); // একবারই পরিবর্তন করা যাবে

  // ✅ Cancel handler
  const handleCancel = () => {
    if (!confirm("Are you sure you want to cancel this booking?")) return;

    setError(null);
    startTransition(async () => {
      try {
        await onCancel(booking._id);
        router.refresh();
      } catch (err) {
        setError("Failed to cancel. Please try again.");
      }
    });
  };

  // ✅ Status change handler — একবারই কাজ করবে
  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    if (!newStatus || hasStatusChanged) return;

    if (!confirm(`Change status to "${newStatus}"?`)) return;

    setError(null);
    startStatusTransition(async () => {
      try {
        await onStatusChange(booking._id, booking.status, newStatus);
        setHasStatusChanged(true); // ✅ lock করে দাও
        router.refresh();
      } catch (err) {
        setError("Failed to update status. Please try again.");
      }
    });
  };

  const isRowDisabled = isPending || isStatusPending;

  return (
    <>
      <tr
        className={`border-b border-gray-50 hover:bg-gray-50/50 transition-colors ${
          isRowDisabled ? "opacity-50 pointer-events-none" : ""
        }`}
      >
        {/* Facility */}
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

        {/* Sport */}
        <td className="py-4 px-4">
          <span className="text-xs font-semibold text-primary-container bg-primary/5 px-2 py-1 rounded-md">
            {booking.sport}
          </span>
        </td>

        {/* Date */}
        <td className="py-4 px-4">
          <div className="text-xs font-bold text-gray-700">
            <p>
              {booking.date.month} {booking.date.day}
            </p>
            <p className="text-gray-400 font-medium">{booking.date.year}</p>
          </div>
        </td>

        {/* Time Slot */}
        <td className="py-4 px-4 text-xs font-bold text-gray-600">
          {booking.time}
        </td>

        {/* Duration */}
        <td className="py-4 px-4 text-xs text-gray-500">{booking.duration}</td>

        {/* Price */}
        <td className="py-4 px-4 font-black text-gray-900 text-sm">
          ৳{booking.price}
        </td>

        {/* Status */}
        <td className="py-4 px-4">
          <StatusBadge status={booking.status} />
        </td>

        {/* Action */}
        <td className="py-4 px-4">
          {booking.status === "Cancelled" ? (
            <span className="text-[10px] italic text-gray-300">No Action</span>
          ) : booking.status === "Confirmed" ? (
            <span className="text-[10px] italic text-gray-300">
              Contact support
            </span>
          ) : (
            // Pending — Cancel বাটন + Status Change Select
            <div className="flex items-center gap-2 flex-wrap">
              {/* Cancel Button */}
              <button
                onClick={handleCancel}
                disabled={isPending || isStatusPending}
                className="text-[10px] font-bold text-red-500 border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors cursor-pointer disabled:opacity-40"
              >
                {isPending ? "Cancelling..." : "Cancel"}
              </button>

              {/* Status Select — একবারই পরিবর্তন করা যাবে */}
              <select
                onChange={handleStatusChange}
                disabled={hasStatusChanged || isStatusPending || isPending}
                defaultValue=""
                title={
                  hasStatusChanged
                    ? "Status already changed once"
                    : "Change status"
                }
                className={`text-[10px] font-bold border rounded-lg px-2 py-1.5 cursor-pointer transition-colors outline-none
                  ${
                    hasStatusChanged
                      ? "border-gray-100 text-gray-300 bg-gray-50 cursor-not-allowed"
                      : "border-blue-200 text-blue-500 bg-white hover:bg-blue-50"
                  }
                  disabled:opacity-50 disabled:cursor-not-allowed
                `}
              >
                <option value="" disabled>
                  {isStatusPending
                    ? "Updating..."
                    : hasStatusChanged
                      ? "Changed ✓"
                      : "Set Status"}
                </option>
                <option value="Confirmed">Confirmed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          )}
        </td>
      </tr>

      {/* Error Row */}
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
