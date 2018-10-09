import React, { Component } from "react";
import { Route, withRouter, Redirect } from "react-router-dom";
import { Button } from "reactstrap";

import logo from "./logo.svg";
import "./App.css";

import CreateAccount from "./components/CreateAccount/CreateAccount";
import Login from "./components/Login/Login";
import Main from "./components/Main/Main";

class App extends Component {
  handleSignOut = event => {
    localStorage.removeItem("jwt");
    this.props.history.push("/login");
  };
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Welcome to LambdaMUD!</p>
        </header>

        <div>
          {localStorage.getItem("jwt") && (
            <Button onClick={this.handleSignOut}>Sign Out</Button>
          )}
        </div>

        <Route
          exact
          path="/new-acct"
          render={() =>
            localStorage.getItem("jwt") ? (
              <Redirect to="/main" />
            ) : (
              <CreateAccount />
            )
          }
        />
        <Route
          exact
          path="/login"
          render={() =>
            localStorage.getItem("jwt") ? <Redirect to="/main" /> : <Login />
          }
        />
        <Route path="/main" component={Main} />
      </div>
    );
  }
}

export default withRouter(App);
