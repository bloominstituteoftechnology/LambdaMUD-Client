import React, { Component } from "react";
import "../styles/forms.css";
import axios from "axios";

class Login extends Component {
  state = {
    username: "",
    password: ""
  };
  // update state as user types
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  // keep page from reloading and creates user object
  handleSubmit = e => {
    e.preventDefault();
    let user = {
      username: this.state.username,
      password: this.state.password
    };
    // post the user object and add token to local storage
    axios
      .post("https://lisacee-mud.herokuapp.com/api/login", user)
      .then(res => {
        localStorage.setItem("Token", res.data.key);
        this.props.history.push("/api/adv/init");
      })
      //error handling
      .catch(error => {
        alert("Username or password incorrect");
      });
  };
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h3>Login</h3>
          <label for="username">Username</label>
          <input type="text" name="username" onChange={this.handleChange} />
          <label for="password">Password</label>
          <input type="password" name="password" onChange={this.handleChange} />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

export default Login;
