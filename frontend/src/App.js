import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { ProductPage } from './pages/ProductPage';

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
    </BrowserRouter>
  );
}

export default App;
