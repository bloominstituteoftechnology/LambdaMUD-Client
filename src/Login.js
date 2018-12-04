import React, { Component } from "react";

class Login extends Component {
  state = {
    username: '',
    password: '',
    signingUp: false,
    newUsername: '',
    newPassword: ''
  };
  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };
  handleOpenSignupForm = () => {
    this.setState({ signingUp: true });
  };
  render() {
    const { username, password, signingUp, newUsername, newPassword } = this.state;
    return (
      <div className="login">
        <div className="form">
          <h4>Login to start a game!</h4>
          <label htmlFor="username">Username:</label>
          <input id="username" onChange={this.handleChange} value={username} />
          <label htmlFor="password">Password:</label>
          <input id="password" onChange={this.handleChange} value={password} />
          <button
            className="loginButton"
            onClick={() => this.props.login(username, password)}
          >
            Login
          </button>
          <span>OR</span>
        </div>
        {signingUp ? (
          <div className="form">
            <h4>Join the Force!</h4>
            <label htmlFor="newUsername">Username:</label>
            <input
              id="newUsername"
              onChange={this.handleChange}
              value={newUsername}
            />
            <label htmlFor="newPassword">Password:</label>
            <input
              id="newPassword"
              onChange={this.handleChange}
              value={newPassword}
            />
            <button
              className="signupButton"
              onClick={() => this.props.signup(newUsername, newPassword)}
            >
              Join
            </button>
          </div>
        ) : (
          <button className="openSignupFormButton" onClick={this.handleOpenSignupForm}>
            Join The Force!
          </button>
        )}
      </div>
    );
  }
}

export default Login;
