import { WorkoutPlan } from "./WorkoutPlanProps";

// Define a type for the exercise data
export type UserAndToken = {
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    current_workout_plan: WorkoutPlan;
    workout_plans: WorkoutPlan[];
    admin: boolean;
    createdAt: Date;
  };
  token: string | null;
};
