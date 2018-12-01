import React from "react";
import { Link } from "react-router-dom";

const FrontPage = () => {
  return (
    <div>
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
