import './App.scss';
import { useContext } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Store } from './Store';
import { HomePage } from './pages/HomePage';
import { ProductPage } from './pages/ProductPage';
import { CartPage } from './pages/CartPage';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCartPlus,
  faStar,
  faStarHalfAlt,
  faSpinner,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
library.add(faCartPlus, faStar, faStarHalfAlt, faSpinner, faTrash);

function App() {
  const { state } = useContext(Store);
  const { cart } = state;
  return (
    <BrowserRouter>
      <nav>
        <h1>
          <Link to="/">AmazIn</Link>
        </h1>
        <Link to="/cart" className="cart">
          Cart
          {cart.cartItems.length > 0 && (
            <div>{cart.cartItems.reduce((a, c) => a + c.quantity, 0)}</div>
          )}
        </Link>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:slug" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </main>
      <footer>
        <p>All Rights Reserved</p>
      </footer>
    </BrowserRouter>
  );
}

export default App;
