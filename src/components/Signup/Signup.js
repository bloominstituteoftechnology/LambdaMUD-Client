import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

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
    console.log(this.state.user);
    axios
      .post(
        "https://backend-mud-lambda.herokuapp.com/api/registration/",
        this.state.user
      )
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleSubmit = event => {
    this.registerUser();
  };

  render() {
    return (
      <div>
        <Link to="/login">Login</Link>
        <h1>Create User</h1>
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
          <h3
            onClick={() => {
              if (this.state.user.password1 == this.state.user.password2) {
                this.handleSubmit();
              }
            }}
          >
            Submit
          </h3>
        </form>
      </div>
    );
  }
}

export default Signup;
