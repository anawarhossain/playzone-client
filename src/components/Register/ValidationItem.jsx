import React from 'react';

const ValidationItem = ({ label, isValid }) => {
  return (
    <div
      className={`flex items-center gap-2 text-[10px] font-bold ${isValid ? "text-green-500" : "text-gray-300"}`}
    >
      <div
        className={`w-3.5 h-3.5 rounded-full flex items-center justify-center border ${isValid ? "bg-green-500 border-green-500" : "border-gray-200"}`}
      >
        {isValid && <span className="text-white text-[8px]">✓</span>}
      </div>
      {label}
    </div>
  );
};

export default ValidationItem;