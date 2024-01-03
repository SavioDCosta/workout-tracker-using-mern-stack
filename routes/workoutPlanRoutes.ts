import express, { Router } from "express";
import workoutPlanController from "../controllers/workoutPlanController";
import authCheckMiddleware from "../middleware/authCheckMiddleware";

const router: Router = express.Router();

// require auth for all routes
// router.use(authCheckMiddleware);

// Get workout plans
router.get("/", workoutPlanController.getAllWorkoutPlans);

// Get a single workout plan
router.get("/:id", workoutPlanController.getWorkoutPlan);

// Get workout plans of a single user
router.get("/user/:id", workoutPlanController.getWorkoutPlansOfUser);

// Post a new workout plan
router.post("/", workoutPlanController.createWorkoutPlan);

// Update a workout plan
router.patch("/:id", workoutPlanController.updateWorkoutPlan);

// Delete a workout plan
router.delete("/:id", workoutPlanController.deleteWorkoutPlan);

export default router;
