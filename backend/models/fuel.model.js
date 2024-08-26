import mongoose from "mongoose";

const fuelSchema = new mongoose.Schema(
  {
    vehName: {
      type: String,
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
    vehicleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle", // Reference to the Vehicle model
      required: true,
    },
  },
  { timestamps: true }
);

const Fuel = mongoose.model("Fuel", fuelSchema);

export default Fuel;
