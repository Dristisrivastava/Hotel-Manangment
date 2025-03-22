import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ Use useNavigate
import Success from "../components/Success"; // ✅ Ensure this component exists

function Registerscreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate(); // ✅ Initialize navigate

  async function register() {
    if (password === cpassword) {
      const user = { name, email, password };

      try {
        await axios.post("/api/users/register", user);
        setSuccess(true);
        
        // ✅ Clear form fields
        setName("");
        setEmail("");
        setPassword("");
        setCpassword("");

        // ✅ Redirect to Login page after 2 seconds
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } catch (error) {
        console.error("Registration failed:", error);
        alert("Registration failed. Try again.");
      }
    } else {
      alert("Passwords do not match!");
    }
  }

  return (
    <div>
      {/* ✅ Ensure Success component renders correctly */}
      {success && <Success message="Registration successful!" />}

      <div className="row justify-content-center mt-5">
        <div className="col-md-5">
          <div className="bs">
            <h1>Register</h1>

            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

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

            <input
              type="password"
              className="form-control"
              placeholder="Confirm Password"
              value={cpassword}
              onChange={(e) => setCpassword(e.target.value)}
            />

            <button className="btn btn-primary mt-3" onClick={register}>
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registerscreen;
 