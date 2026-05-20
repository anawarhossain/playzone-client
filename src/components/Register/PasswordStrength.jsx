import React from 'react';

const PasswordStrength = ({ strength }) => {
  return (
    <div className="flex gap-1.5 mt-3 mb-4">
      <div
        className={`h-1.5 flex-1 rounded-full transition-colors ${strength >= 1 ? "bg-red-500" : "bg-gray-100"}`}
      />
      <div
        className={`h-1.5 flex-1 rounded-full transition-colors ${strength >= 2 ? "bg-yellow-400" : "bg-gray-100"}`}
      />
      <div
        className={`h-1.5 flex-1 rounded-full transition-colors ${strength >= 3 ? "bg-blue-200" : "bg-gray-100"}`}
      />
    </div>
  );
};

export default PasswordStrength;