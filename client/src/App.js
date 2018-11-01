import React, { Component } from "react";
import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";
import HomePage from "./components/HomePage";
import { Route, withRouter } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/registration" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/" component={HomePage} />
      </div>
    );
  }
}

export default withRouter(App);
