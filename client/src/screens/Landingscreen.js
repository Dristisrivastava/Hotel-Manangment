import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Landingscreen() {
  const user = JSON.parse(localStorage.getItem("currentUser")); // Check if user is logged in
  const [city, setCity] = useState(""); // State to store city input
  const navigate = useNavigate();

  // List of valid Indian cities
  const validCities = [
    "Delhi", "Mumbai", "Bangalore", "Hyderabad", "Chennai", 
    "Kolkata", "Pune", "Jaipur", "Ahmedabad", "Lucknow",
    "Chandigarh", "Goa", "Indore", "Bhopal", "Kochi", 
    "Coimbatore", "Nagpur", "Surat", "Visakhapatnam", "Guwahati", "Patna",
    "Varanasi", "Mysore", "Thiruvananthapuram", "Ranchi", "Jodhpur",
    "Raipur", "Dehradun", "Ludhiana", "Kanpur", "Vadodara"
  ];

  // Function to format city name to title case
  const formatCityName = (name) => {
    return name
      .trim()
      .toLowerCase()
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  function handleGetStarted() {
    const formattedCity = formatCityName(city);

    if (validCities.includes(formattedCity)) {
      localStorage.setItem("selectedCity", formattedCity); // Store corrected city name
      navigate(user ? "/home" : "/login"); // Redirect to home or login based on user
    } else {
      alert("Invalid city! Please enter a valid city from India.");
      setCity(""); // Clear the input field if the city is invalid
    }
  }

  return (
    <div className="row landing">
      <div className="col-md-12 text-center">
        <h2 style={{ color: "white" }}>Elite Stays</h2>
        <h1 style={{ color: "white" }}>"There is only one boss. The Guest."</h1>

        {/* City input field */}
        <div className="d-flex justify-content-center mt-3 mb-3">
          <input
            type="text"
            placeholder="Enter City Name"
            className="form-control search-box w-50 text-center"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        {/* Button is disabled until a city is entered */}
        <button 
          className="btn btn-primary" 
          onClick={handleGetStarted} 
          disabled={!city.trim()}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

export default Landingscreen;
