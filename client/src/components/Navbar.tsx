import React from "react";
import { Link } from "react-router-dom";
import useLogoutContext from "../hooks/useLogoutContext";

const Navbar: React.FC = () => {
  const logout = useLogoutContext();
  const handleLogout = () => {
    logout();
  };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Workout Tracker</h1>
        </Link>
        <nav>
          <div>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <div>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
