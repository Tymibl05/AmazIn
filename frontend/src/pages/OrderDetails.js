import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Error } from '../components/Error';
import { Loading } from '../components/Loading';
import { useStore } from '../Store';
import './orderDetails.scss';

export const OrderDetails = () => {
  const navigate = useNavigate();
  const {
    state: { user },
  } = useStore();
  const { id } = useParams();
  const [state, setState] = useState({
    order: null,
    loading: true,
    error: null,
  });
  const { order, loading, error } = state;
  useEffect(() => {
    if (!user) navigate('/signin');
    else {
      const fetchOrder = async () => {
        const url = `/api/orders/${id}`;
        const res = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${user.token}`,
          },
        });
        const order = await res.json();
        if (!order._id) {
          const err = 'Order Not Found';
          setState((state) => ({
            ...state,
            error: err,
            loading: false,
          }));
        }
        setState((state) => ({ ...state, order: order, loading: false }));
      };
      fetchOrder();
    }
  }, [id, user, navigate]);
  return loading ? (
    <Loading />
  ) : error ? (
    <Error error={error} />
  ) : (
    <div id="OrderDetails">
      <div>
        <h1>Order {order._id}</h1>
        <div className="flex">
          <div className="flex-1">
            <div className="shipping">
              <h2>Shipping</h2>
              <div className="info">
                <div>
                  <h3>Name:</h3>
                  <p>{order.shipping.name}</p>
                </div>
                <div>
                  <h3>Address:</h3>
                  <p>{order.shipping.address}</p>
                </div>
              </div>
              {order.is_delivered ? (
                <div className="status complete">
                  <h3>Delivered</h3>
                </div>
              ) : (
                <div className="status incomplete">
                  <h3>Not Delivered</h3>
                </div>
              )}
            </div>
            <div className="payment">
              <h2>Payment</h2>
              <div className="info">
                <div>
                  <h3>Method:</h3>
                  <p>{order.payment}</p>
                </div>
              </div>
              {order.is_paid ? (
                <div className="status complete">
                  <h3>Paid</h3>
                </div>
              ) : (
                <div className="status incomplete">
                  <h3>Payment Error</h3>
                </div>
              )}
            </div>
            <div className="items">
              <h2>Items</h2>
              <div className="info">
                {order.items.map((item) => (
                  <div key={item._id} className="item">
                    <div className="link">
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
            </div>
          </div>
          <div className="summary flex-2">
            <h2>Order Summary</h2>
            <div className="info">
              <div>
                <h4>Items</h4>
                <p>${order.itemsPrice}</p>
              </div>
              <div>
                <h4>Shipping</h4>
                <p>${order.shippingPrice}</p>
              </div>
              <div>
                <h4>Tax</h4>
                <p>${order.taxPrice}</p>
              </div>
              <div>
                <h3>Order Total</h3>
                <h3>${order.totalPrice}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
