import React from 'react';

export const CheckoutSteps = ({ step }) => {
  return (
    <div className="steps">
      <h3 className={step >= 2 ? 'complete' : ''}>Sign In</h3>
      <h3 className={step >= 3 ? 'complete' : ''}>Shipping Info</h3>
      <h3 className={step >= 4 ? 'complete' : ''}>Payment</h3>
      <h3 className={step >= 5 ? 'complete' : ''}>Review</h3>
    </div>
  );
};
