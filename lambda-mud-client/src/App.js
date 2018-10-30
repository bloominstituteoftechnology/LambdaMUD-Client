import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route } from "react-router-dom";

import Register from "./components/Register";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Route exact path="/register" component={Register} />
        </header>
      </div>
    );
  }
}

export default App;
