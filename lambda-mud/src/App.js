import React, { Component } from "react";
import "./App.css";
import { Route } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";

class App extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    };
  }

  render() {
    return (
      <div className="App">
        <Route path="/" component={Home} />
        <Route exact path="/registration" component={Register} />
        <Route exact path="/login" component={Login} />
      </div>
    );
  }
}

export default App;
