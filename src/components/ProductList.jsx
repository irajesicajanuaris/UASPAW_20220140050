import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import LoadingSpinner from "./LoadingSpinner"; // Komponen loading yang lebih menarik
import "./ProductList.css"; // Pastikan file CSS ini ada

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      console.log("Fetching products...");
      const response = await axios.get("http://localhost:3000/api/products");
      console.log("Products received:", response.data);
      if (Array.isArray(response.data)) {
        setProducts(response.data);
      } else {
        throw new Error("Invalid data format received");
      }
      setError(null);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError(
        "Terjadi kesalahan saat mengambil data produk. Silakan coba lagi."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  console.log("Current products state:", products);

  const sortProducts = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    const sortedProducts = [...products].sort((a, b) => {
      return newSortOrder === "asc" ? a.price - b.price : b.price - a.price;
    });
    setProducts(sortedProducts);
    setSortOrder(newSortOrder);
  };

  if (loading) return <LoadingSpinner />;
  if (error)
    return (
      <div>
        <p>{error}</p>
        <button onClick={fetchProducts}>Coba lagi</button>
      </div>
    );

  return (
    <div className="product-list">
      <h2>Daftar Produk</h2>
      <button onClick={sortProducts} className="sort-button">
        Urutkan harga:{" "}
        {sortOrder === "asc" ? "Rendah ke Tinggi ↑" : "Tinggi ke Rendah ↓"}
      </button>
      <div className="product-grid">
        {products.length === 0 ? (
          <p>Tidak ada produk yang tersedia.</p>
        ) : (
          products.map((product) => (
            <div key={product.id} className="product-card">
              <Link to={`/products/${product.id}`} className="product-link">
                <h3>{product.name}</h3>
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />
                <p className="product-price">
                  Harga: ${product.price.toFixed(2)}
                </p>
              </Link>
              <p className="product-description">
                {product.description.slice(0, 100)}...
              </p>
              <button
                onClick={() => addToCart(product)}
                className="add-to-cart-btn"
              >
                Tambah ke Keranjang
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductList;
