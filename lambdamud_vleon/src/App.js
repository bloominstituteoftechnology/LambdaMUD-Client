import React, { Component } from "react";
import { Route } from "react-router-dom";
// import axios from "axios";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Chat from "./Components/Chat";
import Game from "./Components/Game";
import "./App.css";

// const url = ""

// this is the top level of the application where all the components are being rendered

class App extends Component {
  render() {
    return (
      <div className="mud-container">
        <div className="header">
          <h1>Lambda MUD</h1>
        </div>

        <Route
          exact
          path="/"
          render={props => {
            return <Chat {...props} />;
          }}
        />
        <Route
          path="/login"
          render={props => {
            return <Login {...props} />;
          }}
        />
        <Route path="/registration" component={Register} />

        <Route path="/game" component={Game} />
      </div>
    );
  }
}

export default App;
