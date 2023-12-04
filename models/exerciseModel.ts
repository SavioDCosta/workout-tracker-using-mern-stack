import mongoose, { Schema, Document } from "mongoose";

// Interface for the Exercise document
interface IExercise extends Document {
  name: string;
  type: string;
  muscle: string;
  equipment: string;
  difficulty: string;
  instructions: string;
}

const exerciseSchema = new Schema<IExercise>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      required: true,
    },
    muscle: {
      type: String,
      required: true,
    },
    equipment: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      required: true,
    },
    instructions: {
      type: String,
      default: "",
      // required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const exerciseModel = mongoose.model<IExercise>("exercise", exerciseSchema);

export default exerciseModel;
