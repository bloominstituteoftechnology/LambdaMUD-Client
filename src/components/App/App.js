import React, { Component } from "react";
import { NavLink, Route } from "react-router-dom";
import { withRouter } from "react-router";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";
import Mud from "../Mud/Mud";
import "./App.css";
import { Link } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/mud" component={Mud} />
      </div>
    );
  }
}

export default withRouter(App);
