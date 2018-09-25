import React, { Component } from "react";
import axios from 'axios'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleLoginSubmit = e => {
    e.preventDefault();
    const user = {username: this.state.username, password: this.state.password};
    axios
      .post('https://blakes-lambda-mud.herokuapp.com/api/login', user)
      .then(response => {
        console.log(response)
        localStorage.setItem('key', response.data.key);
        this.props.history.push('/');
      })
      .catch(err => console.log(err))
  };

  render() {
    return (
      <form className="login-form">
        <h3>Login</h3>
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={this.state.username}
          onChange={this.handleInputChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={this.state.password}
          onChange={this.handleInputChange}
        />
        <br />
        <br />
        <button onClick={this.handleLoginSubmit}>
          Log In
        </button>
      </form>
    );
  }
}

export default Login;