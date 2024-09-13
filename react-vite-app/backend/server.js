const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "../public")));

// Explicitly handle image requests
app.get("/images/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  res.sendFile(path.join(__dirname, "../public/images", imageName));
});

let products = [
  {
    id: 1,
    name: "Pearl Necklace",
    description: "Elegant pearl necklace with sterling silver clasp",
    price: 199.99,
    category: "Necklaces",
    imageUrl: "/images/pearl-necklace.jpg",
  },
  {
    id: 2,
    name: "Gold Chain",
    description: "14K gold chain necklace",
    price: 299.99,
    category: "Necklaces",
    imageUrl: "/images/gold-chain.jpg",
  },
  {
    id: 3,
    name: "Diamond Pendant",
    description: "Beautiful diamond pendant with 18K gold chain",
    price: 499.99,
    category: "Necklaces",
    imageUrl: "/images/diamond-pendant.jpg",
  },
  {
    id: 4,
    name: "Charm Bracelet",
    description: "Silver charm bracelet with various charms",
    price: 129.99,
    category: "Bracelets",
    imageUrl: "/images/charm-bracelets.jpg",
  },
  {
    id: 5,
    name: "Tennis Bracelet",
    description: "Diamond tennis bracelet in white gold",
    price: 999.99,
    category: "Bracelets",
    imageUrl: "/images/tennis-bracelet.jpg",
  },
  {
    id: 6,
    name: "Bangle",
    description: "Gold bangle with intricate design",
    price: 249.99,
    category: "Bracelets",
    imageUrl: "/images/bangle.jpg",
  },
  {
    id: 7,
    name: "Stud Earrings",
    description: "Diamond stud earrings in 14K gold",
    price: 399.99,
    category: "Earrings",
    imageUrl: "/images/stud-earrings.jpg",
  },
  {
    id: 8,
    name: "Hoop Earrings",
    description: "Large gold hoop earrings",
    price: 149.99,
    category: "Earrings",
    imageUrl: "/images/hoop-earrings.jpg",
  },
  {
    id: 9,
    name: "Chandelier Earrings",
    description: "Elegant chandelier earrings with crystals",
    price: 179.99,
    category: "Earrings",
    imageUrl: "/images/chandelier-earrings.jpg",
  },
  {
    id: 10,
    name: "Engagement Ring",
    description: "1 carat diamond solitaire engagement ring",
    price: 2999.99,
    category: "Rings",
    imageUrl: "/images/engagement-ring.jpg",
  },
  {
    id: 11,
    name: "Wedding Band",
    description: "Classic gold wedding band",
    price: 399.99,
    category: "Rings",
    imageUrl: "/images/wedding-band.jpg",
  },
  {
    id: 12,
    name: "Cocktail Ring",
    description: "Large statement cocktail ring with gemstones",
    price: 599.99,
    category: "Rings",
    imageUrl: "/images/cocktail-ring.jpg",
  },
  {
    id: 13,
    name: "Floral Brooch",
    description: "Vintage-inspired floral brooch with pearls",
    price: 89.99,
    category: "Brooches",
    imageUrl: "/images/floral-brooch.jpg",
  },
  {
    id: 14,
    name: "Vintage Brooch",
    description: "Antique gold brooch with intricate details",
    price: 129.99,
    category: "Brooches",
    imageUrl: "/images/vintage-brooch.jpg",
  },
  {
    id: 15,
    name: "Art Deco Brooch",
    description: "Art deco style brooch with crystals",
    price: 149.99,
    category: "Brooches",
    imageUrl: "/images/art-deco-brooch.jpg",
  },
  {
    id: 16,
    name: "Locket Pendant",
    description: "Heart-shaped locket pendant in sterling silver",
    price: 79.99,
    category: "Pendants",
    imageUrl: "/images/locket-pendant.jpg",
  },
  {
    id: 17,
    name: "Cross Pendant",
    description: "Gold cross pendant with small diamond accent",
    price: 199.99,
    category: "Pendants",
    imageUrl: "/images/cross-pendant.jpg",
  },
  {
    id: 18,
    name: "Gemstone Pendant",
    description: "Large emerald pendant with diamond halo",
    price: 799.99,
    category: "Pendants",
    imageUrl: "/images/gemstone-pendant.jpg",
  },
];

// Middleware untuk validasi produk
const validateProduct = (req, res, next) => {
  const { name, description, price, category } = req.body;
  if (!name || !description || !price || !category) {
    return res.status(400).json({ error: "All fields are required" });
  }
  if (typeof price !== "number" || price <= 0) {
    return res.status(400).json({ error: "Price must be a positive number" });
  }
  next();
};

// Fungsi untuk mengacak array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// GET /api/products
app.get("/api/products", (req, res) => {
  const { category, limit } = req.query;
  let filteredProducts = products;

  if (category) {
    filteredProducts = products.filter(
      (product) => product.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (limit) {
    // Acak produk sebelum membatasi jumlahnya
    filteredProducts = shuffleArray([...filteredProducts]);
    filteredProducts = filteredProducts.slice(0, parseInt(limit));
  }

  res.json(filteredProducts);
});

// POST /api/products
app.post("/api/products", validateProduct, (req, res) => {
  const newProduct = {
    id: products.length + 1,
    ...req.body,
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// GET /api/products/:id
app.get("/api/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find((p) => p.id === productId);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: "Product not found" });
  }
});

// PUT /api/products/:id
app.put("/api/products/:id", validateProduct, (req, res) => {
  const productId = parseInt(req.params.id);
  const productIndex = products.findIndex((p) => p.id === productId);
  if (productIndex !== -1) {
    products[productIndex] = { ...products[productIndex], ...req.body };
    res.json(products[productIndex]);
  } else {
    res.status(404).json({ error: "Product not found" });
  }
});

// DELETE /api/products/:id
app.delete("/api/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const productIndex = products.findIndex((p) => p.id === productId);
  if (productIndex !== -1) {
    const deletedProduct = products.splice(productIndex, 1);
    res.json(deletedProduct[0]);
  } else {
    res.status(404).json({ error: "Product not found" });
  }
});

// GET /api/categories
app.get("/api/categories", (req, res) => {
  const categories = [...new Set(products.map((product) => product.category))];
  res.json(categories);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
