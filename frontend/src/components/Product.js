import React from 'react';
import { Link } from 'react-router-dom';
import { Rating } from './Rating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useStore } from '../Store';
import axios from 'axios';

export const Product = ({ product }) => {
  const {
    state: { cart },
    dispatch,
  } = useStore();
  const addToCartHandler = async () => {
    const existItem = cart.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.qtyInStock < quantity) {
      window.alert('Sorry. Product is out of stock.');
    } else dispatch.plusCart({ ...product, quantity });
  };
  return (
    <div id="Product">
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} alt={product.name}></img>
      </Link>
      <div className="product-info">
        <Link to={`/product/${product.slug}`}>
          <h3>{product.name}</h3>
        </Link>
        <Rating rating={product.rating} qtyReviews={product.qtyReviews} />
        <p>
          <strong>${product.price}</strong>
        </p>
      </div>
      {product.qtyInStock < 1 ? (
        <button disabled className="red-bg">
          Out of Stock
        </button>
      ) : (
        <button onClick={addToCartHandler}>
          <FontAwesomeIcon icon="cart-plus" />
        </button>
      )}
    </div>
  );
};
