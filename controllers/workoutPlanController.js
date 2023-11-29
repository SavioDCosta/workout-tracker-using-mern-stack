const mongoose = require("mongoose");
const workoutPlanModel = require("../models/workoutPlanModel"); // Adjust path as needed

const workoutPlanController = {
  // Get all workout plans
  getAllWorkoutPlans: async (req, res) => {
    try {
      const workoutPlans = await workoutPlanModel
        .find({})
        .populate("workouts.workoutId")
        .populate("created_by");
      res.json(workoutPlans);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get a single workout plan
  getWorkoutPlan: async (req, res) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).json({ error: "Workout plan not found" });
      }
      const workoutPlan = await workoutPlanModel
        .findById(req.params.id)
        .populate("workouts.workoutId");
      if (!workoutPlan) {
        return res.status(404).json({ message: "Workout plan not found" });
      }
      res.json(workoutPlan);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Create a new workout plan
  createWorkoutPlan: async (req, res) => {
    try {
      const workoutPlan = new workoutPlanModel({
        ...req.body,
        createdBy: req.user._id, // Assuming the user's ID is available from the request
      });
      await workoutPlan.save();
      res.status(201).json(workoutPlan);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Update a workout plan
  updateWorkoutPlan: async (req, res) => {
    try {
      const updatedWorkoutPlan = await workoutPlanModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!updatedWorkoutPlan) {
        return res.status(404).json({ message: "Workout plan not found" });
      }
      res.json(updatedWorkoutPlan);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Delete a workout plan
  deleteWorkoutPlan: async (req, res) => {
    try {
      const workoutPlan = await workoutPlanModel.findByIdAndDelete(
        req.params.id
      );
      if (!workoutPlan) {
        return res.status(404).json({ message: "Workout plan not found" });
      }
      res.json({ message: "Workout plan successfully deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = workoutPlanController;
