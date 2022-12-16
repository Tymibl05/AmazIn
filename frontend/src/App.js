import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Nav } from './components/Nav';
import { SignIn } from './pages/SignIn';
import { HomePage } from './pages/HomePage';
import { ProductPage } from './pages/ProductPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCartPlus,
  faStar,
  faStarHalfAlt,
  faSpinner,
  faTrash,
  faCaretDown,
} from '@fortawesome/free-solid-svg-icons';
import { OrderDetails } from './pages/OrderDetails';
library.add(faCartPlus, faStar, faStarHalfAlt, faSpinner, faTrash, faCaretDown);

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:slug" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/orders/:id" element={<OrderDetails />} />
        </Routes>
      </main>
      <footer>
        <p>All Rights Reserved</p>
      </footer>
    </BrowserRouter>
  );
}

export default App;
