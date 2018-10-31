import React, { Component } from 'react';
import axios from 'axios';

import { Section, Form } from './UserStyles';


class Register extends Component {

  state = {
    username: '',
    password1: '',
    password2: ''
  }

  onInputChange = e => {
    this.setState({[e.target.name]: e.target.value})
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
      this.props.initPlayer(res.data.key)
    })
    .catch(err => {
      console.log('First', err)
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
            />
          </div>

          <button type="submit">Register</button>
        </Form>

      </Section>
    )
  }
}

export default Register;
