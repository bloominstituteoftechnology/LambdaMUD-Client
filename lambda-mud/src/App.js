import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";

import Register from "./components/Register";
import Login from "./components/Login";
import Main from "./components/Main";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Welcome to LambdaMUD</h1>
          <div>
            <div className="App-link" onClick={this.logup}>
              Register
            </div>
            <br />
            <div className="App-link" onClick={this.login}>
              Log In
            </div>
          </div>
        </header>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route exact path="/main" component={Main} />
      </div>
    );
  }

  logup = event => {
    this.props.history.push("/register");
  };

  login = event => {
    this.props.history.push("/login");
  };
}

export default withRouter(App);
