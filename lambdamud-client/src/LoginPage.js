import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class LoginPage extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      password2: "",
      welcome: true,
      login: false,
      register: false,
      enter: false
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
        localStorage.setItem("key", response.data.key);
        this.setState({ enter: true, register: false });
      })
      .catch(error => {
        alert(error.response.data.error);
      });
  };

  login = (username, password) => {
    axios
      .post("http://localhost:8000/api/login/", {
        username: username,
        password: password
      })
      .then(response => {
        localStorage.setItem("key", response.data.key);
        this.setState({ enter: true, login: false });
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
          <p>Hello!</p>
          <p>
            to start your journey,{" "}
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
        <div className={this.state.enter ? "enter" : "hide"}>
          <div>
            Welcome {this.state.username}
            .. 
            <Link to="/begin"> enter</Link>
          </div>
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

export default LoginPage;