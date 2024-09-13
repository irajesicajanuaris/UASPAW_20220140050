import React, { useState, Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import "./App.css";

const Home = lazy(() => import("./components/Home"));
const ProductList = lazy(() => import("./components/ProductList"));
const ProductDetail = lazy(() => import("./components/ProductDetail"));
const Cart = lazy(() => import("./components/Cart"));
const About = lazy(() => import("./components/About"));

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <CartProvider>
        <div className="App">
          <Navbar toggleSidebar={toggleSidebar} />
          <div className="content-wrapper">
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <main
              className={`main-content ${isSidebarOpen ? "sidebar-open" : ""}`}
            >
              <Suspense fallback={<div className="loading">Loading...</div>}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<ProductList />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/cart" element={<Cart />} />
                </Routes>
              </Suspense>
            </main>
          </div>
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
