const mongoose = require("mongoose");

// Subdocument schema for exercises in the workout
const workoutExerciseSchema = new mongoose.Schema(
    {
        exercise: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "exercise",
            required: true,
        },
        sets: {
            type: Number,
            required: true,
        },
        reps: {
            type: Number,
            required: true,
        },
        weight: {
            type: Number,
            required: true,
        },
        distance: {
            type: Number,
            required: true,
        },
        duration: {
            type: Number,
            required: true,
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
