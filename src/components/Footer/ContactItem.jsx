import React from 'react';

const ContactItem = ({ icon: Icon, children }) => {
  return (
    <div className="flex items-start gap-3 group">
      <Icon className="text-primary-container text-xl shrink-0 mt-1 group-hover:scale-110 transition-transform" />
      <span className="text-secondary text-sm md:text-base leading-relaxed">
        {children}
      </span>
    </div>
  );
};

export default ContactItem;