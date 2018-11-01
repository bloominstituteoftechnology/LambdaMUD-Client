import React, { Component } from "react";
import { Link } from "react-router-dom";

class Home extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Welcome to LambdaMUD!</h1>
          <Link to="/registration" className="App-link">
            Register
          </Link>
          <Link to="/login" className="App-link">
            Log In
          </Link>
        </header>
      </div>
    );
  }
}

export default Home;
