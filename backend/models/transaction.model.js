import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    entityName: { type: String, required: true },
    entityType: { type: String, required: true },
    transactionType: { type: String, required: true },
    amount: { type: Number, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
