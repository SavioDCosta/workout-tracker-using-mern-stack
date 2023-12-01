import mongoose, { Schema, Document, Types } from "mongoose";

// Interface for the user's workout plan
interface IWorkoutPlans {
  workoutPlanId: Types.ObjectId;
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
        workoutPlanId: {
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

// // Password hashing middleware
// userSchema.pre("save", async function (next) {
//     if (this.isModified("password")) {
//         this.password = await bcrypt.hash(this.password, 8);
//     }
//     next();
// });

// // Instance method to compare hashed password
// userSchema.methods.comparePassword = async function (candidatePassword) {
//     return bcrypt.compare(candidatePassword, this.password);
// };

const userModel = mongoose.model<IUser>("user", userSchema);

export default userModel;
