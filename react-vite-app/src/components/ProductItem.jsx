import React from "react";
import { Link } from "react-router-dom";

function ProductItem({ product, handleAddToCart }) {
  return (
    <div className="product-item">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="product-image"
      />
      <h3>{product.name}</h3>
      <p className="description">{product.description}</p>
      <p className="price">Price: ${product.price.toFixed(2)}</p>
      <div className="product-actions">
        <button
          onClick={() => handleAddToCart(product)}
          className="add-to-cart"
        >
          Add to Cart
        </button>
        <Link to={`/product/${product.id}`} className="view-details">
          View Details
        </Link>
      </div>
    </div>
  );
}

export default ProductItem;
