import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ExerciseContextProvider } from "./context/ExerciseContext";
import { WorkoutPlanContextProvider } from "./context/WorkoutPlanContext";
import { AuthContextProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <WorkoutPlanContextProvider>
        <ExerciseContextProvider>
          <App />
        </ExerciseContextProvider>
      </WorkoutPlanContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
