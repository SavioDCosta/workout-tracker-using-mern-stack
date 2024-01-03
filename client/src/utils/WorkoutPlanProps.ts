import { User } from "./UserProps";
import { Workout } from "./WorkoutProps";

export type WorkoutPlan = {
  _id: string;
  name: string;
  workouts: [
    {
      workout: Workout;
    }
  ];
  description: string;
  createdBy: User;
  createdAt: Date;
};
