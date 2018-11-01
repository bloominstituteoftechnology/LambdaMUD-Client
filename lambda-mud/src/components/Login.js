import React, { Component } from "react";
import axios from "axios";

class Login extends Component {
  state = {
    username: "",
    password: ""
  };
  render() {
    return (
      <form onSubmit={this.login}>
        <div>
          <input
            placeholder="Username"
            value={this.username}
            onChange={this.handleChange}
            type="text"
          />
        </div>
        <div>
          <input
            placeholder="Password"
            value={this.password}
            onChange={this.handleChange}
            type="password"
          />
        </div>
        <div>
          <button type="submit">Log In</button>
        </div>
      </form>
    );
  }
  login = event => {
    event.preventDefault();
    console.log(this.state);

    axios
      .post("http://localhost:8000/api/login/", this.state)
      .then(res => {
        localStorage.setItem("jwt", res.data.token); // put token in localstorage
        // navigate to users
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

export default Login;
