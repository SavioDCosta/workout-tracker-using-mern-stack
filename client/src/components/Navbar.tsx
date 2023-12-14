import React from "react";
import { Link } from "react-router-dom";
import useLogoutContext from "../hooks/useLogoutContext";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar: React.FC = () => {
  const logout = useLogoutContext();
  const { state } = useAuthContext();
  const { userAndToken } = state;

  console.log(userAndToken);

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
          {userAndToken && (
            <div>
              <span>{userAndToken.user.email}</span>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
          {!userAndToken && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
