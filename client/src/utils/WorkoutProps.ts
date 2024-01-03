import { Exercise } from "./ExerciseProps";

export type Workout = {
  _id: string;
  name: string;
  exercises: [
    {
      exercise: Exercise;
      sets: number;
      reps_from: number;
      reps_to: number;
      weight_from: number;
      weight_to: number;
      distance: number;
      duration: number;
    }
  ];
};
