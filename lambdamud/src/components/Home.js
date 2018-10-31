import React from "react";
import {NavLink} from "react-router-dom"


export default function Home() {

  return (
    <div className="form">
      <div className="form-title">Welcome to Roger Dodger! Who's Ready to Dodge Some Rodge!?</div>
        <div>
          <div className="form-button"  >
            <NavLink to="/register">Register</NavLink>
            <NavLink to="/login">Login</NavLink>
          </div>
      </div>
    </div>
  );
}
