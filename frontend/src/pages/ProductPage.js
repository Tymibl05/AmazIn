import './ProductPage.css';
import { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import { Rating } from '../components/Rating';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getError } from '../utils';
import { useStore } from '../Store';

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

export const ProductPage = () => {
  const { slug } = useParams();
  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: '',
  }); // refactor into useState?
  useEffect(() => {
    (async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const res = await axios.get(`/api/products/slug/${slug}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: res.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    })();
  }, [slug]);

  const {
    state: { cart },
    dispatch: ctxDispatch,
  } = useStore();
  const addToCartHandler = async () => {
    const existItem = cart.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.qtyInStock < quantity) {
      window.alert('Sorry. Product is out of stock.');
    } else ctxDispatch.plusCart({ ...product, quantity });
  };
  return loading ? (
    <Loading />
  ) : error ? (
    <Error error={error} />
  ) : (
    <div id="ProductPage">
      <div className="flexL">
        <img src={product.image} alt={product.slug} />
        {product.qtyInStock > 0 ? (
          <div className="available">
            <p>In Stock</p>
            <button onClick={addToCartHandler}>
              <FontAwesomeIcon icon="cart-plus" />
            </button>
          </div>
        ) : (
          <div className="unavailable">
            <p>Out of Stock</p>
          </div>
        )}
      </div>
      <div className="flexR">
        <h1>{product.name}</h1>
        <Rating rating={product.rating} qtyReviews={product.qtyReviews} />
        <p>
          <strong>Price:</strong> ${product.price}
        </p>
        <p>
          <strong>Brand:</strong> {product.brand}
        </p>
        <div>
          <h3>About this item</h3>
          <p>{product.description}</p>
        </div>
      </div>
    </div>
  );
};
