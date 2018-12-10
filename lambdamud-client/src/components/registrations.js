import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password1: '',
      password2: '',
      mismatch: false
    };
  }

  render() {
    return (
      <div>
        <h1>LambdaMUD</h1>
        <div>
          <h2>Register User</h2>
          <form>
            <input
              type='text'
              name='username'
              placeholder='Username'
            />
            <input
              type='password'
              name='password1'
              placeholder='Password'
            />
            <input
              type='password'
              name='password2'
              placeholder='Confirm Password'
            />
          </form>
        </div>
        
      </div>
    );
  }
}

export default Registration;