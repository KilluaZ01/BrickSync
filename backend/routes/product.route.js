import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

router.post("/create", verifyToken, createProduct);
router.get("/getproducts", verifyToken, getProducts);
router.put("/update/:productId/:userId", verifyToken, updateProduct);
router.delete("/delete/:productId/:userId", verifyToken, deleteProduct);

export default router;
