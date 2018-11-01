import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Login extends React.Component {
  state = {
    username: "",
    password: ""
  };

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleLoginChange = event => {
    event.preventDefault();
    const information = {
      username: this.state.username,
      password: this.state.password
    };

    axios
      .post("https://lambdamudprojectwekk.herokuapp.com/api/login", information)
      .then(response => {
        localStorage.setItem("key", response.data.key);
        this.props.history.push("/");
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="login-container">
        <form onSubmit={this.handleLoginChange}>
          <input
            type="text"
            name="username"
            placeholder="username"
            onChange={this.handleInputChange}
            value={this.state.username}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={this.handleInputChange}
            value={this.state.password}
          />
          <button type="submit">Login</button>
          <Link to="/registration" className="register-link">
            Register
          </Link>
        </form>
      </div>
    );
  }
}

export default Login;
