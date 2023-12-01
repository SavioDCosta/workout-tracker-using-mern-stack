import mongoose, { Schema, Document, Types } from "mongoose";

// Interface for for exercises in the Workout document
interface IWorkoutExercise {
  exerciseId: Types.ObjectId;
  sets: Number;
  reps_from: Number;
  reps_to: Number;
  weight_from: Number;
  weight_to: Number;
  distance: Number;
  duration: Number;
}

// Interface for the Workout document
interface IWorkout extends Document {
  name: String;
  exercises: IWorkoutExercise[];
}

// Subdocument schema for exercises in the workout
const workoutExerciseSchema = new Schema<IWorkoutExercise>(
  {
    exerciseId: {
      type: Schema.Types.ObjectId,
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
const workoutSchema = new Schema<IWorkout>(
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

const workoutModel = mongoose.model<IWorkout>("workout", workoutSchema);

export default workoutModel;
