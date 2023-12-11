import { ReactNode, createContext, useReducer, Dispatch } from "react";

type Exercise = {
  _id: string;
  name: string;
  type: string;
  muscle: string;
  equipment: string;
  difficulty: string;
  instructions: string;
  createdAt: Date;
};

// Define the shape of the exercise state
type ExerciseState = {
  exercises: Exercise[] | null;
};

// Define the shape of the action
type ExerciseAction =
  | { type: "SET_EXERCISES"; payload: Exercise[] }
  | { type: "CREATE_EXERCISE"; payload: Exercise }
  | { type: "DELETE_EXERCISE"; payload: Exercise };

interface ExerciseContext {
  state: ExerciseState;
  dispatch: Dispatch<ExerciseAction>;
}

// Create the context with an initial undefined value
export const ExerciseContext = createContext<ExerciseContext | null>(null);

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

  return (
    <ExerciseContext.Provider value={{ state, dispatch }}>
      {children}
    </ExerciseContext.Provider>
  );
};
