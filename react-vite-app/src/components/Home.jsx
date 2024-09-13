import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Home.css";

function Home() {
  const [popularProducts, setPopularProducts] = useState([]);

  useEffect(() => {
    const fetchPopularProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/products?limit=9"
        );
        setPopularProducts(response.data);
      } catch (error) {
        console.error("Error fetching popular products:", error);
      }
    };

    fetchPopularProducts();
  }, []);

  return (
    <div className="home">
      <div className="hero">
        <h1>Welcome to Our Exquisite Jewelry Store</h1>
        <p>Discover timeless elegance and unparalleled craftsmanship</p>
        <Link to="/products" className="cta-button">
          Explore Our Collection
        </Link>
      </div>
      <div className="features">
        <div className="feature">
          <i className="fas fa-gem"></i>
          <h2>Premium Quality</h2>
          <p>Handcrafted with the finest materials</p>
        </div>
        <div className="feature">
          <i className="fas fa-shipping-fast"></i>
          <h2>Fast Shipping</h2>
          <p>Free delivery on orders over $500</p>
        </div>
        <div className="feature">
          <i className="fas fa-undo"></i>
          <h2>Easy Returns</h2>
          <p>30-day money-back guarantee</p>
        </div>
      </div>
      <div className="popular-products">
        <h2>Popular Products</h2>
        <div className="product-grid">
          {popularProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.imageUrl} alt={product.name} />
              <h3>{product.name}</h3>
              <p>${product.price.toFixed(2)}</p>
              <Link to={`/product/${product.id}`} className="view-button">
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
