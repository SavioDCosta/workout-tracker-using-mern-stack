import { Types } from "mongoose";
import { Request, Response } from "express";
import exerciseModel from "../models/exerciseModel";
import workoutModel from "../models/workoutModel";
// import axios from "axios";

const exerciseController = {
  // get all exercises
  getAllExercises: async (req: Request, res: Response) => {
    try {
      const exercises = await exerciseModel.find({}).sort({ createdAt: -1 });
      return res.status(200).json(exercises);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // get a single exercise
  getExercise: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      // checks if id parameter is valid or not
      if (!Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Exercise not found" });
      }
      const exercise = await exerciseModel.findById(id);
      if (!exercise) {
        return res.status(404).json({ error: "Exercise not found" });
      }
      return res.status(200).json(exercise);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // create a new exercise
  createExercise: async (req: Request, res: Response) => {
    try {
      const exercise = new exerciseModel(req.body);
      await exercise.save();
      return res.status(200).json(exercise);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // update an exercise
  updateExercise: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      // checks if id parameter is valid or not
      if (!Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Exercise not found" });
      }
      // const { name, type, description } = req.body;
      const exercise = await exerciseModel.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!exercise) {
        return res.status(404).json({ error: "Exercise not found" });
      }
      return res.status(200).json(exercise);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // delete an exercise
  deleteExercise: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      // checks if id parameter is valid or not
      if (!Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Exercise not found" });
      }
      const exercise = await exerciseModel.findByIdAndDelete(id);
      if (!exercise) {
        return res.status(404).json({ error: "Exercise not found" });
      }
      /*
        Updating Workouts:
            In both the middleware and manual routine, Workout.updateMany() is used to update all workout documents.
        The $pull Operator:
            This operator removes from the exercises array any subdocument
            where the exerciseId matches the ID of the deleted exercise.
        Empty Query Object {}:
            This is used in updateMany() to target all workout documents in the collection.
      */
      await workoutModel.updateMany(
        {},
        {
          $pull: {
            exercises: { exerciseId: new Types.ObjectId(exercise.id) },
          },
        }
      );
      return res.status(200).json(exercise);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // // populate exercises from API
  // populateExercises: async (req: Request, res: Response) => {
  //   try {
  //     const response = await axios.get(
  //       `https://api.api-ninjas.com/v1/exercises?equipment=foam_roll`,
  //       {
  //         headers: { "X-Api-Key": "6GFX+G3FiHa08HckXJ2QtA==DacYSGaYNhE6XyZP" },
  //       }
  //     );

  //     if (response.status === 200) {
  //       const fetchedExercises = response.data;

  //       // Get all existing exercises from the database
  //       const existingExecises = await exerciseModel.find({});
  //       const existingExerciseNames = new Set(
  //         existingExecises.map((exercise) => exercise.name)
  //       );

  //       const newExercises = fetchedExercises.filter(
  //         (exercise: { name: string }) =>
  //           !existingExerciseNames.has(exercise.name)
  //       );

  //       if (newExercises.length > 0) {
  //         // const exercises = response.data;
  //         await exerciseModel.insertMany(newExercises);
  //         return res
  //           .status(200)
  //           .json({ message: "Exercises successfully added to the database" });
  //       } else {
  //         return res.status(200).json({ message: "No new exercises to add" });
  //       }
  //     } else {
  //       return res.status(404).send(response.data);
  //     }
  //   } catch (error) {
  //     return res.status(500).json({ error: error.message });
  //   }
  // },
};

export default exerciseController;
