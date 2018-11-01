import React from "react";
import { NavLink } from "react-router-dom";

export default function Home() {
  return (
    <div className="home-page">
      <div className="home-page-title">
        <p>Welcome to Roger Dodger!</p>
        <p>Who's Ready to Dodge Some Rodge!?</p>
    </div>
    <div>
        <div className="form-button">
          <NavLink to="/register">Register</NavLink>
          <NavLink to="/login">Login</NavLink>
        </div>
      </div>
    </div>
  );
}
