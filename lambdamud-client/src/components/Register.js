import React, { Component } from 'react';
import axios from 'axios';
import Form from '../styles/form';

class Register extends Component {
  state = {
    username: '',
    password1: '',
    password2: ''
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    axios
      .post('https://jhk-lambdamud.herokuapp.com/api/registration/', this.state)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.username}
            name="username"
            onChange={this.handleChange}
            placeholder="Username"
            required
          />
          <input
            type="password"
            value={this.state.password1}
            name="password1"
            onChange={this.handleChange}
            placeholder="Password"
            required
          />
          <input
            type="password"
            value={this.state.password2}
            name="password2"
            onChange={this.handleChange}
            placeholder="Confirm Password"
            required
          />
          <button type="submit">Register</button>
        </Form>
      </div>
    );
  }
}

export default Register;
