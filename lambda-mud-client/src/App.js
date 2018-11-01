import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route } from "react-router-dom";
import { Link } from "react-router-dom";

import Register from "./components/Register";
import Login from "./components/Login";
import Adventure from "./components/Adventure";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/adventure" component={Adventure} />
          <Link to={"/login"}>Login</Link>
          <Link to={"/register"}>Register</Link>
        </header>
      </div>
    );
  }
}

export default App;
