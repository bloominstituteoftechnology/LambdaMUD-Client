import React, { Component } from 'react';
import '../styles/loginScreen.css';
import axios from 'axios';

const URL = process.env.REACT_APP_API_URL;

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '' 
    }; 
  }

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      username: this.state.username,
      password: this.state.password
    };

    axios.post(`${URL}/login/`, user)
      .then((res) => {
        console.log(res);
        this.setState({ username:'', password:'' });
      }).catch((err) => console.log(err));
  }

  render() {
    return (
      <div className="Login-Form">
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="username"
            name="username"
            value={this.state.username}
            onChange={this.handleInput}
          />
          <input
            placeholder="password"
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.handleInput}
          />
          <button type="submit">Connect</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
