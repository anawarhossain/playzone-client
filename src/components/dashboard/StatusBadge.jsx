import React from "react";

// ✅ [নতুন] StatusBadge — BookingRow.jsx এ import করা হয়েছিল কিন্তু ফাইল ছিল না
const statusConfig = {
  Confirmed: {
    bg: "bg-green-50",
    text: "text-green-600",
    dot: "bg-green-500",
  },
  Pending: {
    bg: "bg-yellow-50",
    text: "text-yellow-600",
    dot: "bg-yellow-400",
  },
  Cancelled: {
    bg: "bg-red-50",
    text: "text-red-500",
    dot: "bg-red-400",
  },
};

const StatusBadge = ({ status }) => {
  const config = statusConfig[status] || {
    bg: "bg-gray-50",
    text: "text-gray-500",
    dot: "bg-gray-400",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${config.bg} ${config.text}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {status}
    </span>
  );
};

export default StatusBadge;
