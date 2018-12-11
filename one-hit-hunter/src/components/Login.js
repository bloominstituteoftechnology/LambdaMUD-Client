import React from 'react'
import axios from 'axios'

import { Redirect } from 'react-router-dom'
import history from './History'


class Login extends React.Component {
  state = {
    username: '',
    password: '', // --> HINT: if the login gives us a BAD REQUEST, try switching this to password1
    isLoggedIn: false
  }

  login = e => {
    e.preventDefault()

    const loginInfo = {
      username: this.state.username,
      password: this.state.password
      // --> Email might be required
    }

    axios.post('https://one-hit-hunter.herokuapp.com/api/login/', loginInfo)
      .then(response => {
        localStorage.setItem('token', response.data.key)                     
      })
      .catch(err => console.log(err.response));
        
    setTimeout(function() {
      if (localStorage.getItem('token')) {
        console.log('You\'re logged in.') // --> TODO: fix me later?
      } else {
        console.log('getItem check failed -- set more timeout');
      }
    }, 1000);
    
    
  } // --> login()

  handleChange = e => {
    // --> destructure for legibility
    const { name, value } = e.target

    this.setState({ [name]: value });
  } // --> handleChange
  

  render() {
    return (
      <div className = 'login-form'>
        <form onSubmit = {this.login}>
          <input
            name = 'username'
            type = 'text'
            onChange = {this.handleChange}
            placeholder = 'username'
            value = {this.state.username}
          />
          <input
            name = 'password'
            type = 'text'
            onChange = {this.handleChange}
            placeholder = 'password'
            value = {this.state.password}            
          />   
               
          <button type = 'submit' onClick = {this.login}>Let's get Hunting</button>
        </form>
      </div>

    ) // --> return()
  } // --> render()


}

export default Login