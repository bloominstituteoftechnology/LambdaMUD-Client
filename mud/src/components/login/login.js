import React, { Component } from "react";
import axios from "axios";
import "./login.css";
import { Link, Redirect } from "react-router-dom";

//Login handles both login and registration as well as the "welcome" page
//once a key is in local storage it redirects to the game component

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      password2: "",
      welcome: true,
      login: false,
      register: false
    };
  }

  handleInput = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  /* sends a post request with a new player username and password, this creates a new
     entry in the db with a unique id. a key in returned and saved to local storage
     "logging" them in. sends errors via pop up */ 
  register = (username, password, password2) => {
    axios
      .post("https://liz-mud.herokuapp.com/api/registration/", {
        username: username,
        password1: password,
        password2: password2
      })
      .then(response => {
        localStorage.setItem("key", response.data.key);
        this.props.history.push('/begin')
      })
      .catch(error => {
        alert(error.response.data.error);
      });
  };

  /* sends a post request with user credentials. saves the key from the response and
     logs them in. sends errors via pop up  */
  login = (username, password) => {
    axios
      .post("https://liz-mud.herokuapp.com/api/login/", {
        username: username,
        password: password
      })
      .then(response => {
        localStorage.setItem("key", response.data.key);
        this.props.history.push('/begin')
      })
      .catch(error => {
        console.log(error.response);
        alert(error.response.data.error);
      });
  };

  render() {
    return (
      <div className="loginpage">
        <div className={this.state.welcome ? "welcome" : "hide"}>
          <p>Welcome!</p>
          <p>
            to begin your journey,{" "}
            <span
              onClick={() => this.setState({ welcome: false, register: true })}
            >
              enter here...
            </span>
          </p>
          <p>
            to continue your journey,{" "}
            <span
              onClick={() => this.setState({ welcome: false, login: true })}
            >
              enter here...
            </span>
          </p>
        </div>
        <div
          className={
            this.state.welcome ? "hide" : this.state.login ? "login" : "hide"
          }
        >
          <input
            onChange={this.handleInput}
            id="username"
            placeholder="username"
          />
          <input
            onChange={this.handleInput}
            type="password"
            id="password"
            placeholder="password"
          />
          <button
            type="submit"
            onClick={() => this.login(this.state.username, this.state.password)}
          >
            Submit
          </button>
        </div>
        <div
          className={
            this.state.welcome
              ? "hide"
              : this.state.register
                ? "register"
                : "hide"
          }
        >
          <input
            onChange={this.handleInput}
            id="username"
            placeholder="username"
          />
          <input
            onChange={this.handleInput}
            id="password"
            placeholder="password"
          />
          <input
            onChange={this.handleInput}
            id="password2"
            placeholder="re-enter password"
          />
          <button
            type="submit"
            onClick={() =>
              this.register(
                this.state.username,
                this.state.password,
                this.state.password2
              )
            }
          >
            Submit
          </button>
        </div>
        <p
          className={this.state.welcome ? "hide" : "back"}
          onClick={() =>
            this.setState({
              welcome: true,
              login: false,
              register: false,
              enter: false
            })
          }
        >
          Back
        </p>
      </div>
    );
  }
}

export default Login;
