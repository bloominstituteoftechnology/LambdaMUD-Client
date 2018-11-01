import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Register extends React.Component {
  state = {
    username: "",
    password1: "",
    password2: ""
  };

  handleInputChanger = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleRegisterChange = event => {
    event.preventDefault();

    const user = {
      username: this.state.username,
      password1: this.state.password1,
      password2: this.state.password2
    };

    axios
      .post("https://lambdamudprojectwekk.herokuapp.com/api/registration", user)
      .then(response => {
        localStorage.setItem("key", response.data.key);
        this.props.history.push("/");
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="login-container">
        <form onSubmit={this.handleRegisterChange}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={this.handleInputChanger}
            value={this.state.username}
          />
          <input
            type="password"
            placeholder="Password1"
            name="password1"
            onChange={this.handleInputChanger}
            value={this.state.password1}
          />
          <input
            type="password"
            name="password2"
            placeholder="Password2"
            value={this.state.password2}
            onChange={this.handleInputChanger}
          />
          <button type="submit">Register</button>
          <Link to="/login" className="register-link">
            Login
          </Link>
        </form>
      </div>
    );
  }
}

export default Register;
