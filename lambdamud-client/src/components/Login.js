import React, { Component } from 'react';
 class Login extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: ''
    }
  };
   handleInput = e => {
    this.setState({ [e.target.name]: e.target.value })
  };

  render() {
    return (
      <div>
        <form>
          <input 
          type='text'
           placeholder='username' 
           onChange={this.handleInput} 
           value={this.state.username} 
          />
          <input 
          type='password' 
          placeholder='password' 
          onChange={this.handleInput} 
          value={this.state.password} 
          />
        <button>Login</button>
        </form>
        <div>
          <p> Not yet a member? </p>
          <button>Register</button>
          </div>
        </div>

    )
  }
};

export default Login;