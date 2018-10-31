import React, { Component } from 'react';

class Register extends Component {
  state = {
    username: '',
    password: ''
  }
  render() {
    return (
      <form onSubmit={this.register}>
        <div>
          <label>Username</label>
          <input 
            value={this.state.username} 
            onChange={this.handleChange} 
            type="text" 
          />
        </div>
        <div>
          <label>Password</label>
          <input 
            value={this.state.password} 
            onChange={this.handleChange} 
            type="text" 
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
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }
}

export default Register;
