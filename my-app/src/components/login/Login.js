import React, { Component } from 'react';
import axios from 'axios';
import {Input, Button} from '../global-styles/Global'

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
                <Input value={this.state.username} placeholder='username' onChange={this.handleChange} name='username' autoComplete="off" />
                <label>Password</label>
                <Input value={this.state.password} placeholder='password' onChange={this.handleChange} name='password' type='password' />
                <Button onClick={this.handleLogin} >Login</Button>
            </form>
          </div>
        );
    }
}

export default Login;