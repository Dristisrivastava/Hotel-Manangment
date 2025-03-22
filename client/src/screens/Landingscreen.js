import React from "react";
import { Link } from "react-router-dom";

function Landingscreen() {
  return (
    <div className="row landing">
      <div className="col-md-12 text-center">
        <h2 style={{ color: "white" }}>Elite Stays</h2>

        <h1 style={{ color: "white" }}>"There is only one boss. The Guest."</h1>

        {/* ✅ Redirecting to /login instead of /home */}
        <Link to="/login">
          <button className="btn btn-primary">Get Started</button>
        </Link>
      </div>
    </div>
  );
}

export default Landingscreen;
