import React from 'react';

export const Preview = () => {
  return (
    <div id="Preview">
      <div>
        <h1>Preview Order</h1>
        <div className="flex">
          <div>
            <div className="shipping">
              <h2>Shipping</h2>
            </div>
            <div className="payment">
              <h2>Payment</h2>
            </div>
            <div className="items">
              <h2>Itmes</h2>
            </div>
          </div>
          <div className="summary"></div>
        </div>
      </div>
    </div>
  );
};
