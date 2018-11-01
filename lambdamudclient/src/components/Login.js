import React, { Component } from 'react';
import axios from 'axios';

const url = "https://lambdamud-fred-sohn.herokuapp.com/api/login"

class Login extends Component {
  state = {
    username: '',
    password: ''
  }
  render() {
    return (
      <form onSubmit={this.login}>
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
            name="password"
            value={this.state.password} 
            onChange={this.handleChange} 
            type="password" 
          />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    );
  }
  login = event => {
    event.preventDefault();

    axios.post(url, {username: this.state.username, password: this.state.password})
    .then(res => {
      console.log('res.data: ', res.data);
      localStorage.setItem('Token', res.data.key);
      this.props.history.push('/game')
    }).catch(err => {
      console.log(err);
    })
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }
}

export default Login;
