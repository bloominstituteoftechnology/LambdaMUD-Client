import React, { Component } from "react";
import axios from "axios";

class Login extends Component {
  state = {
    login: true, // switch between Login and SignUp
    username: "",
    password: "",
    password2: ""
  };

  handleInput = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  register = (username, password, password2) => {
    axios
      .post("https://lambda-mud-test.herokuapp.com/api/registration/", {
        username: username,
        password1: password,
        password2: password2
      })
      .then(response => {
        localStorage.setItem("key", response.data.key);
        this.props.history.push("/init");
      })
      .catch(error => {
        alert(error.response.data.error);
      });
  };

  login = (username, password) => {
    axios
      .post("https://lambda-mud-test.herokuapp.com/api/registration/", {
        username: username,
        password: password
      })
      .then(response => {
        localStorage.setItem("key", response.data.key);
        this.props.history.push("/init");
      })
      .catch(error => {
        console.log(error.response);
        alert(error.response.data.error);
      });
  };

  render() {
    const { login, username, password, password2 } = this.state;
    return (
      <div>
        <h4 className="toggle">{login ? "Login" : "Sign Up"}</h4>
        <div className="column">
          <input
            value={username}
            onChange={e => this.setState({ username: e.target.value })}
            type="text"
            placeholder="Your username"
          />

          <input
            value={password}
            onChange={e => this.setState({ password: e.target.value })}
            type="password"
            placeholder="Your password"
          />
          {!login && (
            <input
              value={password2}
              onChange={e => this.setState({ password2: e.target.value })}
              type="password"
              placeholder="Retype your password"
            />
          )}
        </div>
        <div className="div">
          <div className="pointer" onClick={() => this._confirm()}>
            {login ? "login" : "create account"}
          </div>
          <div
            className="pointer button"
            onClick={() => this.setState({ login: !login })}
          >
            {login ? "need to create an account?" : "already have an account?"}
          </div>
        </div>
      </div>
    );
  }


}

export default Login;
