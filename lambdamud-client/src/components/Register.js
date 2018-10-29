import React, { Component } from 'react';
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

  render() {
    return (
      <div>
        <Form>
          <input
            type="text"
            value={this.state.username}
            name="username"
            onChange={this.handleChange}
            placeholder="Username"
          />
          <input
            type="password1"
            value={this.state.password1}
            name="password1"
            onChange={this.handleChange}
            placeholder="Password"
          />
          <input
            type="password2"
            value={this.state.password2}
            name="password2"
            onChange={this.handleChange}
            placeholder="Confirm Password"
          />
        </Form>
      </div>
    );
  }
}

export default Register;
