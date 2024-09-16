import mongoose from "mongoose";
import Transaction from "../models/transaction.model.js";
import { errorHandler } from "../utils/error.js"; // Ensure errorHandler is imported

export const getDailyFinancialSummary = async (req, res, next) => {
  try {
    // Extract userId from the JWT token (stored in req.user)
    const userId = req.user?.id || req.user?._id;

    // Check if the userId is valid
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      console.error("Invalid userId format:", userId);
      return next(errorHandler(500, "Invalid userId"));
    }

    // Ensure userId is correctly instantiated
    const userObjectId = new mongoose.Types.ObjectId(userId);

    const result = await Transaction.aggregate([
      {
        $match: {
          userId: userObjectId,
          transactionType: { $in: ["Sale", "Restock", "Fuel"] }, // Match relevant transaction types
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          totalExpenses: {
            $sum: {
              $cond: [
                { $eq: ["$transactionType", "Sale"] },
                { $eq: ["$transactionType", "Fuel"] },
                "$amount",
                0,
              ],
            },
          },
          totalExpenses: {
            $sum: {
              $cond: [
                {
                  $or: [
                    { $eq: ["$transactionType", "expense"] },
                    { $eq: ["$transactionType", "Fuel"] }, // Include "Fuel" in the expense sum
                  ],
                },
                "$amount",
                0,
              ],
            },
          },
          totalRevenue: {
            $sum: {
              $cond: [{ $eq: ["$transactionType", "Restock"] }, "$amount", 0],
            },
          },
        },
      },
      {
        $project: {
          day: "$_id",
          expenses: "$totalRevenue",
          revenue: "$totalExpenses",
          profit: { $subtract: ["$totalExpenses", "$totalRevenue"] },
        },
      },
      {
        $sort: { day: 1 },
      },
    ]);

    if (result.length === 0) {
      console.log("No data found for the provided userId and criteria.");
    }

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("Error fetching financial summary:", error);
    next(errorHandler(500, "Server Error"));
  }
};
