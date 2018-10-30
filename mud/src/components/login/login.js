import React, { Component } from "react";
import axios from "axios";
import "./login.css";
import { Link } from "react-router-dom";

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

  register = (username, password, password2) => {
    axios
      .post("http://localhost:8000/api/registration/", {
        username: username,
        password1: password,
        password2: password2
      })
      .then(response => {
        localStorage.setItem('key', response.data.key);
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  login = (username, password) => {
    axios
      .post("http://localhost:8000/api/login/", {
        username: username,
        password: password
      })
      .then(response => {
        localStorage.setItem('key', response.data.key);
      })
      .catch(error => {
        console.log(error.response);
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
            id="password"
            placeholder="password"
          />
          <Link to="/begin"><button
            type="submit"
            onClick={() => this.login(this.state.username, this.state.password)}
          >
            Submit
          </button></Link>
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
            this.setState({ welcome: true, login: false, register: false })
          }
        >
          Back
        </p>
      </div>
    );
  }
}

export default Login;
