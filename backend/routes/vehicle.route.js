import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  createvehicle,
  getvehicles,
  updatevehicle,
  deletevehicle,
} from "../controllers/vehicle.controller.js";

const router = express.Router();

router.post("/create", verifyToken, createvehicle);
router.get("/getvehicles", verifyToken, getvehicles);
router.put("/update/:vehicleId/:userId", verifyToken, updatevehicle);
router.delete("/delete/:vehicleId/:userId", verifyToken, deletevehicle);

export default router;
