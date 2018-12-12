import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Login extends Component {
  state = {
    user: {
      username: "",
      password: ""
    }
  };

  handleChange = event => {
    this.setState({
      user: {
        ...this.state.user,
        [event.target.name]: event.target.value
      }
    });
  };

  loginUser() {
    axios
      .post(
        "https://backend-mud-lambda.herokuapp.com/api/login/",
        this.state.user
      )
      .then(response => {
        localStorage.setItem("accessToken", response.data.key);
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleSubmit = event => {
    this.loginUser();
    if (localStorage.getItem("accessToken")) {
      console.log("login");
    }
  };

  render() {
    return (
      <div>
        <Link to="/signup">Signup</Link>
        <h1>Login</h1>
        <form className="Column-Layout">
          <input
            className="input-username"
            value={this.state.user.username}
            name="username"
            type="text"
            placeholder="Username"
            onChange={this.handleChange}
          />
          <input
            className="input-body"
            value={this.state.user.password}
            name="password"
            type="password"
            placeholder="Password"
            onChange={this.handleChange}
          />
          <h3 onClick={this.handleSubmit}>Submit</h3>
        </form>
      </div>
    );
  }
}

export default Login;
