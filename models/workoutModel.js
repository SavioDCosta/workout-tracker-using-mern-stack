const mongoose = require("mongoose");

// Subdocument schema for exercises in the workout
const workoutExerciseSchema = new mongoose.Schema(
  {
    exerciseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "exercise",
      required: true,
    },
    sets: {
      type: Number,
      default: 0,
    },
    reps_from: {
      type: Number,
      default: 0,
    },
    reps_to: {
      type: Number,
      default: 0,
    },
    weight_from: {
      type: Number,
      default: 0,
    },
    weight_to: {
      type: Number,
      default: 0,
    },
    distance: {
      type: Number,
      default: 0,
    },
    duration: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }
); // Prevent MongoDB from creating a default _id for subdocuments

// Main schema for the workout
const workoutSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    exercises: [workoutExerciseSchema], // Array of workout exercises
    // You can add more fields as needed (e.g., date, duration, etc.)
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const workoutModel = mongoose.model("workout", workoutSchema);

module.exports = workoutModel;
