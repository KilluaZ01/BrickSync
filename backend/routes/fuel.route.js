import express from "express";
import { verifyToken } from "../utils/verifyUser.js";

import {
  createFuel,
  deleteFuel,
  getFuels,
} from "../controllers/fuel.controller.js";

import { getTotalSpentPerVehicle } from "../controllers/totalSpent.controller.js";

const router = express.Router();

router.post("/create", verifyToken, createFuel);
router.get("/getFuels", verifyToken, getFuels);
router.get("/total-spent-per-vehicle", getTotalSpentPerVehicle);
router.delete("/delete/:fuelId", deleteFuel);

export default router;
