// src/services/productService.js
import Product from "../models/product.js";

export const getProductsByCategory = async (category, page, limit) => {
  const query = category ? { category } : {};
  const skip = (page - 1) * limit;

  const products = await Product.find(query).skip(skip).limit(limit);
  const total = await Product.countDocuments(query);

  return { products, total };
};
