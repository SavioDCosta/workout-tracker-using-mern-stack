import { WorkoutPlanContext } from "../context/WorkoutPlanContext";
import { useContext } from "react";

export const useWorkoutPlanContext = () => {
  const context = useContext(WorkoutPlanContext);
  if (!context) {
    throw Error(
      "useWorkoutPlanContext must be used inside an WorkoutPlanContextProvider"
    );
  }
  return context;
};
