const mongoose = require("mongoose");

const workoutPlanSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    public: {
      type: Boolean,
      required: true,
    },
    workouts: [
      {
        workoutId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "workout",
          required: true,
        },
      },
    ],
    notes: {
      type: String,
    },
    createdBy: {
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
