// src/controllers/productController.js
import { getProductsByCategory } from "../services/productService.js";

export const getProducts = async (req, res) => {
  try {
    const { category, page = 1, limit = 10 } = req.query;
    const data = await getProductsByCategory(category, parseInt(page), parseInt(limit));

    res.json({
      total: data.total,
      page: parseInt(page),
      limit: parseInt(limit),
      data: data.products,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
