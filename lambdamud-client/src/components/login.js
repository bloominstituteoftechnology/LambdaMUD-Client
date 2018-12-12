import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  render() {
    return (
      <div>
        <h1>LambdaMUD</h1>
        <div>
          <h2>User Login</h2>
          <form>
            <input
              type='text'
              name='username'
              placeholder='Username'
              value={this.state.username}
              onChange={this.handleLoginChange}
            />
            <input
              type='password'
              name='password1'
              placeholder='Password'
              value={this.state.password1}
              onChange={this.handleLoginChange}
            />
          </form>
        </div>
        <button onClick={this.loginHandler}>Login</button>
      </div>
    );
  }
}

export default Login;