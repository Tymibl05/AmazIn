import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { ProductPage } from './pages/ProductPage';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCartPlus,
  faStar,
  faStarHalfAlt,
} from '@fortawesome/free-solid-svg-icons';
library.add(faCartPlus, faStar, faStarHalfAlt);

function App() {
  return (
    <BrowserRouter>
      <nav>
        <h1>
          <Link to="/">AmazIn</Link>
        </h1>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:slug" element={<ProductPage />} />
        </Routes>
      </main>
      <footer>
        <p>All Rights Reserved</p>
      </footer>
    </BrowserRouter>
  );
}

export default App;
