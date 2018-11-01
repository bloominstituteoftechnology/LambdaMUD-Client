import React, { Component } from 'react';
import axios from 'axios';

const url = 'https://dungeon-pusher-app.herokuapp.com/api/login/';

class Login extends Component {
    state = {
        username: '',
        password: '',
    }

    handleChange = (event) => {
        this.setState({
          [event.target.name]: event.target.value
        })
    }

    handleLogin = (event) => {
        event.preventDefault()
        const user = {
          username: this.state.username,
          password: this.state.password
        }
        axios.post(url, user)
        .then((response) => {
          console.log(response)
          localStorage.setItem('token', response.data.key)
        })
    
        this.setState({
          username: '',
          password: ''
        })
    }

    render() {
        return (
          <div className="App">
            <form>
                <label>Username</label>
                <input value={this.state.username} placeholder='username' onChange={this.handleChange} name='username' autoComplete="off" />
                <label>Password</label>
                <input value={this.state.password} placeholder='password' onChange={this.handleChange} name='password' type='password' />
                <button onClick={this.handleLogin} >Login</button>
            </form>
          </div>
        );
    }
}

export default Login;