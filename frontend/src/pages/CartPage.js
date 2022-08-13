import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Store } from '../Store';
import './_cart.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export const CartPage = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const quantityHandler = () => {};
  return (
    <div id="Cart">
      {cartItems.length === 0 ? (
        <div>
          Cart is empty. <Link to="/">Go Shopping</Link>
        </div>
      ) : (
        <ul className="items">
          {cartItems.map((item) => (
            <li key={item._id}>
              <Link to={`/product/${item.slug}`} className="product">
                <img src={item.image} alt={item.name} />
                {item.name}
              </Link>
              <div className="quantity">
                <button
                  onClick={quantityHandler}
                  className={item.quantity === 1 ? 'disabled' : ''}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button onClick={quantityHandler}>+</button>
              </div>
              <span>${item.price}</span>
              <FontAwesomeIcon icon={faTrash} className="bounce" />
            </li>
          ))}
        </ul>
      )}
      <div className="summary">
        <h2>
          Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)} items):
          <br />${cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
        </h2>
        <button>Proceed to Checkout</button>
      </div>
    </div>
  );
};
