const mongoose = require("mongoose");

// Subdocument schema for workouts in the workout plan
const workoutPlanWorkoutsSchema = new mongoose.Schema(
  {
    workoutId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "workout",
      required: true,
    },
  },
  { _id: false }
); // Prevent MongoDB from creating a default _id for subdocuments

const workoutPlanSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    workouts: [workoutPlanWorkoutsSchema],
    notes: {
      type: String,
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const workoutPlanModel = mongoose.model("workout_plan", workoutPlanSchema);

module.exports = workoutPlanModel;
