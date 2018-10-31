import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";
import HomePage from "./components/HomePage";
import { Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <Route path="/registration" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/adventure" component={HomePage} />
      </div>
    );
  }
}

export default App;
