// components/dashboard/StatCard.jsx
import React from "react";

const StatCard = ({ label, value, icon: Icon, colorClass }) => (
  <div
    className={`bg-white p-6 rounded-2xl shadow-sm border-l-4 ${colorClass} flex justify-between items-start`}
  >
    <div>
      <p className="text-gray-500 text-sm font-medium mb-1">{label}</p>
      <h3 className="text-3xl font-black text-gray-900">{value}</h3>
    </div>
    <div className="p-2 bg-gray-50 rounded-lg text-gray-400">
      <Icon size={20} />
    </div>
  </div>
);

export default StatCard;
