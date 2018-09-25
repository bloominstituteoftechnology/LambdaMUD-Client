import React, { Component } from "react";
import axios from 'axios';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password1: "",
      password2: ""
    };
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleRegisterSubmit = e => {
    e.preventDefault();
    const user = {username: this.state.username, password1: this.state.password1, password2: this.state.password2};
    axios
      .post('https://blakes-lambda-mud.herokuapp.com/api/registration', user)
      .then(response => {
        console.log(response)
        localStorage.setItem('key', response.data.key);
        this.props.history.push('/');
      })
      .catch(err => console.log(err))
  };

  render() {
    return (
      <form className="register-form">
        <h3>Register</h3>
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
          name="password1"
          value={this.state.password}
          onChange={this.handleInputChange}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          name="password2"
          value={this.state.password2}
          onChange={this.handleInputChange}
        />
        <br />
        <br />
        <button onClick={this.handleRegisterSubmit}>
          Sign up
        </button>
      </form>
    );
  }
}

export default Register;