import React, { Component } from "react";
import "./App.css";
import Registration from "./components/Registration";
import Login from "./components/Login";
import { Route } from "react-router-dom";
import GameScreen from "./components/GameScreen";
import { ToastContainer } from "react-toastify";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/registration" component={Registration} />
        <Route path="/login" component={Login} />
        <Route path="/adventure" component={GameScreen} />
        <ToastContainer />
      </div>
    );
  }
}

export default App;
