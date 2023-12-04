import { Types } from "mongoose";
import workoutModel from "../models/workoutModel";
import workoutPlanModel from "../models/workoutPlanModel";
import { Request, Response } from "express";

const workoutController = {
  // get all workouts
  getAllWorkouts: async (req: Request, res: Response) => {
    try {
      const workouts = await workoutModel
        .find({})
        .populate("exercises.exerciseId")
        .sort({ createdAt: -1 });
      return res.status(200).json(workouts);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // get a single workout
  getWorkout: async (req: Request, res: Response) => {
    const id = req.params.id;
    // checks if id parameter is valid or not
    try {
      if (!Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Workout not found" });
      }
      const workout = await workoutModel
        .findById(id)
        .populate("exercises.exerciseId");
      if (!workout) {
        return res.status(404).json({ error: "Workout not found" });
      }
      return res.status(200).json(workout);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // create a new workout
  createWorkout: async (req: Request, res: Response) => {
    try {
      const workout = new workoutModel(req.body);
      await workout.save();
      return res.status(200).json(workout);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // update a workout
  updateWorkout: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      // checks if id parameter is valid or not
      if (!Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Workout not found" });
      }
      const workout = await workoutModel.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!workout) {
        return res.status(404).json({ error: "Workout not found" });
      }
      return res.status(200).json(workout);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // delete a workout
  deleteWorkout: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      // checks if id parameter is valid or not
      if (!Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Workout not found" });
      }
      const workout = await workoutModel.findByIdAndDelete(id);
      if (!workout) {
        return res.status(404).json({ error: "Workout not found" });
      }
      /* 
        Updating Workout Plans: 
            In both the middleware and manual routine, Workout.updateMany() is used to update all workout documents.
        The $pull Operator: 
            This operator removes from the exercises array any subdocument 
            where the exerciseId matches the ID of the deleted exercise.
        Empty Query Object {}: 
            This is used in updateMany() to target all workout documents in the collection.
      */
      await workoutPlanModel.updateMany(
        {},
        {
          $pull: {
            workouts: { workoutId: new Types.ObjectId(workout.id) },
          },
        }
      );
      return res.status(200).json(workout);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};

export default workoutController;
