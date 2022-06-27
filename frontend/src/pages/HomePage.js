import { data } from '../data';
import { Link } from 'react-router-dom';

export const HomePage = () => {
  return (
    <>
      <h1>Featured Products</h1>
      <div className="products">
        {data.products.map((product) => (
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
