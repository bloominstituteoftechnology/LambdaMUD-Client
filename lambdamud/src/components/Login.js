import React, { Component } from "react";
import Axios from "axios";
const secret = "oogaboogabooga"
const host = "https://stefarg-lambdamud.herokuapp.com";
class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    };
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  login = e => {
    e.preventDefault();
    Axios.post(`${host}/api/login`, this.state).then(
      function(response) {
        localStorage.setItem('Auth',`Token ${response.data.key}`);
      },
      this.setState({
        username: "",
        password: ""
      })
    )
    .catch(function(error) {
      alert(error.response.data.error);
    });
  };

  render() {
    return (
      <form onSubmit={this.login}>
        <input
          onChange={this.handleInputChange}
          placeholder="username"
          value={this.state.username}
          name="username"
        />
        <input
          onChange={this.handleInputChange}
          placeholder="Password"
          value={this.state.password}
          name="password"
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default Login;
