import React, { useState } from 'react';
import { useStore } from '../Store';

export const Shipping = ({ setStep }) => {
  const {
    state: {
      user: { shipping },
    },
    dispatch,
  } = useStore();
  const [form, setForm] = useState({
    name: shipping ? shipping.name : '',
    address: shipping ? shipping.address : '',
    city: shipping ? shipping.city : '',
    pcode: shipping ? shipping.pcode : '',
    country: shipping ? shipping.country : '',
  });
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch.saveShipping({ ...form });
    setStep((prev) => prev + 1);
  };
  return (
    <div id="Shipping">
      <div>
        <h1>Shipping Info</h1>
        <form action="" onSubmit={submitHandler}>
          <div>
            <label htmlFor="">Full Name</label>
            <input
              required
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="">Address</label>
            <input
              required
              type="text"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="">City</label>
            <input
              required
              type="text"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="">Postal Code</label>
            <input
              required
              type="text"
              value={form.pcode}
              onChange={(e) => setForm({ ...form, pcode: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="">Country</label>
            <input
              required
              type="text"
              value={form.country}
              onChange={(e) => setForm({ ...form, country: e.target.value })}
            />
          </div>
          <button type="submit" className="continue">
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};
