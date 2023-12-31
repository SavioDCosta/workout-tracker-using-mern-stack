import express, { Router } from "express";
import exerciseController from "../controllers/exerciseController";
import authCheckMiddleware from "../middleware/authCheckMiddleware";

const router: Router = express.Router();

// require auth for all routes
router.use(authCheckMiddleware);

// Get exercises
router.get("/", exerciseController.getAllExercises);

// Get a single exercise
router.get("/:id", exerciseController.getExercise);

// Post a new exercise
router.post("/", exerciseController.createExercise);

// Update an exercise
router.patch("/:id", exerciseController.updateExercise);

// Delete an exercise
router.delete("/:id", exerciseController.deleteExercise);

// // Populate exercises
// router.get("/populate", exerciseController.populateExercises);

export default router;
