import mongoose, { Schema, Document } from "mongoose";

// Interface for the Exercise document
interface IExercise extends Document {
  name: string;
  type: string;
  description: string;
}

const exerciseSchema = new Schema<IExercise>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const exerciseModel = mongoose.model<IExercise>("exercise", exerciseSchema);

export default exerciseModel;
