import React, { Component } from 'react';
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
    this.props.loginUser(this.state, this.props.history);
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
