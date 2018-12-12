import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Signup.css";

class Signup extends Component {
  state = {
    user: {
      username: "",
      password1: "",
      password2: ""
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

  registerUser() {
    axios
      .post(
        "https://backend-mud-lambda.herokuapp.com/api/registration/",
        this.state.user
      )
      .then(response => {})
      .catch(err => {});
  }

  handleSubmit = event => {
    this.registerUser();
  };

  render() {
    return (
      <div className="signup-container">
        <div className="signup">
          <div className="title">
            <h1>Create User</h1>
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
                    name="password1"
                    type="password"
                    placeholder="Password"
                    onChange={this.handleChange}
                  />
                  <input
                    className="input-password"
                    value={this.state.user.password2}
                    name="password2"
                    type="password"
                    placeholder="Confirm Password"
                    onChange={this.handleChange}
                  />
                </div>
              </form>
            </div>
            <div
              className="form-button"
              onClick={() => {
                if (this.state.user.password1.length < 8) {
                  return alert("Password should be longer than 8 chars");
                } else if (
                  this.state.user.password1 === this.state.user.password2
                ) {
                  this.handleSubmit();
                } else {
                  alert("Passwords do not match");
                }
              }}
            >
              Submit
            </div>
          </div>
        </div>
        <Link className="link" to="/login">
          Click here to Login
        </Link>
      </div>
    );
  }
}

export default Signup;
