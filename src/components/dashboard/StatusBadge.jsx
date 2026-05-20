import React from 'react';

const StatusBadge = ({ status }) => {
  const styles = {
    Confirmed: "bg-green-50 text-green-600 border-green-100",
    Pending: "bg-orange-50 text-orange-600 border-orange-100",
    Cancelled: "bg-red-50 text-red-600 border-red-100",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-[10px] font-bold border ${styles[status] || styles.Pending}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;