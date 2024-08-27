import mongoose from "mongoose";

const fuelSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    vehicleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
    },
    fuelQuantity: {
      type: Number,
      required: true,
    },
    fuelPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Fuel = mongoose.model("Fuel", fuelSchema);
export default Fuel;
