import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckoutSteps } from '../components/CheckoutSteps';
import { Shipping } from '../components/Shipping';
import { Payment } from '../components/Payment';
import { Preview } from '../components/Preview';
import { useStore } from '../Store';
import './checkout.scss';

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const {
    state: { user },
  } = useStore();
  const [step, setStep] = useState(user ? 2 : 1);
  useEffect(() => {
    if (!user) navigate('/signin?redirect=/checkout');
  }, [user, navigate]);
  return (
    <div id="Checkout">
      <CheckoutSteps step={step}></CheckoutSteps>
      {step === 2 && <Shipping setStep={setStep} />}
      {step === 3 && <Payment setStep={setStep} />}
      {step === 4 && <Preview setStep={setStep} />}
    </div>
  );
};
