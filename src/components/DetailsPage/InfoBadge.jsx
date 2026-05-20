import React from 'react';

const InfoBadge = ({ icon: Icon, label, value }) => {
  return (
    <div className="bg-white p-4 rounded-2xl border border-gray-100 flex flex-col gap-2">
      <div className="flex items-center gap-2 text-primary-container">
        <Icon size={20} />
        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
          {label}
        </span>
      </div>
      <p className="text-sm font-bold text-gray-800">{value}</p>
    </div>
  );
};

export default InfoBadge;