import React, { Component } from "react";
import Login from "./components/login/login";
import Room from "./components/rooms/rooms";
import { Route, Link } from "react-router-dom";
import "./App.css";
import Pusher from "pusher-js";

class App extends Component {
  render() {
    return (
      <div className="App">
        <i className="fas fa-gamepad" />
        <Route exact path="/" component={Login} />
        <Route
          exact
          path="/begin"
          render={props => <Room {...props} init={this.init} />}
        />
        <Link to="/">
          <div onClick={() => localStorage.clear()} className="logout">
            Logout
          </div>
        </Link>
      </div>
    );
  }
}

export default App;
