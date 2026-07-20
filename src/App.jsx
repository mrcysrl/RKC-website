// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Services from "./pages/Services";
import News from "./pages/News";
import About from "./pages/About";
import Contact from "./pages/Contact"; // ✅ Import
import RFQ from "./pages/RFQ";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<ProductDetail />} />
          <Route path="news" element={<News />} />
          <Route path="news/:id" element={<News />} />
          <Route path="contact" element={<Contact />} />
          <Route path="rfq" element={<RFQ />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
