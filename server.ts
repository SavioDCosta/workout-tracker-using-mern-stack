import express from "express";
import mongoose from "mongoose";
import cors from "cors";
require("dotenv").config();

import userRoutes from "./routes/userRoutes";
import exerciseRoutes from "./routes/exerciseRoutes";
import workoutRoutes from "./routes/workoutRoutes";
import workoutPlanRoutes from "./routes/workoutPlanRoutes";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // For parsing application/json

// Connect to MongoDB
const db_uri: string = process.env.DB_URI || "";
mongoose
  .connect(db_uri)
  .then(() =>
    app.listen(PORT, () => {
      console.log(`MongoDB connected. Server running on port ${PORT}`);
    })
  )
  .catch((error) => console.log(error));

// Routes
app.use("/api/user", userRoutes);
app.use("/api/exercises", exerciseRoutes);
app.use("/api/workouts", workoutRoutes);
app.use("/api/workout_plans", workoutPlanRoutes);
