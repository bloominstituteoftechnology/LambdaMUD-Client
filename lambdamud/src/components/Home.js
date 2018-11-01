import React from "react";
import { NavLink } from "react-router-dom";

export default function Home() {
  return (
    <div className="home-page">
      <div className="home-page-title">
        <h1>seinfeld your </h1> 
        <h1>enthusiasm</h1>
    </div>
    <div>
        <div className="form-button">
          <NavLink className="NavLink" to="/register">Register</NavLink>
          <NavLink className="NavLink" to="/login">Login</NavLink>
        </div>
      </div>
    </div>
  );
}
