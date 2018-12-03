import React from "react";
import { Link } from "react-router-dom";
import "../styles/style.css"

const FrontPage = () => {
  return (
    <div className="window">
      <h1>Welcome to LambdaMUD</h1>

      <Link to={"/api/registration"}>
        {" "}
        <button>New User </button>
      </Link>

      <Link to={"/api/login"}>
        <button>Returning User</button>
      </Link>
    </div>
  );
};

export default FrontPage;
