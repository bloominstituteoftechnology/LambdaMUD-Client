import React, { Component } from "react";
import Registration from "./Registration";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/Login";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/registration" component={Registration} />
        <Route path="/adventure" component={Adventure} />
        <Route path="/login" component={Login} />
      </div>
    );
  }
}

export default App;
