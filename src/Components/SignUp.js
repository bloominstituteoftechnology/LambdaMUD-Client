import React, { Component } from "react";
import axios from "axios";

import "../styles/forms.css";
class SignUp extends Component {
  state = {
    username: "",
    password1: "",
    password2: ""
  };

  handleChange = e => {
    console.log(this.state);
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    let user = {
      username: this.state.username,
      password1: this.state.password1,
      password2: this.state.password2
    };
    axios
      .post("https://lisacee-mud.herokuapp.com/api/registration/", user)
      .then(res => {
        localStorage.setItem("Token", res.data.key);
        this.props.history.push("/api/adv/init");
      })
      .catch(error => {
        console.log("USER", user);
        alert(error.response.data.error);
      });
    this.setState({ username: "", password1: "", password2: "" });
  };
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h3>Create an Account</h3>
          <input
            type="username"
            name="username"
            id="username"
            placeholder="Username"
            onChange={this.handleChange}
            value={this.state.username}
          />

          <input
            type="password"
            name="password1"
            id="password1"
            placeholder="password"
            onChange={this.handleChange}
            value={this.state.password1}
          />

          <input
            type="password"
            name="password2"
            id="password2"
            placeholder="confirm"
            onChange={this.handleChange}
            value={this.state.password2}
          />

          <button type="submit">Sign Up</button>
        </form>
      </div>
    );
  }
}

export default SignUp;
