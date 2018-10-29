import React, { Component } from "react";
import axios from "axios";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      error: ""
    };
  }

  onInputChangeHandler = event => {
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

  onSubmitHandler = event => {
    const { username, password } = this.state;

    const userRegistration = {
      username,
      password
    };

    event.preventDefault();

    axios
      .post("http://localhost:8000/api/login", userRegistration)
      .then(response => {
        localStorage.setItem("token", response.data.key);
        this.setState({
          username: "",
          password: ""
        });
      })
      .catch(err => {
        this.setState({
          error: "Either username or password incorrect. Please try again",
          username: "",
          password: ""
        });
      });
  };

  render() {
    return (
      <div className="registration">
        <h1>Login</h1>
        <form onSubmit={this.onSubmitHandler}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={this.state.username}
            onChange={this.onInputChangeHandler}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.onInputChangeHandler}
          />
          <button type="submit"> Let's Go </button>
        </form>
        <div className="error">{this.state.error}</div>
      </div>
    );
  }
}

export default Login;
