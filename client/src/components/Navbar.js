import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [user, setUser] = useState(null);

  // Fetch user from localStorage when the component mounts
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    setUser(storedUser);
  }, []);

  function logout() {
    localStorage.removeItem("currentUser");
    setUser(null); // Update state to reflect logout
    window.location.href = "/login"; // Redirect to login page
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">Elite Stays</Link>
      <div className="ml-auto">
        {user ? (
          <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="userMenu" data-toggle="dropdown">
              {user.name}
            </button>
            <div className="dropdown-menu">
              <Link className="dropdown-item" to="/profile">Profile</Link>
              <button className="dropdown-item" onClick={logout}>Logout</button>
            </div>
          </div>
        ) : (
          <>
            <Link className="btn btn-secondary m-1" to="/login">Login</Link>
            <Link className="btn btn-secondary m-1" to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
