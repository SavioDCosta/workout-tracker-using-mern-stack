const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
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
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
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

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
