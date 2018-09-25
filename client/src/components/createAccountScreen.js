import React, { Component } from 'react';
import '../styles/createAccountScreen.css';
import axios from 'axios';

const URL = process.env.REACT_APP_API_URL;

class RegisterForm extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password1: '',
      password2: ''
    };
  }

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
  }

  render() {
    return (
      <div className="Register-Form">
        <form>
          <input
            placeholder="username"
            name="username"
            value={this.state.username}
            onChange={this.handleInput} 
          />
          <input
            placeholder="password"
            name="password1"
            type="password"
            value={this.state.password1}
            onChange={this.handleInput} 
          />
          <input
            placeholder="confirm password"
            name="password2"
            type="password"
            value={this.state.password2}
            onChange={this.handleInput} 
          />
          <button type="submit">Connect</button>
        </form>
      </div>
    );
  }
}

export default RegisterForm;
