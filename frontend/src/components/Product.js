import React from 'react';
import { Link } from 'react-router-dom';
import { Rating } from './Rating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Product = ({ product }) => {
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
      <button>
        <FontAwesomeIcon icon="cart-plus" />
      </button>
    </div>
  );
};
