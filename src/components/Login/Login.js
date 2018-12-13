import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect, Switch } from "react-router";
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
        alert(err.response.request.responseText);
      });
  }

  handleSubmit = () => {
    this.loginUser();
    if (localStorage.getItem("accessToken")) {
      this.props.history.push("/mud");
    }
  };

  render() {
    return (
      <div className="signup-container">
        <div className="signup">
          <div className="title">
            <h1>Login</h1>
          </div>
          <div className="form-container">
            <div>
              <form className="column-layout">
                <div className="form-input">
                  <input
                    className="input-username"
                    value={this.state.user.username}
                    name="username"
                    type="text"
                    placeholder="Username"
                    onChange={this.handleChange}
                  />
                  <input
                    className="input-password"
                    value={this.state.user.password1}
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={this.handleChange}
                  />
                </div>
              </form>
            </div>
            <div
              className="form-button"
              onClick={() => {
                this.handleSubmit();
              }}
            >
              Submit
            </div>
          </div>
        </div>
        <Link className="link" to="/signup">
          Click here to Signup
        </Link>
      </div>
    );
  }
}

export default Login;
