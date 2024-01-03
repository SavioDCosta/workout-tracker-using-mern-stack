import { Types } from "mongoose";
import workoutPlanModel from "../models/workoutPlanModel";
import { Request, Response } from "express";
import errorHandler from "../middleware/errorHandler";

const workoutPlanController = {
  // Get all workout plans
  getAllWorkoutPlans: async (req: Request, res: Response) => {
    try {
      const workoutPlans = await workoutPlanModel
        .find({})
        .populate("workouts.workout")
        .populate("createdBy")
        .sort({ createdAt: -1 });
      return res.status(200).json(workoutPlans);
    } catch (error) {
      return errorHandler(error, req, res);
    }
  },

  // Get a single workout plan
  getWorkoutPlan: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      if (!Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Workout plan not found" });
      }
      const workoutPlan = await workoutPlanModel
        .findById(id)
        .populate("workouts.workout")
        .populate("createdBy");
      if (!workoutPlan) {
        return res.status(404).json({ message: "Workout plan not found" });
      }
      return res.status(200).json(workoutPlan);
    } catch (error) {
      return errorHandler(error, req, res);
    }
  },

  // Get a single workout plan of user
  getWorkoutPlansOfUser: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      if (!Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid user ID" });
      }
      const workoutPlans = await workoutPlanModel
        .find({ createdBy: id })
        .populate("workouts.workout")
        .populate({
          path: "createdBy",
          select: "_id firstName lastName email",
        });
      if (!workoutPlans) {
        return res.status(404).json({ message: "Workout plan not found" });
      }
      return res.status(200).json(workoutPlans);
    } catch (error) {
      return errorHandler(error, req, res);
    }
  },

  // Create a new workout plan
  createWorkoutPlan: async (req: Request, res: Response) => {
    try {
      const workoutPlan = new workoutPlanModel(req.body);
      await workoutPlan.save();
      return res.status(200).json(workoutPlan);
    } catch (error) {
      return errorHandler(error, req, res);
    }
  },

  // Update a workout plan
  updateWorkoutPlan: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      // checks if id parameter is valid or not
      if (!Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Workout plan not found" });
      }
      const updatedWorkoutPlan = await workoutPlanModel.findByIdAndUpdate(
        id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!updatedWorkoutPlan) {
        return res.status(404).json({ message: "Workout plan not found" });
      }
      return res.status(200).json(updatedWorkoutPlan);
    } catch (error) {
      return errorHandler(error, req, res);
    }
  },

  // Delete a workout plan
  deleteWorkoutPlan: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      // checks if id parameter is valid or not
      if (!Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Workout plan not found" });
      }
      const workoutPlan = await workoutPlanModel.findByIdAndDelete(id);
      if (!workoutPlan) {
        return res.status(404).json({ message: "Workout plan not found" });
      }
      return res.status(200).json(workoutPlan);
    } catch (error) {
      return errorHandler(error, req, res);
    }
  },
};

export default workoutPlanController;
