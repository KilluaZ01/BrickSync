import Transaction from "../models/transaction.model.js";
import { errorHandler } from "../utils/error.js";

// Get Transactions
export const getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.id }).sort({
      date: -1,
    });
    res.status(200).json({ transactions });
  } catch (error) {
    next(errorHandler(500, "Failed to fetch transactions"));
  }
};

// Create a new transaction (if needed elsewhere)
export const createTransaction = async (req, res, next) => {
  const { entityName, entityType, transactionType, amount } = req.body;

  try {
    const transaction = new Transaction({
      entityName,
      entityType,
      transactionType,
      amount,
      userId: req.user.id,
    });

    await transaction.save();
    res.status(201).json({ message: "Transaction logged successfully" });
  } catch (error) {
    next(errorHandler(500, "Failed to log transaction"));
  }
};
