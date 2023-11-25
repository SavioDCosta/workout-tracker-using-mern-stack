const express = require("express");
const exerciseController = require("../controllers/exerciseController");

const router = express.Router();

// Get exercises
router.get("/", exerciseController.getAllExercises);

// Get a single exercise
router.get("/:id", exerciseController.getExercise);

// Post a new exercise
router.post("/", exerciseController.createExercise);

// Update a exercise
router.patch("/:id", exerciseController.updateExercise);

// Delete a exercise
router.delete("/:id", exerciseController.deleteExercise);

module.exports = router;
