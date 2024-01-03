import {
  ReactNode,
  createContext,
  useReducer,
  Dispatch,
  // useState,
} from "react";
import { WorkoutPlan } from "../utils/WorkoutPlanProps";

// Define the shape of the workout plan state
type WorkoutPlanState = {
  workoutPlans: WorkoutPlan[] | null;
};

// Define the shape of the action
type WorkoutPlanAction =
  | { type: "SET_WORKOUT_PLANS"; payload: WorkoutPlan[] }
  | { type: "CREATE_WORKOUT_PLAN"; payload: WorkoutPlan }
  | { type: "UPDATE_WORKOUT_PLAN"; payload: WorkoutPlan }
  | { type: "DELETE_WORKOUT_PLAN"; payload: WorkoutPlan };

interface WorkoutPlanContextProps {
  state: WorkoutPlanState;
  dispatch: Dispatch<WorkoutPlanAction>;
  // editingExercise: Exercise | null;
  // setEditingExercise: (exercise: Exercise | null) => void;
}

// Create the context with an initial undefined value
export const WorkoutPlanContext = createContext<WorkoutPlanContextProps | null>(
  null
);

// Reducer function
export const workoutPlanReducer = (
  state: WorkoutPlanState,
  action: WorkoutPlanAction
): WorkoutPlanState => {
  switch (action.type) {
    case "SET_WORKOUT_PLANS":
      return {
        workoutPlans: action.payload,
      };
    case "CREATE_WORKOUT_PLAN":
      return {
        workoutPlans: [action.payload, ...(state.workoutPlans || [])],
      };
    case "UPDATE_WORKOUT_PLAN":
      return {
        workoutPlans:
          state.workoutPlans?.map((workoutPlan) =>
            workoutPlan._id === action.payload._id
              ? action.payload
              : workoutPlan
          ) || [],
      };
    case "DELETE_WORKOUT_PLAN":
      return {
        workoutPlans:
          state.workoutPlans?.filter(
            (workoutPlan) => workoutPlan._id !== action.payload._id
          ) || [],
      };
    default:
      return state;
  }
};

// Context Provider component
interface WorkoutPlanContextProviderProps {
  children: ReactNode;
}

export const WorkoutPlanContextProvider: React.FC<
  WorkoutPlanContextProviderProps
> = ({ children }) => {
  const [state, dispatch] = useReducer(workoutPlanReducer, {
    workoutPlans: null,
  });
  // const [editingExercise, setEditingExercise] = useState<Exercise | null>(null);
  return (
    <WorkoutPlanContext.Provider
      value={{
        state,
        dispatch,
        //   editingExercise,
        //   setEditingExercise,
      }}
    >
      {children}
    </WorkoutPlanContext.Provider>
  );
};
