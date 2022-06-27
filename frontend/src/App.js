import './App.css';
import { data } from './data';

function App() {
  return (
    <div>
      <nav>
        <h1>
          <a href="/">AmazIn</a>
        </h1>
      </nav>
      <main>
        <h1>Featured Products</h1>
        <div className="products">
          {data.products.map((product) => (
            <div className="product" key={product.slug}>
              <a href={`/product/${product.slug}`}>
                <img alt={product.name}></img>
              </a>
              <div className="product-info">
                <a href={`/product/${product.slug}`}>
                  <h3>{product.name}</h3>
                </a>
                <p>
                  <strong>${product.price}</strong>
                </p>
              </div>
              <button>Add to cart</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
