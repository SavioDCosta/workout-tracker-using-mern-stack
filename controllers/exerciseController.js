const mongoose = require("mongoose");
const exerciseModel = require("../models/exerciseModel");

const exerciseController = {
    // get all exercises
    getAllExercises: async (req, res) => {
        const exercises = await exerciseModel.find({}).sort({ createdAt: -1 });
        res.status(200).json(exercises);
    },

    // get a single exercise
    getExercise: async (req, res) => {
        const { id } = req.params;
        // checks if id parameter is valid or not
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: "No such exercise" });
        }
        const exercise = await exerciseModel.findById(id);
        if (!exercise) {
            return res.status(404).json({ error: "No such exercise" });
        }
        res.status(200).json(exercise);
    },

    // create a new exercise
    createExercise: async (req, res) => {
        const { name, type, description } = req.body;
        try {
            const exercise = await exerciseModel.create({
                name,
                type,
                description,
            });
            res.status(200).json(exercise);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // update an exercise
    updateExercise: async (req, res) => {
        const { id } = req.params;
        // checks if id parameter is valid or not
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: "No such exercise" });
        }
        const { name, type, description } = req.body;
        const exercise = await exerciseModel.findOneAndUpdate(
            { _id: id },
            { ...req.body } // we spread req.body i.e. whatever is passed in the request body. it could be some or all the parameters.
        );
        if (!exercise) {
            return res.status(404).json({ error: "No such exercise" });
        }
        res.status(200).json(exercise);
    },

    // delete an exercise
    deleteExercise: async (req, res) => {
        const { id } = req.params;
        // checks if id parameter is valid or not
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: "No such exercise" });
        }
        const exercise = await exerciseModel.findOneAndDelete({ _id: id });
        if (!exercise) {
            return res.status(404).json({ error: "No such exercise" });
        }
        res.status(200).json(exercise);
    },
};

module.exports = exerciseController;
