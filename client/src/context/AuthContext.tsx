import {
  Dispatch,
  ReactNode,
  createContext,
  useReducer,
  useEffect,
} from "react";

// Define a type for the exercise data
export type UserAndToken = {
  user: {
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
  token: string | null;
};

// Define the shape of the exercise state
type AuthState = {
  userAndToken: UserAndToken | null;
};

// Define the shape of the action
type AuthAction = { type: "LOGIN"; payload: UserAndToken } | { type: "LOGOUT" };

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
      return { userAndToken: action.payload };
    case "LOGOUT":
      return { userAndToken: null };
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
  const [state, dispatch] = useReducer(authReducer, { userAndToken: null });

  // executes once when app loads for the first time
  useEffect(() => {
    const userAndToken = JSON.parse(localStorage.getItem("userAndToken")!);
    if (userAndToken) {
      dispatch({ type: "LOGIN", payload: userAndToken });
    }
  }, []);

  console.log("AuthContext state: ", state);
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
