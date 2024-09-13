import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import "./Navbar.css";

const Navbar = () => {
  const { cart } = useCart();

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">Beranda</Link>
        </li>
        <li>
          <Link to="/products">Produk</Link>
        </li>
        <li>
          <Link to="/about">Tentang</Link>
        </li>
        <li>
          <Link to="/cart">Keranjang ({cart.length})</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
