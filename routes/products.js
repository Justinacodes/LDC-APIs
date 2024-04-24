
const express = require("express");
const Product = require("../models/Product");
const { routerManager } = require("./rts");

const router = express.Router();

// Route to handle product upload
routerManager.post("/upload", async (req, res) => {
  try {
    const { name, description, price, image } = req.body;
    const product = new Product({ name, description, price, image });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
