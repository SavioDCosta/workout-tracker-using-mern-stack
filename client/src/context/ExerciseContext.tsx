import { ReactNode, createContext, useReducer, Dispatch } from "react";

// Define the shape of the exercise state
interface ExerciseState {
  exercises: any[] | null; // Replace 'any' with a more specific type if possible
}

// Define the shape of the action
type ExerciseAction =
  | { type: "SET_EXERCISES"; payload: any[] } // Replace 'any' with a specific type for exercises
  | { type: "CREATE_EXERCISE"; payload: any }; // Replace 'any' with a specific type for an exercise

// Create the context with an initial undefined value
export const ExerciseContext = createContext<
  | {
      state: ExerciseState;
      dispatch: Dispatch<ExerciseAction>;
    }
  | undefined
>(undefined);

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
