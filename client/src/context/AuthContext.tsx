import { Dispatch, ReactNode, createContext, useReducer } from "react";

// Define a type for the exercise data
export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  // current_workout_plan: string;
  // workout_plans: string[];
  admin: boolean;
  createdAt: Date;
};

// Define the shape of the exercise state
type AuthState = {
  user: User | null;
};

// Define the shape of the action
type AuthAction =
  | { type: "LOGIN"; payload: User }
  | { type: "LOGOUT"; payload: User };

interface AuthContextProps {
  state: AuthState;
  dispatch: Dispatch<AuthAction>;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

export const authReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

// Context Provider component
interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, { user: null });
  console.log("AuthContext state: ", state);
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
