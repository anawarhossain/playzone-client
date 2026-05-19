import Link from 'next/link';
import React from 'react';

const SocialIcon = ({ icon: Icon, href }) => {
    
  return (
    <Link
      href={href}
      className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-secondary hover:bg-primary-container hover:text-white transition-all duration-300 border border-white/10"
    >
      <Icon size={18} />
    </Link>
  );
};

export default SocialIcon;