import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // ✅ Import Link for navigation

function Loginscreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // ✅ Initialize navigate

  async function Login() {
    const user = { email, password };

    try {
      const result = await axios.post("/api/users/login", user);
      localStorage.setItem("currentUser", JSON.stringify(result.data)); // ✅ Store only user data
      navigate("/home"); // ✅ Redirect using useNavigate
    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid email or password. Please try again."); // ✅ Show error message
    }
  }

  return (
    <div>
      <div className="row justify-content-center mt-5">
        <div className="col-md-5">
          <div className="bs">
            <h1>Login</h1>

            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="btn btn-primary mt-3" onClick={Login}>
              Login
            </button>

            {/* ✅ Link to Register Page */}
            <p className="mt-3">
              Don't have an account? <Link to="/register">Register here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loginscreen;
