import React, { Component } from 'react';
import axios from 'axios';
import Form from '../styles/form';

class Login extends Component {
  state = {
    username: '',
    password: ''
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    axios
      .post('https://jhk-lambdamud.herokuapp.com/api/login/', this.state)
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
            value={this.state.password}
            name="password"
            onChange={this.handleChange}
            placeholder="Password"
            required
          />
          <button type="submit">Login</button>
        </Form>
      </div>
    );
  }
}

export default Login;
