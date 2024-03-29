import { createContext, useContext, useState } from 'react';

const Store = createContext();
export const useStore = () => {
  return useContext(Store);
};

export function StoreProvider(props) {
  const [state, setState] = useState({
    user: localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : null,
    cart: localStorage.getItem('cart')
      ? JSON.parse(localStorage.getItem('cart'))
      : [],
  });

  const dispatch = {
    signup: (user) => {
      localStorage.setItem('user', JSON.stringify(user));
      setState({ ...state, user: user });
    },
    signin: (user) => {
      localStorage.setItem('user', JSON.stringify(user));
      setState({ ...state, user: user });
    },
    signout: () => {
      localStorage.removeItem('user');
      localStorage.removeItem('cart');
      setState({ user: null, cart: [] });
    },
    plusCart: (newItem) => {
      const existItem = state.cart.find((item) => item._id === newItem._id);
      const cart = existItem
        ? state.cart.map((item) =>
            item._id === existItem._id ? newItem : item
          )
        : [...state.cart, newItem];
      localStorage.setItem('cart', JSON.stringify([...cart]));
      setState({ ...state, cart: cart });
    },
    minusCart: (removeItem) => {
      const cartItems = state.cart.filter(
        (item) => item._id !== removeItem._id
      );
      localStorage.setItem('cart', JSON.stringify([...cartItems]));
      setState({ ...state, cart: [...cartItems] });
    },
    saveShipping: (shippingInfo) => {
      localStorage.setItem(
        'user',
        JSON.stringify({ ...state.user, shipping: shippingInfo })
      );
      setState({ ...state, user: { ...state.user, shipping: shippingInfo } });
    },
    savePayment: (paymentInfo) => {
      localStorage.setItem(
        'user',
        JSON.stringify({ ...state.user, payment: paymentInfo })
      );
      setState({ ...state, user: { ...state.user, payment: paymentInfo } });
    },
    clearCart: () => {
      localStorage.removeItem('cart');
      setState({
        ...state,
        cart: [],
      });
    },
    updateProfile: (value) => {
      const { name, email } = value;
      localStorage.setItem(
        'user',
        JSON.stringify({ ...state.user, name: name, email: email })
      );
      setState({ ...state, user: { ...state.user, name: name, email: email } });
    },
  };

  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
