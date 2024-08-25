import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    vehName: {
      type: String,
      required: true,
    },
    vehNumber: {
      type: String,
      unique: true,
      required: true,
    },
    vehCategory: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

export default Vehicle;
