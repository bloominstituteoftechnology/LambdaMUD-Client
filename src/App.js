import React, { Component } from "react";
import Game from "./Game";
import Login from "./Login";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import "./App.css";

class App extends Component {
  state = {
    authorized: false,
    key: null
  };
  handleSignUpAndLogin = async (username, password, history) => {
    const result = await fetch(
      `https://lambdamud-server.herokuapp.com/api/registration`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({
          username,
          password1: password,
          password2: password
        })
      }
    );
    if (result.status === 201) {
      this.handleLogin(username, password, history);
    }
  };
  handleLogin = async (username, password, history) => {
    const result = await fetch(
      `https://lambdamud-server.herokuapp.com/api/login/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({ username, password })
      }
    )
      .then(res => res.json())
      .then(res => res);

    if (result.key) {
      this.setState({ authorized: true, key: result.key });
      history.push("/game");
    }
  };
  render() {
    const { authorized, key } = this.state;
    return (
      <Router>
        <div className="root">
          <Switch>
            <Route
              exact
              path="/"
              render={({ history }) => (
                <Login
                  login={(username, password) =>
                    this.handleLogin(username, password, history)
                  }
                  signup={(username, password) =>
                    this.handleSignUpAndLogin(username, password, history)
                  }
                />
              )}
            />
            <Route
              exact
              path="/game"
              render={() =>
                authorized ? <Game token={key} /> : <Redirect to="/" />
              }
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
