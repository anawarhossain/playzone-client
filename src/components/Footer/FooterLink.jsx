import Link from 'next/link';
import React from 'react';

const FooterLink = ({ href, children }) => {
  return (
    <li>
      <Link
        href={href}
        className="text-secondary hover:text-primary-container transition-colors duration-300 text-sm md:text-base"
      >
        {children}
      </Link>
    </li>
  );
};

export default FooterLink;