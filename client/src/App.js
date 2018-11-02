import React, { Component } from "react";
import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";
import HomePage from "./components/HomePage";
import Landing from "./components/Landing";
import { Route, withRouter } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={Landing} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/homepage" component={HomePage} />
      </div>
    );
  }
}

export default withRouter(App);
