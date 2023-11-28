const mongoose = require("mongoose");
const exerciseModel = require("../models/exerciseModel");
const workoutModel = require("../models/workoutModel");

const exerciseController = {
  // get all exercises
  getAllExercises: async (req, res) => {
    try {
      const exercises = await exerciseModel.find({}).sort({ createdAt: -1 });
      return res.status(200).json(exercises);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // get a single exercise
  getExercise: async (req, res) => {
    try {
      // checks if id parameter is valid or not
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).json({ error: "Exercise not found" });
      }
      const exercise = await exerciseModel.findById(req.params.id);
      if (!exercise) {
        return res.status(404).json({ error: "Exercise not found" });
      }
      return res.status(200).json(exercise);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // create a new exercise
  createExercise: async (req, res) => {
    try {
      const exercise = new exerciseModel(req.body);
      await exercise.save();
      return res.status(200).json(exercise);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // update an exercise
  updateExercise: async (req, res) => {
    try {
      // checks if id parameter is valid or not
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).json({ error: "Exercise not found" });
      }
      // const { name, type, description } = req.body;
      const exercise = await exerciseModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!exercise) {
        return res.status(404).json({ error: "Exercise not found" });
      }
      return res.status(200).json(exercise);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // delete an exercise
  deleteExercise: async (req, res) => {
    try {
      // checks if id parameter is valid or not
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).json({ error: "Exercise not found" });
      }
      const exercise = await exerciseModel.findByIdAndDelete(req.params.id);
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
            exercises: { exerciseId: new mongoose.Types.ObjectId(exercise.id) },
          },
        }
      );
      return res.status(200).json(exercise);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};

module.exports = exerciseController;
