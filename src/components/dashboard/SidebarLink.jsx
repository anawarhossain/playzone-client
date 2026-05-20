import Link from 'next/link';
import React from 'react';

const SidebarLink = ({ icon: Icon, label, active = false }) => {
  return (
    <Link
      href="#"
      className={`flex items-center gap-3 p-3 rounded-xl transition-all font-bold text-sm ${active ? "bg-primary-container text-white shadow-lg shadow-primary-container/20" : "text-gray-400 hover:bg-white/5 hover:text-white"}`}
    >
      <Icon size={20} /> {label}
    </Link>
  );
};

export default SidebarLink;