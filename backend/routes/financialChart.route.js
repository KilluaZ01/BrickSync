import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { getDailyFinancialSummary } from "../controllers/financialChart.controller.js";

const router = express.Router();

router.get("/getDailySummary", verifyToken, getDailyFinancialSummary);

export default router;
