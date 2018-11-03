import React, { Component } from 'react';
import axios from 'axios';

import { Section, Form } from './UserStyles';


class Register extends Component {
  state = {
    regFetching: false, // loading
    regfetchSuccess: null, // new state
    regfetchFailure: null, // error mssg
    username: '',
    password1: '',
    password2: ''
  }

  onInputChange = e => {
    this.setState({[e.target.name]: e.target.value});
  }

  onRegisterSubmit = (e) => {
    e.preventDefault();
    axios({
      method: 'post',
      url: 'https://heromudapp.herokuapp.com/api/registration',
      data: {
        username: this.state.username,
        password1: this.state.password1,
        password2: this.state.password2
      }
    })
    .then(res => {
      this.setState({username: '', password1: '', password2: ''});
      this.props.initPlayer(res.data.key);
    })
    .catch(err => {
      // Username min 4char
      // Pass min 6char
      // Pass1 === Pass2
      // User exists
      console.log('ERROR', err.response.data.error);
    });
  }

  render() {
    return (
      <Section>
        <h2>Register</h2>
        <Form onSubmit={this.onRegisterSubmit}>
          <div>
            <label htmlFor="registerUsername">Username</label>
            <input
              type="text"
              id="registerUsername"
              name="username"
              value={this.state.username}
              onChange={this.onInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="registerPassword1">Password</label>
            <input
              type="password"
              id="registerPassword1"
              name="password1"
              value={this.state.password1}
              onChange={this.onInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="registerPassword2">Re-type Password</label>
            <input
              type="password"
              id="registerPassword2"
              name="password2"
              value={this.state.password2}
              onChange={this.onInputChange}
              required
            />
          </div>
          <button type="submit">Register</button>
        </Form>
      </Section>
    )
  }
}

export default Register;
