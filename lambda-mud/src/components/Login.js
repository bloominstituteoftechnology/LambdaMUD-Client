import React, { Component } from "react";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  addUser = event => {
    event.preventDefault();
    // add code to create the User using the api
    const newUser = {
      username: this.state.username,
      password: this.state.password
    };
    console.log(newUser);
    axios.post("http://localhost:8000/api/login/", newUser);
    this.setState({
      username: "",
      password: ""
    });
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="">
        <form onSubmit={this.addUser}>
          <input
            onChange={this.handleInputChange}
            placeholder="username"
            value={this.state.username}
            name="username"
          />
          <input
            onChange={this.handleInputChange}
            placeholder="password"
            value={this.state.password}
            name="password"
          />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

export default Login;
