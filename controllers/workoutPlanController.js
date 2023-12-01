const mongoose = require("mongoose");
const workoutPlanModel = require("../models/workoutPlanModel"); // Adjust path as needed

const workoutPlanController = {
  // Get all workout plans
  getAllWorkoutPlans: async (req, res) => {
    try {
      const workoutPlans = await workoutPlanModel
        .find({})
        .populate("workouts.workoutId")
        .populate("created_by")
        .sort({ createdAt: -1 });
      return res.status(200).json(workoutPlans);
    } catch (error) {
      return res.status(500).json({ error: error.message });
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
        .populate("workouts.workoutId")
        .populate("created_by");
      if (!workoutPlan) {
        return res.status(404).json({ message: "Workout plan not found" });
      }
      return res.status(200).json(workoutPlan);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Create a new workout plan
  createWorkoutPlan: async (req, res) => {
    try {
      const workoutPlan = new workoutPlanModel({
        ...req.body,
        // createdBy: req.user._id, // Assuming the user's ID is available from the request
      });
      await workoutPlan.save();
      return res.status(200).json(workoutPlan);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  // Update a workout plan
  updateWorkoutPlan: async (req, res) => {
    try {
      // checks if id parameter is valid or not
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).json({ error: "Workout plan not found" });
      }
      const updatedWorkoutPlan = await workoutPlanModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!updatedWorkoutPlan) {
        return res.status(404).json({ message: "Workout plan not found" });
      }
      return res.status(200).json(updatedWorkoutPlan);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  // Delete a workout plan
  deleteWorkoutPlan: async (req, res) => {
    try {
      // checks if id parameter is valid or not
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).json({ error: "Workout plan not found" });
      }
      const workoutPlan = await workoutPlanModel.findByIdAndDelete(
        req.params.id
      );
      if (!workoutPlan) {
        return res.status(404).json({ message: "Workout plan not found" });
      }
      return res.status(200).json(workoutPlan);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};

module.exports = workoutPlanController;
