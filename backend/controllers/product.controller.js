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
    const limit = parseInt(req.query.limit) || 5;
    const sortDirection = req.query.order === "asc" ? 1 : -1;

    // Ensure that the query only fetches products belonging to the logged-in user
    const query = { userId: req.user.id }; // Filter by the logged-in user's ID
    if (req.query.productId) {
      query._id = req.query.productId;
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

export const updateProduct = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(401, "You can edit only your own product!"));
  }
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.productId,
      {
        $set: {
          name: req.body.name,
          description: req.body.description,
          quantity: req.body.quantity,
          price: req.body.price,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

// Delete a product
export const deleteProduct = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(
      errorHandler(403, "Your are not allowed to delete this product")
    );
  }
  try {
    await Product.findByIdAndDelete(req.params.productId);
    res.status(200).json("The product has been deleted");
  } catch (error) {
    next(error);
  }
};

export const getTotalRevenue = async (req, res, next) => {
  try {
    // Fetch products for the logged-in user only
    const products = await Product.find({ userId: req.user.id });

    // Calculate total revenue for this user's products
    const totalRevenue = products.reduce(
      (acc, product) => acc + (product.totalRevenue || 0), // Ensure 0 if undefined
      0
    );

    res.status(200).json({ totalRevenue });
  } catch (error) {
    next(errorHandler(500, "Failed to calculate total revenue"));
  }
};

export const getTotalExpenses = async (req, res, next) => {
  try {
    // Fetch products for the logged-in user only
    const products = await Product.find({ userId: req.user.id });

    // Calculate total expenses for this user's products
    const totalExpenses = products.reduce(
      (acc, product) => acc + (product.totalExpenses || 0), // Ensure 0 if undefined
      0
    );

    res.status(200).json({ totalExpenses });
  } catch (error) {
    next(errorHandler(500, "Failed to calculate total expenses"));
  }
};
