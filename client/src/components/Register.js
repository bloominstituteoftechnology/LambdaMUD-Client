import React, { Component } from "react";
import axios from "axios";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      passwordCheck: "",
      error: ""
    };
  }

  inputChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value,
      error: ""
    });
  };

  submitHandler = event => {
    const { username, password, passwordCheck } = this.state;

    const userRegister = {
      username,
      password1: password,
      password2: passwordCheck
    };

    event.preventDefault();

    if (password === passwordCheck && password.length > 5) {
      axios
        .post("http://localhost:8000/api/registration", userRegister)
        .then(response => {
          localStorage.setItem("token", response.data.key);
          this.setState({
            username: "",
            password: "",
            passwordCheck: ""
          });
        })
        .catch(err => {
          this.setState({
            error: "Username already taken. Please choose another"
          });
        });
    } else if (password.length < 6) {
      this.setState({
        error: "Password length must be at least 6 characters long",
        password: "",
        passwordCheck: ""
      });
    } else {
      this.setState({
        error: "Passwords do not match. Please try again",
        password: "",
        passwordCheck: ""
      });
    }
  };

  render() {
    return (
      <div className="register">
        <h1>Register</h1>
        <form onSubmit={this.submitHandler}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={this.state.username}
            onChange={this.inputChangeHandler}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.inputChangeHandler}
          />
          <input
            type="password"
            name="passwordCheck"
            placeholder="Password Check"
            value={this.state.passwordCheck}
            onChange={this.inputChangeHandler}
          />
          <button type="submit">Enter</button>
        </form>
        <div className="error">{this.state.error}</div>
      </div>
    );
  }
}

export default Register;
