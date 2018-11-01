// Registration component that sends username and password to backend server and returns a token

import React, { Component } from 'react';
import axios from 'axios';

// const url = 'https://lambda-mud-app.herokuapp.com/api/registration/';

class Register extends Component {
    state = {
        username: '',
        password1: '',
        password2: ''
    }

    // sets state for username and password input
    handleChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value
        })
    }

    // sends new user info to server and receives an auth token in response which is saved to local storage
    handleRegister = async (e) => {
        e.preventDefault()
        const user = {
          username: this.state.username,
          password1: this.state.password1,
          password2: this.state.password2,
        }
        try {
          const response = await axios.post('https://lambda-mud-app.herokuapp.com/api/registration', user)
          console.log(response)
          localStorage.setItem("token", response.data.key)
        } catch (e) {
          console.log(e)
        }
        this.setState({
          username: '',
          password1: '',
          password2: ''
        })
    }

    render() {
        return (
          <div className="App">
            <form>
                <label>Username</label>
                <input value={this.state.username} placeholder='username' onChange={this.handleChange} name='username' autoComplete="off" />
                <label>Password</label>
                <input value={this.state.password1} placeholder='password' onChange={this.handleChange} name='password1' type='password' />
                <label>Confirm Password</label>
                <input value={this.state.password2} placeholder='confirm password' onChange={this.handleChange} name='password2' type='password' />
                <button type='button' onClick={this.handleRegister} >Register</button>
            </form>
          </div>
        );
    }
}

export default Register;