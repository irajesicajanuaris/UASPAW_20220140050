import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"; // Pastikan file CSS ini ada

const Home = () => {
  return (
    <div className="home">
      <div className="home-content">
        <h1>Selamat Datang di Toko Online Kami</h1>
        <p>Temukan produk-produk terbaik dengan harga terjangkau!</p>
        <Link to="/products" className="cta-button">
          Lihat Produk Kami
        </Link>
      </div>
    </div>
  );
};

export default Home;
