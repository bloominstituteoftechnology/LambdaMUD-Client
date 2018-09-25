import React, { Component } from 'react';
import '../styles/loginScreen.css';

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '' 
    }; 
  }

  render() {
    return (
      <div className="Login-Form">
        <form>
          <input
            placeholder="username"
            name="username"
          />
          <input
            placeholder="password"
            name="password"
            type="password"
          />
          <button type="submit">Connect</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
