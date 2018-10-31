import React, { Component } from 'react';
import axios from 'axios';

const url = 'https://lambda-mud-app.herokuapp.com/api/registration/';

class Register extends Component {
    state = {
        username: '',
        password1: '',
        password2: ''
    }

    handleChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value
        })
    }

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
          localStorage.setItem("token", response.data.token)
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
                <input value={this.state.username} placeholder='username' onChange={this.handleChange} name='username' />
                <label>Password</label>
                <input value={this.state.password1} placeholder='password' onChange={this.handleChange} name='password1' />
                <label>Confirm Password</label>
                <input value={this.state.password2} placeholder='confirm password' onChange={this.handleChange} name='password2' />
                <button type='button' onClick={this.handleRegister} >Register</button>
            </form>
          </div>
        );
    }
}

export default Register;