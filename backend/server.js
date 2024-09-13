const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const port = 3000;

app.use(cors()); // Tambahkan ini jika belum ada
app.use(express.json());

// GET /api/products
app.get("/api/products", async (req, res) => {
  try {
    console.log("Fetching products from Fake Store API...");
    const response = await axios.get("https://fakestoreapi.com/products");
    console.log("Received response from Fake Store API");
    const products = response.data.map((product) => ({
      id: product.id,
      name: product.title,
      price: product.price,
      description: product.description,
      image: product.image,
    }));
    console.log(`Sending ${products.length} products to client`);
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res
      .status(500)
      .json({ error: "Terjadi kesalahan saat mengambil data produk" });
  }
});

// GET /api/products/:id
app.get("/api/products/:id", async (req, res) => {
  try {
    const response = await axios.get(
      `https://fakestoreapi.com/products/${req.params.id}`
    );
    const product = {
      id: response.data.id,
      name: response.data.title,
      price: response.data.price,
      description: response.data.description,
      image: response.data.image,
    };
    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(404).json({ error: "Produk tidak ditemukan" });
  }
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
