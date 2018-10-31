import React, { Component } from "react";
import axios from "axios";
// import { Link } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      error: ""
    };
  }

  inputChangeHandler = event => {
    if (this.state.error) {
      this.setState({
        [event.target.name]: event.target.value,
        error: ""
      });
    } else {
      this.setState({
        [event.target.name]: event.target.value
      });
    }
  };

  submitHandler = event => {
    const { username, password } = this.state;

    const userRegister = {
      username,
      password
    };

    event.preventDefault();

    axios
      .post("http://localhost:8000/api/login", userRegister)
      .then(response => {
        localStorage.setItem("token", response.data.key);
        this.setState({
          username: "",
          password: ""
        });
        this.props.history.push("/adventure");
      })
      .catch(err => {
        this.setState({
          error: "Username or Password is wrong. Try Again",
          username: "",
          password: ""
        });
      });
  };

  render() {
    return (
      <div className="register">
        <h1>Login</h1>
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
          <button type="submit">Begin</button>
        </form>
        <div className="error">{this.state.error}</div>
      </div>
    );
  }
}

export default Login;
