import React from 'react';
import StatusBadge from './StatusBadge';
import Image from 'next/image';

const BookingRow = ({ booking }) => {
  return (
    <tr className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
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
        {booking.status !== "Cancelled" ? (
          <button className="text-[10px] font-bold text-red-500 border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors cursor-pointer">
            Cancel
          </button>
        ) : (
          <span className="text-[10px] italic text-gray-300">No Action</span>
        )}
      </td>
    </tr>
  );
};

export default BookingRow;