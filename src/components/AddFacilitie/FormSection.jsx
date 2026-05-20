import React from 'react';

const FormSection = ({ title, children }) => {
    return (
      <div className="mb-10">
        <h3 className="text-primary-container font-bold text-lg mb-1 border-b border-gray-100 pb-2 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-primary-container rounded-full block"></span>
          {title}
        </h3>
        <div className="mt-6 space-y-5">{children}</div>
      </div>
    );
};

export default FormSection;