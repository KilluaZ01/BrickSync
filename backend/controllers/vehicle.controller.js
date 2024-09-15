import Vehicle from "../models/vehicle.model.js";
import Transaction from "../models/transaction.model.js";
import { errorHandler } from "../utils/error.js";

// Create a new vehicle
export const createVehicle = async (req, res, next) => {
  const newVehicle = new Vehicle({
    ...req.body,
    userId: req.user.id,
  });
  try {
    const savedVehicle = await newVehicle.save();
    res.status(201).json(savedVehicle);
  } catch (error) {
    next(error);
  }
};

// Get all vehicles for the current user
export const getVehicles = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 5;
    const sortDirection = req.query.order === "asc" ? 1 : -1;

    const query = {};
    if (req.query.userId) {
      query.userId = req.query.userId;
    }
    if (req.query.vehicleId) {
      query._id = req.query.vehicleId;
    }

    const vehicles = await Vehicle.find(query)
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalVehicles = await Vehicle.countDocuments(query);

    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthVehicles = await Vehicle.countDocuments({
      ...query,
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      vehicles,
      totalVehicles,
      lastMonthVehicles,
    });
  } catch (error) {
    next(error);
  }
};

// Update a vehicle
export const updateVehicle = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(401, "You can edit only your own vehicle!"));
  }
  try {
    const updatedVehicle = await Vehicle.findByIdAndUpdate(
      req.params.vehicleId,
      {
        $set: {
          vehName: req.body.vehName,
          vehNumber: req.body.vehNumber,
          vehCategory: req.body.vehCategory,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedVehicle);
  } catch (error) {
    next(error);
  }
};

// Delete a vehicle
export const deleteVehicle = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(
      errorHandler(403, "You are not allowed to delete this vehicle")
    );
  }
  try {
    await Vehicle.findByIdAndDelete(req.params.vehicleId);
    res.status(200).json("The vehicle has been deleted");
  } catch (error) {
    next(error);
  }
};
