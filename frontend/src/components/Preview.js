import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../Store';

export const Preview = ({ setStep }) => {
  const {
    state: { user, cart },
  } = useStore();
  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
  const itemsPrice = round2(cart.reduce((a, c) => a + c.quantity * c.price, 0));
  const shippingPrice = itemsPrice > 100 ? round2(0) : round2(10);
  const taxPrice = round2(0.15 * itemsPrice);
  const totalPrice = itemsPrice + shippingPrice + taxPrice;
  const orderHandler = () => {};
  return (
    <div id="Preview">
      <div>
        <h1>Preview Order</h1>
        <div className="flex">
          <div className="flex-1">
            <div className="shipping">
              <h2>Shipping</h2>
              <div className="info">
                <div>
                  <h3>Name:</h3>
                  <p>{user.name}</p>
                </div>
                <div>
                  <h3>Address:</h3>
                  <p>
                    {user.shipping.address}, {user.shipping.city},{' '}
                    {user.shipping.country} {user.shipping.pcode}
                  </p>
                </div>
              </div>
              <p className="edit" onClick={() => setStep(2)}>
                Edit
              </p>
            </div>
            <div className="payment">
              <h2>Payment</h2>
              <div className="info">
                <div>
                  <h3>Method:</h3>
                  <p>{user.payment}</p>
                </div>
              </div>
              <p className="edit" onClick={() => setStep(3)}>
                Edit
              </p>
            </div>
            <div className="items">
              <h2>Items</h2>
              <div className="info">
                {cart.map((item) => (
                  <div key={item._id} className="item">
                    <div>
                      <Link to={`/product/${item.slug}`}>
                        <img src={item.image} alt="" />
                      </Link>
                      <Link to={`/product/${item.slug}`}>
                        <h4>{item.name}</h4>
                      </Link>
                    </div>
                    <div>
                      <h3>Qty:</h3>
                      <p>{item.quantity}</p>
                    </div>
                    <div>
                      <h3>Price:</h3>
                      <p>${item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/cart" className="edit">
                Edit
              </Link>
            </div>
          </div>
          <div className="summary flex-2">
            <h2>Order Summary</h2>
            <div className="info">
              <div>
                <h4>Items</h4>
                <p>${itemsPrice}</p>
              </div>
              <div>
                <h4>Shipping</h4>
                <p>${shippingPrice}</p>
              </div>
              <div>
                <h4>Tax</h4>
                <p>${taxPrice}</p>
              </div>
              <div>
                <h3>Order Total</h3>
                <h3>${totalPrice}</h3>
              </div>
            </div>
            <button onClick={orderHandler}>Place Order</button>
          </div>
        </div>
      </div>
    </div>
  );
};
