import express from "express";
import {
  restockProduct,
  sellProduct,
} from "../controllers/inventory.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/restock", verifyToken, restockProduct);
router.post("/sell", verifyToken, sellProduct);

export default router;
