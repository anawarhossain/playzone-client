import React from 'react';

const TimeSlot = ({ label, isSelected, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all border ${
        isSelected
          ? "bg-primary-container text-white border-primary-container shadow-md"
          : "bg-gray-50 text-gray-500 border-gray-100 hover:bg-gray-100"
      }`}
    >
      {label}
    </button>
  );
};

export default TimeSlot;