import mongoose, { Schema, Document, Types } from "mongoose";

// Interface for the user's workout plan
interface IWorkoutPlans {
  workoutPlan: Types.ObjectId;
}

// Interface for the User document
interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  workout_plans: IWorkoutPlans[];
  current_workout_plan: Types.ObjectId;
  admin: boolean;
}

const userSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    workout_plans: [
      {
        workoutPlan: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "workout_plan",
        },
      },
    ],
    current_workout_plan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "workout_plan",
    },
    admin: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const userModel = mongoose.model<IUser>("user", userSchema);

export default userModel;
