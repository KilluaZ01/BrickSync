import express from "express";
import {
  getTransactions,
  createTransaction,
} from "../controllers/transaction.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/gettransactions", verifyToken, getTransactions);
router.get("/create", verifyToken, createTransaction);

export default router;
