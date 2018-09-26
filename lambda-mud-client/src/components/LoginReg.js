import React, { Component } from 'react';
import axios from 'axios';

class LoginReg extends Component {
  state = { 
    username: '',
    password: '',
    password2: '',
  }

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleLogin = (e) => {
    e.preventDefault();
    axios.post(
      'https://mudmud.herokuapp.com/api/login', 
      { username: this.state.username, password: this.state.password }
    )
      .then(response => {
        console.log(response);
        localStorage.setItem('lambdaMudKey', response.data.key);
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      })
  }

  handleRegistration = (e) => {
    e.preventDefault();
    axios.post(
      'https://mudmud.herokuapp.com/api/registration', 
      { 
        username: this.state.username, 
        password1: this.state.password, 
        password2: this.state.password2
      }
    )
      .then(response => {
        console.log(response);
        localStorage.setItem('lambdaMudKey', response.data.key);
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() { 
    return (
      <div>
        <h2>Login:</h2>
        <form onSubmit={this.handleLogin}>
          <input 
            type="text" 
            name="username" 
            placeholder="username"
            onChange={this.handleInput}
            value={this.state.username}
          />
          <input 
            type="password"
            name="password"
            placeholder="password"
            onChange={this.handleInput}
            value={this.state.password}
          />
        </form>
      </div> 
    );
  }
}
 
export default LoginReg;