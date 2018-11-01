import React, { Component } from 'react';
import axios from 'axios';

const url = "https://lambdamud-fred-sohn.herokuapp.com/api/registration"

class Register extends Component {
  state = {
    username: '',
    password1: '',
    password2: ''
  }
  render() {
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
          <label>Password1</label>
          <input 
            name="password1"
            value={this.state.password1} 
            onChange={this.handleChange} 
            type="password" 
          />
        </div>
        <div>
          <label>Password2</label>
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
  register = event => {
    event.preventDefault();

    axios.post(url, {username: this.state.username, password1: this.state.password1, password2: this.state.password2})
    .then(res => {
      console.log('res.data: ', res.data);
      localStorage.setItem('Token', res.data.key);
      this.props.history.push('/login')
    }).catch(err => {
      console.log(err);
    })
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }
}

export default Register;
