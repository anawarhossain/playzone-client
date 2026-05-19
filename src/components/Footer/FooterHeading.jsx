import React from 'react';

const FooterHeading = ({children}) => {
    return (
      <div>
        <h3 className="text-primary-container font-bold text-lg mb-6 tracking-wider">
          {children}
        </h3>
      </div>
    );
};

export default FooterHeading;