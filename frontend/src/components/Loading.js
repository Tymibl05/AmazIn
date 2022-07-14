import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Loading = () => {
  return (
    <div id="Loading">
      <div className="spinner">
        <FontAwesomeIcon icon="spinner" className="fa-spin-pulse" />
      </div>
      <p>Loading...</p>
    </div>
  );
};
