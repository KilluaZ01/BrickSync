import Fuel from "../models/fuel.model.js";
import Vehicle from "../models/vehicle.model.js"; // Import the vehicle model
import { errorHandler } from "../utils/error.js";

// Create a new fuel entry
export const createFuel = async (req, res, next) => {
  const { vehName, fuelQuantity, fuelPrice } = req.body;

  try {
    // Check if the vehicle exists
    const vehicle = await Vehicle.findOne({ name: vehName });
    if (!vehicle) {
      return next(errorHandler(404, "Vehicle not found"));
    }

    // Create a new fuel entry
    const newFuel = new Fuel({
      vehName,
      fuelQuantity,
      fuelPrice,
      vehicleId: vehicle._id, // Associate the fuel entry with the vehicle
    });

    const savedFuel = await newFuel.save();
    res.status(201).json(savedFuel);
  } catch (error) {
    next(error);
  }
};

// Get all fuel entries
export const getFuels = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 5;
    const sortDirection = req.query.order === "asc" ? 1 : -1;

    const query = {};
    if (req.query.vehicleId) {
      query.vehicleId = req.query.vehicleId;
    }

    const fuels = await Fuel.find(query)
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

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
  try {
    await Fuel.findByIdAndDelete(req.params.fuelId);
    res.status(200).json("The fuel entry has been deleted");
  } catch (error) {
    next(error);
  }
};
