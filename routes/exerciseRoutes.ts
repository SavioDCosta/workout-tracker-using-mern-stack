import express, { Router } from "express";
import exerciseController from "../controllers/exerciseController";

const router: Router = express.Router();

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

export default router;
