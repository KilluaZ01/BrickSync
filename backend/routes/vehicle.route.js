import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  createVehicle,
  getVehicles,
  updateVehicle,
  deleteVehicle,
} from "../controllers/vehicle.controller.js";

const router = express.Router();

router.post("/create", verifyToken, createVehicle);
router.get("/getvehicles", verifyToken, getVehicles);
router.put("/update/:vehicleId/:userId", verifyToken, updateVehicle);
router.delete("/delete/:vehicleId/:userId", verifyToken, deleteVehicle);

export default router;
