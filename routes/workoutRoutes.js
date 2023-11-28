const express = require("express");
const workoutController = require("../controllers/workoutController");

const router = express.Router();

// Get workouts
router.get("/", workoutController.getAllWorkouts);

// Get a single workout
router.get("/:id", workoutController.getWorkout);

// Post a new workout
router.post("/", workoutController.createWorkout);

// Update a workout
router.patch("/:id", workoutController.updateWorkout);

// Delete a workout
router.delete("/:id", workoutController.deleteWorkout);

module.exports = router;
