import Product from "../models/product.model.js";
import { errorHandler } from "../utils/error.js";

// Create a new product
export const createProduct = async (req, res, next) => {
  const newProduct = new Product({
    ...req.body,
    userId: req.user.id,
  });
  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    next(error);
  }
};

// Get all products for the current user
export const getProducts = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;

    const query = {};
    if (req.query.userId) {
      query.userId = req.query.userId;
    }
    if (req.query.postId) {
      query._id = req.query.postId;
    }

    const products = await Product.find(query)
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalProducts = await Product.countDocuments(query);

    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthProducts = await Product.countDocuments({
      ...query,
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      products,
      totalProducts,
      lastMonthProducts,
    });
  } catch (error) {
    next(error);
  }
};

// Update a product
export const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product || product.userId.toString() !== req.user.id) {
      return next(errorHandler(403, "You can update only your products!"));
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

// Delete a product
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product || product.userId.toString() !== req.user.id) {
      return next(errorHandler(403, "You can delete only your products!"));
    }

    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted...");
  } catch (error) {
    next(error);
  }
};
