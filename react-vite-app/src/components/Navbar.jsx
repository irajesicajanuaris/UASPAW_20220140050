import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { FaHome, FaShoppingCart, FaInfoCircle, FaGem } from "react-icons/fa";
import "./Navbar.css";

function Navbar({ toggleSidebar }) {
  const { getCartItemsCount } = useCart();

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <button className="toggle-sidebar" onClick={toggleSidebar}>
          ☰
        </button>
        <Link to="/" className="logo-link">
          <FaGem className="logo-icon" />
          <span className="website-name">Iraws Jewelry</span>
        </Link>
        <ul className="nav-links">
          <li>
            <Link to="/">
              <FaHome /> Home
            </Link>
          </li>
          <li>
            <Link to="/products">
              <FaGem /> Products
            </Link>
          </li>
          <li>
            <Link to="/about">
              <FaInfoCircle /> About
            </Link>
          </li>
        </ul>
        <Link to="/cart" className="cart-link">
          <FaShoppingCart />
          <span className="cart-count">{getCartItemsCount()}</span>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
