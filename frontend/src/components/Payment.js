import React, { useState } from 'react';
import { useStore } from '../Store';

export const Payment = ({ setStep }) => {
  const {
    state: {
      user: { payment },
    },
    dispatch,
  } = useStore();
  const [paymentMethod, setPaymentMethod] = useState(
    payment ? payment : 'paypal'
  );
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch.savePayment(paymentMethod);
    setStep((prev) => prev + 1);
  };
  return (
    <div id="Payment">
      <div>
        <h1>Payment Method</h1>
        <form action="" onSubmit={submitHandler}>
          <div>
            <input
              type="radio"
              name=""
              id=""
              value={'PayPal'}
              checked={paymentMethod === 'PayPal'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="">Paypal</label>
          </div>
          <div>
            <input
              type="radio"
              name=""
              id=""
              value={'Stripe'}
              checked={paymentMethod === 'Stripe'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="">Stripe</label>
          </div>
          <button type="submit" className="continue">
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};
