import React, { Component } from "react";
import axios from "axios";

class Register extends Component {
  state = {
    username: "",
    password1: "",
    password2: ""
  };
  render() {
    return (
      <form onSubmit={this.register}>
        <div>
          <input
            placeholder="Username"
            value={this.username}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <input
            placeholder="Password"
            value={this.password1}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <input
            placeholder="Re-enter password"
            value={this.password2}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    );
  }
  register = event => {
    event.preventDefault();
    console.log(this.state);

    axios
      .post("http://localhost:8000/api/registration/", this.state)
      .then(res => {
        localStorage.setItem("jwt", res.data.token); // put token in localstorage
        // navigate to login
        this.props.history.push("");
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
}

export default Register;
