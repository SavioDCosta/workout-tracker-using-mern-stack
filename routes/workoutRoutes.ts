import express, { Router } from "express";
import workoutController from "../controllers/workoutController";
import authCheckMiddleware from "../middleware/authCheckMiddleware";

const router: Router = express.Router();

// require auth for all routes
// router.use(authCheckMiddleware);

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

export default router;
