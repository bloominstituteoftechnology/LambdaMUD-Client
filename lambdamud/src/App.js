import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Terminal from "./components/Terminal";
import Home from "./components/Home";
import axios from "axios";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password1: "",
      password2: "",
    };
  }

  /*Handles input fields for Register and Login Routes*/
  inputHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  /*Registers new users*/  
  registerHandler = e => {
    e.preventDefault();

    let newPlayer = {
      username: this.state.username,
      password1: this.state.password1,
      password2: this.state.password2
    };

    axios
      .post(
        "https://lambdamudmboegner.herokuapp.com/api/registration/",
        newPlayer
      )
      .then(response => {
        localStorage.setItem("Token", response.data.key);
      })
      .catch(error => console.log(error.response));

      this.props.history.push('/login')
  };

  /*Logs in registered users*/
  loginHandler = e => {
    e.preventDefault();

    let player = {
      username: this.state.username,
      password: this.state.password1
    };

    axios
      .post("https://lambdamudmboegner.herokuapp.com/api/login/", player)
      .then(response => {
        localStorage.setItem("Token", response.data.key);
      })
      .catch(error => console.log(error.response));
      
    this.props.history.push('/terminal')
  };


  render() {
    return (
      <div className="app">
        <div className="list">
          <Route
            exact
            path="/"
            render={props => (
              <Home
                {...props}
              />
            )}
          />

          <Route
            exact
            path="/register"
            render={props => (
              <Register
                {...props}
                inputHandler={this.inputHandler}
                registerHandler={this.registerHandler}
                value={this.state}
              />
            )}
          />

          <Route
            exact
            path="/login"
            render={props => (
              <Login
                {...props}
                inputHandler={this.inputHandler}
                loginHandler={this.loginHandler}
                value={this.state}
              />
            )}
          />

          <Route
            exact
            path="/terminal"
            render={props => (
              <Terminal
                inputHandler={this.inputHandler}
                terminalHandler={this.terminalHandler}
                value={this.state}
              />
            )}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(App);