import React from "react";

const AmenityChip = ({ icon: Icon, label }) => {
  return (
    <div className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-100 rounded-xl hover:shadow-sm transition-shadow">
      <Icon className="text-primary-container" size={18} />
      <span className="text-xs font-bold text-gray-600">{label}</span>
    </div>
  );
};

export default AmenityChip;
