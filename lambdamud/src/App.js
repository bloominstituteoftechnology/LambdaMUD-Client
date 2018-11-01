import React, { Component } from "react";
import { Route } from "react-router-dom";

import "./App.css";

import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import Authenticate from "./components/Auth/Authenticate";
import Game from "./components/Game/Game"
import Middleman from "./components/Auth/Middleman"


class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/middleman" component={Middleman} />
        {/* <Route path="/authenticate" component={Authenticate} /> */}
        <Route exact path="/play" component={Game} />

        <h1>YOYOYOYOURBOAT</h1>
      </div>
    );
  }
}

export default App;
