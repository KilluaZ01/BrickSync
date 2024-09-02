import Fuel from "../models/fuel.model.js";
import Vehicle from "../models/vehicle.model.js";
import Transaction from "../models/transaction.model.js";
import { errorHandler } from "../utils/error.js";
import mongoose from "mongoose";

// Create a new fuel entry and log it as a transaction
export const createFuel = async (req, res, next) => {
  const { vehicleId, fuelQuantity, fuelPrice } = req.body;

  // Basic validation
  if (!vehicleId || !fuelQuantity || !fuelPrice) {
    return next(errorHandler(400, "Missing required fields"));
  }

  try {
    // Check if the vehicle exists
    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) {
      return next(errorHandler(404, "Vehicle not found"));
    }

    // Create a new fuel entry
    const newFuel = new Fuel({
      vehicleId,
      fuelQuantity,
      fuelPrice,
      userId: req.user.id,
    });

    const savedFuel = await newFuel.save();

    // Log the transaction
    const newTransaction = new Transaction({
      entityName: vehicle.vehName,
      entityType: "Vehicle",
      transactionType: "Fuel",
      amount: fuelPrice,
      userId: req.user.id,
    });

    await newTransaction.save();

    res.status(201).json(savedFuel);
  } catch (error) {
    next(error);
  }
};

// Get all fuel entries with transaction data
export const getFuels = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 5;
    const sortDirection = req.query.order === "asc" ? 1 : -1;

    const query = {};
    if (req.query.vehicleId) {
      query.vehicleId = req.query.vehicleId;
    }
    if (req.query.userId) {
      query.userId = req.query.userId;
    }

    const fuels = await Fuel.find(query)
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit)
      .populate("vehicleId", "vehName");

    const totalFuels = await Fuel.countDocuments(query);

    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthFuels = await Fuel.countDocuments({
      ...query,
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      fuels,
      totalFuels,
      lastMonthFuels,
    });
  } catch (error) {
    next(error);
  }
};

// Delete a fuel entry
export const deleteFuel = async (req, res, next) => {
  const { fuelId } = req.params;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(fuelId)) {
    return next(errorHandler(400, "Invalid fuel ID"));
  }

  try {
    const fuel = await Fuel.findById(fuelId);
    if (!fuel) {
      return next(errorHandler(404, "Fuel entry not found"));
    }

    await Fuel.findByIdAndDelete(fuelId);

    res.status(200).json("The fuel entry has been deleted");
  } catch (error) {
    next(error);
  }
};
