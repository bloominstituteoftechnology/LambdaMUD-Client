import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class Login extends Component {
  state = {
    username: '',
    password1: '',
    password2: ''
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = event => {
    event.preventDefault()
    const registration = { ...this.state}
    axios
      .post(process.env.REACT_APP_REGISTER_URL, registration)
      .then(res => {
        const token = `Token ${res.data.key}`
        localStorage.setItem('token', token)
        window.location.pathname = '/'
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div>
        <form>
          <input type='text' name='username' value={this.state.username} placeholder='Username' onChange={this.handleChange} />
          <input type='password' name='password1' value={this.state.password} placeholder='Password' onChange={this.handleChange} />
          <input type='password' name='password2' value={this.state.password} placeholder='Confirm Password' onChange={this.handleChange} />
          <button type='submit' onClick={this.handleSubmit}>Submit</button>
        </form>
        <Link to='/'>Login</Link>
      </div>
    )
  }
}

export default Login