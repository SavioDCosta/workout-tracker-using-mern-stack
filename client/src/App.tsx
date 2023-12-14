import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

// Pages and components
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

const App: React.FC = () => {
  const userState = useAuthContext();
  const userAndToken = userState.state.userAndToken;

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={userAndToken ? <HomePage /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!userAndToken ? <LoginPage /> : <Navigate to={"/"} />}
            />
            <Route
              path="/register"
              element={!userAndToken ? <RegisterPage /> : <Navigate to={"/"} />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
