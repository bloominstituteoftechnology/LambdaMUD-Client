// This component handles player registration
// and directs player to the game page

import React, { Component } from 'react';
import axios from 'axios';

export default class Register extends Component {
  state = {
    username: '',
    password1: '',
    password2: ''
  };

  // Makes a request to register and direct to game page
  register = e => {
    e.preventDefault();
    console.log(this.state);

    axios
      .post('https://lambdamud-jp.herokuapp.com/api/registration/', this.state)
      .then(res => {
        console.log(res.data);
        localStorage.setItem('jwt', res.data.token);
        this.props.history.push('/adventure');
      })
      .catch(err => {
        console.error(err);
      });
  };

  // Handle text input and push to state
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    console.log('register');
    return (
      <form onSubmit={this.register}>
        <div>
          <label>Username</label>
          <input
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
            type="text"
          />
        </div>
        <div>
          <label>Password</label>
          <input
            name="password1"
            value={this.state.password1}
            onChange={this.handleChange}
            type="password"
          />
        </div>
        <div>
          <label>Confirm Password</label>
          <input
            name="password2"
            value={this.state.password2}
            onChange={this.handleChange}
            type="password"
          />
        </div>
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    );
  }
}
