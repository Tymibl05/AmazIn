import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../Store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Nav = () => {
  const navigate = useNavigate();
  const {
    state: { user, cart },
    dispatch,
  } = useStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const signout = () => {
    dispatch.signout();
    navigate('/');
  };
  return (
    <nav>
      <h1>
        <Link to="/">AmazIn</Link>
      </h1>
      <Link to="/cart" className="cart">
        Cart
        {cart.length > 0 && (
          <div>{cart.reduce((a, c) => a + c.quantity, 0)}</div>
        )}
      </Link>
      {user ? (
        <div className="user" onClick={() => setDropdownOpen(!dropdownOpen)}>
          <p>{user.name}</p>
          <button className="dropButton">
            <FontAwesomeIcon icon="caret-down" />
          </button>
          {dropdownOpen && (
            <div className="dropdown">
              <div>User Profile</div>
              <div>Order&nbsp;History</div>
              <div className="signout" onClick={signout}>
                Sign Out
              </div>
            </div>
          )}
        </div>
      ) : (
        <Link to="/signin">Sign In</Link>
      )}
    </nav>
  );
};
