/**********************
 * 
 * Gathers and validates user login credentials,
 * if credentials are valid places token on local storage and reloads the page
 * 
 **********************/

import React, { Component } from 'react'
import axios from 'axios'

import './Login.css'

class Login extends Component {
  state = {
    username: '',
    password: ''
  }

  // handles form input change
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  // handles uploading credentials
  handleSubmit = event => {
    event.preventDefault()
    const credentials = { ...this.state}
    axios
      .post(process.env.REACT_APP_LOGIN_URL, credentials)
      .then(res => {
        const token = `Token ${res.data.key}`
        localStorage.setItem('token', token)
        window.location.pathname = window.location.pathname
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div className='login'>
        <div className='login-wrapper'>
          <h1>Login</h1>
          <form>
            <input type='text' name='username' value={this.state.username} placeholder='Username' onChange={this.handleChange} />
            <input type='password' name='password' value={this.state.password} placeholder='Password' onChange={this.handleChange} />
            <button type='submit' onClick={this.handleSubmit}>Submit</button>
          </form>
        </div>
      </div>
    )
  }
}

export default Login