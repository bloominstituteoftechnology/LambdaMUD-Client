import React, { Component } from "react";
import { AUTH_TOKEN } from "../constants";

class Login extends Component {
  state = {
    login: true, // switch between Login and SignUp
    email: "",
    password: "",
    name: ""
  };

  render() {
    const { login, email, password, name } = this.state;
    return (
      <div>
        <h4 className="toggle">{login ? "Login" : "Sign Up"}</h4>
        <div className="column">
          {!login && (
            <input
              value={name}
              onChange={e => this.setState({ name: e.target.value })}
              type="text"
              placeholder="Your name"
            />
          )}
          <input
            value={email}
            onChange={e => this.setState({ email: e.target.value })}
            type="text"
            placeholder="Your email address"
          />
          <input
            value={password}
            onChange={e => this.setState({ password: e.target.value })}
            type="password"
            placeholder="Choose a safe password"
          />
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

  _confirm = async () => {
    // const { token } = this.state.login ? data.login : data.signup;
    // this._saveUserData(token);
    // this.props.history.push(`/`);
  };

  _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token);
  };
}

export default Login;
