import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "./Sidebar.css";

function Sidebar({ isOpen, toggleSidebar }) {
  const [categories, setCategories] = useState([]);
  const [expandedCategory, setExpandedCategory] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/categories"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const toggleCategory = (categoryName) => {
    setExpandedCategory(
      expandedCategory === categoryName ? null : categoryName
    );
  };

  // Fungsi untuk mendapatkan emoji yang sesuai untuk setiap kategori
  const getCategoryEmoji = (category) => {
    switch (category.toLowerCase()) {
      case "necklaces":
        return "📿";
      case "bracelets":
        return "🔗";
      case "earrings":
        return "💎";
      case "rings":
        return "💍";
      case "brooches":
        return "🧷";
      case "pendants":
        return "🎐";
      default:
        return "✨";
    }
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <button className="close-button" onClick={toggleSidebar}>
        ×
      </button>
      <h3>✨ Jewelry Categories ✨</h3>
      {categories.map((category, index) => (
        <div key={index} className="category-container">
          <NavLink
            to={`/products?category=${category.toLowerCase()}`}
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={() => toggleCategory(category)}
          >
            {getCategoryEmoji(category)} {category}
          </NavLink>
        </div>
      ))}
    </div>
  );
}

export default Sidebar;
