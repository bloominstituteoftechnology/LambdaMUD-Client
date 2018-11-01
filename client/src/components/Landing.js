import React from "react";
import { Link } from "react-router-dom";

export default () => {
  return (
    <div className="welcome">
      <h1>James LambdaMUD</h1>
      <h4>Login or Register: </h4>
      <div className="btns">
        <Link to="/login">
          <button id="login" type="button">
            Login
          </button>
        </Link>
        <Link to="/register">
          <button type="button">Register</button>
        </Link>
      </div>
    </div>
  );
};
