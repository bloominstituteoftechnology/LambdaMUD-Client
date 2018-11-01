import React, { Component } from 'react';
import axios from 'axios';

// const url = 'https://lambda-mud-app.herokuapp.com/api/login/';

class Login extends Component {
    state = {
        username: '',
        password: ''
    }

    handleChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value
        })
    }

    handleLogin = (e) => {
        e.preventDefault()
        const user = {
          username: this.state.username,
          password: this.state.password
        }
        axios.post('https://lambda-mud-app.herokuapp.com/api/login', user)
        .then((response) => {
          console.log(response)
          localStorage.setItem('token', response.data.key)
          this.props.history.push('/');
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
                <button type='button' onClick={this.handleLogin} >Login</button>
            </form>
          </div>
        );
    }
}

export default Login;