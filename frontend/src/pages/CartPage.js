import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Store } from '../Store';
import axios from 'axios';
import './_cart.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export const CartPage = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const quantityHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock.');
    } else
      ctxDispatch({
        type: 'CART_ADD_ITEM',
        payload: { ...item, quantity },
      });
  };

  const removeItemHandler = (item) => {
    ctxDispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };
  return (
    <div id="Cart">
      {cartItems.length === 0 ? (
        <div className="empty">
          Cart is empty.{' '}
          <Link to="/" className="link">
            Go Shopping
          </Link>
        </div>
      ) : (
        <ul className="items">
          {cartItems.map((item) => (
            <li key={item._id}>
              <Link to={`/product/${item.slug}`} className="product">
                <img src={item.image} alt={item.name} />
                {item.name}
              </Link>
              <div className="right">
                <div className="quantity">
                  <button
                    onClick={() => quantityHandler(item, item.quantity - 1)}
                    className={item.quantity === 1 ? 'disabled' : ''}
                    disabled={item.quantity === 1}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => quantityHandler(item, item.quantity + 1)}
                    className={
                      item.quantity === item.qtyInStock ? 'disabled' : ''
                    }
                    disabled={item.quantity === item.qtyInStock}
                  >
                    +
                  </button>
                </div>
                <span>${item.price}</span>
                <FontAwesomeIcon
                  icon={faTrash}
                  className="bounce trash"
                  onClick={() => removeItemHandler(item)}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="summary">
        <h2>
          Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)} items):
          <br />${cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
        </h2>
        <button disabled={cartItems.length === 0}>Proceed to Checkout</button>
      </div>
    </div>
  );
};
