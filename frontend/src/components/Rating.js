import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Rating = ({ rating, qtyReviews }) => {
  return (
    <div>
      <span className="stars">
        {rating >= 1 && <FontAwesomeIcon icon="star" />}
        {rating >= 2 && <FontAwesomeIcon icon="star" />}
        {rating >= 3 && <FontAwesomeIcon icon="star" />}
        {rating >= 4 && <FontAwesomeIcon icon="star" />}
        {rating >= 4.9 && <FontAwesomeIcon icon="star" />}
        {5 % rating <= 0.5 && <FontAwesomeIcon icon="star-half-alt" />}
      </span>
      <span className="reviews"> {qtyReviews} reviews</span>
    </div>
  );
};
