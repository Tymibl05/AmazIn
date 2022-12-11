import { useEffect } from 'react';
import { useReducer } from 'react';
import axios from 'axios';

export const useFetch = ({ url }) => {
  console.log('fetch products');
  
  const reducer = (state, action) => {
    switch (action.type) {
      case 'FETCH_REQUEST':
        return { ...state, loading: true };
      case 'FETCH_SUCCESS':
        return { ...state, product: action.payload, loading: false };
      case 'FETCH_FAIL':
        return { ...state, error: action.payload, loading: false };
      default:
        return state;
    }
  };

  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    products: [],
    loading: true,
    error: '',
  });
  useEffect = () => {};
  (async () => {
    dispatch({ type: 'FETCH_REQUEST' });
    try {
      const res = await axios.get(url);
      dispatch({ type: 'FETCH_SUCCESS', payload: res.data });
    } catch (err) {
      dispatch({ type: 'FETCH_FAIL', payload: err.message });
    }
  })();
  console.log({ loading, error, products });
  return { loading, error, products };
};
