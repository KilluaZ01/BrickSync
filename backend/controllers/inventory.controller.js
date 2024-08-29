import Product from "../models/product.model.js";
import { errorHandler } from "../utils/error.js";

export const restockProduct = async (req, res, next) => {
  const { productId, quantity, price } = req.body; // Price of restocking

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return next(errorHandler(404, "Product not found"));
    }

    product.quantity += quantity;
    product.totalExpenses += quantity * price; // Update total expenses
    await product.save();

    res
      .status(200)
      .json({ message: "Product restocked successfully", product });
  } catch (error) {
    next(errorHandler(500, "Failed to restock product"));
  }
};

export const sellProduct = async (req, res, next) => {
  const { productId, quantity } = req.body; // Quantity sold

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return next(errorHandler(404, "Product not found"));
    }

    if (product.quantity < quantity) {
      return next(errorHandler(400, "Insufficient stock"));
    }

    product.quantity -= quantity;
    product.totalRevenue += quantity * product.price; // Update total revenue
    await product.save();

    res.status(200).json({ message: "Product sold successfully", product });
  } catch (error) {
    next(errorHandler(500, "Failed to sell product"));
  }
};
