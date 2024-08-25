import vehicle from "../models/vehicle.model.js";
import { errorHandler } from "../utils/error.js";

// Create a new vehicle
export const createvehicle = async (req, res, next) => {
  const newvehicle = new vehicle({
    ...req.body,
    userId: req.user.id,
  });
  try {
    const savedvehicle = await newvehicle.save();
    res.status(201).json(savedvehicle);
  } catch (error) {
    next(error);
  }
};

// Get all vehicles for the current user
export const getvehicles = async (req, res, next) => {
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

    const vehicles = await vehicle
      .find(query)
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalvehicles = await vehicle.countDocuments(query);

    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthvehicles = await vehicle.countDocuments({
      ...query,
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      vehicles,
      totalvehicles,
      lastMonthvehicles,
    });
  } catch (error) {
    next(error);
  }
};

export const updatevehicle = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(401, "You can edit only your own vehicle!"));
  }
  try {
    const updatedvehicle = await vehicle.findByIdAndUpdate(
      req.params.vehicleId,
      {
        $set: {
          name: req.body.name,
          description: req.body.description,
          quantity: req.body.quantity,
          price: req.body.price,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedvehicle);
  } catch (error) {
    next(error);
  }
};

// Delete a vehicle
export const deletevehicle = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(
      errorHandler(403, "Your are not allowed to delete this vehicle")
    );
  }
  try {
    await vehicle.findByIdAndDelete(req.params.vehicleId);
    res.status(200).json("The vehicle has been deleted");
  } catch (error) {
    next(error);
  }
};
