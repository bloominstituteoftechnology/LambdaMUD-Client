import React, { Component } from 'react';
import '../styles/loginScreen.css';
import axios from 'axios';
import { Redirect } from 'react-router';

const URL = process.env.REACT_APP_API_URL;

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      loggedIn: false 
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

    axios
      .post(`${URL}/login/`, user)
      .then(({data}) => {
        sessionStorage.setItem('key', data.key); 
        this.setState({
          username: '',
          password: '',
          loggedIn: true
        });
      })
      .catch((err) => console.log(err.response));
  }

  render() {
    return (
      this.state.loggedIn ? <Redirect to="/" /> :
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
