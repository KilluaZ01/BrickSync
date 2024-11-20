import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors"; // import cors
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import productRoutes from "./routes/product.route.js";
import vehicleRoutes from "./routes/vehicle.route.js";
import fuelRoutes from "./routes/fuel.route.js";
import inventoryRoutes from "./routes/inventory.routes.js";
import transactionRoutes from "./routes/transaction.route.js";
import financialChartRoutes from "./routes/financialChart.route.js";
import cookieParser from "cookie-parser";

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

// CORS configuration
app.use(
  cors({
    origin: "https://brick-sync-2wozeazjt-arik-rais-projects.vercel.app", // allow your frontend domain
    methods: ["GET", "POST"], // specify the allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // specify allowed headers
  })
);

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("BrickSync API is running");
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/fuels", fuelRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/transaction", transactionRoutes);
app.use("/api/financial", financialChartRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
