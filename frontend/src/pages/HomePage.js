import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import { data } from '../data';

export const HomePage = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('/api/products');
      setProducts(result.data);
    };
    fetchData();
  }, []);
  return (
    <>
      <h1>Featured Products</h1>
      <div className="products">
        {products.map((product) => (
          <div className="product" key={product.slug}>
            <Link to={`/product/${product.slug}`}>
              <img alt={product.name}></img>
            </Link>
            <div className="product-info">
              <Link to={`/product/${product.slug}`}>
                <h3>{product.name}</h3>
              </Link>
              <p>
                <strong>${product.price}</strong>
              </p>
            </div>
            <button>Add to cart</button>
          </div>
        ))}
      </div>
    </>
  );
};
