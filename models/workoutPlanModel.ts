import mongoose, { Schema, Document, Types } from "mongoose";

// Interface for the subdocument schema for workouts in the workout plan
interface IWorkoutPlanWorkouts {
  workoutId: Types.ObjectId;
}

// Interface for the WorkoutPlan document
interface IWorkoutPlan extends Document {
  name: String;
  workouts: IWorkoutPlanWorkouts[];
  description: String;
  created_by: Types.ObjectId;
}

// Subdocument schema for workouts in the workout plan
const workoutPlanWorkoutsSchema = new Schema<IWorkoutPlanWorkouts>(
  {
    workoutId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "workout",
      required: true,
    },
  },
  { _id: false }
); // Prevent MongoDB from creating a default _id for subdocuments

const workoutPlanSchema = new Schema<IWorkoutPlan>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    workouts: [workoutPlanWorkoutsSchema],
    description: {
      type: String,
      default: "",
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

const workoutPlanModel = mongoose.model<IWorkoutPlan>(
  "workout_plan",
  workoutPlanSchema
);

export default workoutPlanModel;
