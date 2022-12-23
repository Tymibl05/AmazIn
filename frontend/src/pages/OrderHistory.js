import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../Store';
import './orderHistory.scss';

export const OrderHistory = () => {
  const navigate = useNavigate();
  const {
    state: { user },
  } = useStore();
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    if (!user) navigate('/signin');
    else
      (async () => {
        const url = `/api/orders/mine`;
        const res = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${user.token}`,
          },
        });
        if (!res.ok) {
          const err = await res.json();
          console.log(err);
          return;
        }
        const orders = await res.json();
        setOrders(orders);
      })();
  }, [user, navigate]);
  return (
    <div id="OrderHistory">
      <div>
        <h1>Order History</h1>
        <div>
          <header className="table">
            <h3>ID</h3>
            <h3>DATE</h3>
            <h3>TOTAL</h3>
            <h3>PAID</h3>
            <h3>DELIVERED</h3>
            <h3>ACTIONS</h3>
          </header>
          <div>
            {orders.map((order) => (
              <div className="table order" key={order._id}>
                <div>{order._id}</div>
                <div>{order.createdAt}</div>
                <div>${order.totalPrice}</div>
                <div>{order.is_paid ? 'Paid' : 'No'}</div>
                <div>{order.is_delivered ? 'Delivered' : 'No'}</div>
                <div>
                  <button onClick={() => navigate(`/order/${order._id}`)}>
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
