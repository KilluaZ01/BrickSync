import Fuel from "../models/fuel.model.js";
import Vehicle from "../models/vehicle.model.js";
import { errorHandler } from "../utils/error.js";

export const getTotalSpentPerVehicle = async (req, res, next) => {
  try {
    const { userId } = req.query; // Extract userId from the query parameters

    const results = await Fuel.aggregate([
      {
        $match: { userId }, // Filter by userId
      },
      {
        $group: {
          _id: "$vehicleId", // Group by vehicleId
          totalSpent: { $sum: "$fuelPrice" }, // Sum the fuelPrice
        },
      },
      {
        $lookup: {
          from: "vehicles", // Join with the vehicles collection
          localField: "_id", // Field from the Fuel collection (vehicleId)
          foreignField: "_id", // Field from the Vehicles collection
          as: "vehicle", // Alias for joined data
        },
      },
      {
        $unwind: {
          path: "$vehicle", // Flatten the vehicle array
          preserveNullAndEmptyArrays: true, // Keep results even if no matching vehicle
        },
      },
      {
        $project: {
          _id: 0, // Exclude _id
          vehicleName: {
            $ifNull: ["$vehicle.vehName", "Unknown Vehicle"], // Use vehicle name if available, otherwise "Unknown Vehicle"
          },
          totalSpent: 1, // Include totalSpent
        },
      },
    ]);

    res.status(200).json(results);
  } catch (error) {
    next(errorHandler(500, "Failed to fetch total spent data"));
  }
};
