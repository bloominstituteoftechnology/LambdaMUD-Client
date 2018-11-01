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
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
            type="text"
          />
        </div>
        <div>
          <input
            placeholder="Password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            type="password"
          />
        </div>
        <div>
          <button type="submit">Connect</button>
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
        this.props.history.push("/main");
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
