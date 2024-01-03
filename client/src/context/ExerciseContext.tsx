import {
  ReactNode,
  createContext,
  useReducer,
  Dispatch,
  useState,
} from "react";
import { Exercise } from "../utils/ExerciseProps";

// Define the shape of the exercise state
type ExerciseState = {
  exercises: Exercise[] | null;
};

// Define the shape of the action
type ExerciseAction =
  | { type: "SET_EXERCISES"; payload: Exercise[] }
  | { type: "CREATE_EXERCISE"; payload: Exercise }
  | { type: "UPDATE_EXERCISE"; payload: Exercise }
  | { type: "DELETE_EXERCISE"; payload: Exercise };

interface ExerciseContextProps {
  state: ExerciseState;
  dispatch: Dispatch<ExerciseAction>;
  editingExercise: Exercise | null;
  setEditingExercise: (exercise: Exercise | null) => void;
}

// Create the context with an initial undefined value
export const ExerciseContext = createContext<ExerciseContextProps | null>(null);

// Reducer function
export const exerciseReducer = (
  state: ExerciseState,
  action: ExerciseAction
): ExerciseState => {
  switch (action.type) {
    case "SET_EXERCISES":
      return {
        exercises: action.payload,
      };
    case "CREATE_EXERCISE":
      return {
        exercises: [action.payload, ...(state.exercises || [])],
      };
    case "UPDATE_EXERCISE":
      return {
        exercises:
          state.exercises?.map((exercise) =>
            exercise._id === action.payload._id ? action.payload : exercise
          ) || [],
      };
    case "DELETE_EXERCISE":
      return {
        exercises:
          state.exercises?.filter(
            (exercise) => exercise._id !== action.payload._id
          ) || [],
      };
    default:
      return state;
  }
};

// Context Provider component
interface ExerciseContextProviderProps {
  children: ReactNode;
}

export const ExerciseContextProvider: React.FC<
  ExerciseContextProviderProps
> = ({ children }) => {
  const [state, dispatch] = useReducer(exerciseReducer, {
    exercises: null,
  });
  const [editingExercise, setEditingExercise] = useState<Exercise | null>(null);
  return (
    <ExerciseContext.Provider
      value={{
        state,
        dispatch,
        editingExercise,
        setEditingExercise,
      }}
    >
      {children}
    </ExerciseContext.Provider>
  );
};
