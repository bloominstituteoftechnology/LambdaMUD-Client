import React, { Component } from 'react';
import axios from 'axios';
// import styled from 'styled-components';

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password1: '',
      password2: '',
      // mismatch: false
    };
  }

  handleRegistrationChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  addUser = event => {
    event.preventDefault();
    console.log('STATE: ', this.state);

    axios
      .post('http://localhost:3000/api/registration', this.state)
      .then(res => {
        console.log('RES:', res.data)
        localStorage.setItem('jwt', res.data.token)
        this.props.history.push('/')
      })
      .catch(err => {
        console.log('Server Error', err)
      });
  };

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
              value={this.state.username}
              onChange={this.handleRegistrationChange}
            />
            <input
              type='password'
              name='password1'
              placeholder='Password'
              value={this.state.password1}
              onChange={this.handleRegistrationChange}
            />
            <input
              type='password'
              name='password2'
              placeholder='Confirm Password'
              value={this.state.password2}
              onChange={this.handleRegistrationChange}
            />
          </form>
        </div>
        {/* <div className='mismatch'>
          {this.state.mismatch === false
            ? <p> </p>
            : <p>Passwords do not match! Please try again</p>}
        </div> */}
        <button type='submit'>Register</button>
      </div>
    );
  }
}

export default Registration;