const express = require("express");
const workoutPlanController = require("../controllers/workoutPlanController");

const router = express.Router();

// Get workout plans
router.get("/", workoutPlanController.getAllWorkoutPlans);

// Get a single workout plan
router.get("/:id", workoutPlanController.getWorkoutPlan);

// Post a new workout plan
router.post("/", workoutPlanController.createWorkoutPlan);

// Update a workout plan
router.patch("/:id", workoutPlanController.updateWorkoutPlan);

// Delete a workout plan
router.delete("/:id", workoutPlanController.deleteWorkoutPlan);

module.exports = router;
