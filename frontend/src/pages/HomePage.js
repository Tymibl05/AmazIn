import './HomePage.css';
import { useEffect, useReducer } from 'react';
import axios from 'axios';
import { Product } from '../components/Product';
// import logger from 'use-reducer-logger';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export const HomePage = () => {
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    products: [],
    loading: true,
    error: '',
  });
  useEffect(() => {
    (async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const res = await axios.get('/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: res.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    })();
  }, []);
  return (
    <div id="HomePage">
      <h1>Featured Products</h1>
      <div className="products">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          products.map((product) => (
            <Product key={product.slug} product={product} />
          ))
        )}
      </div>
    </div>
  );
};
