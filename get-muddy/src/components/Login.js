import React from 'react';
import axios from 'axios';
import './styling/Login.css';
import { Link } from 'react-router-dom';

class Login extends React.Component {
    state = {
        username: '',
        password: ''
    }

    handleInputChange = (e) => {this.setState({[e.target.name]: e.target.value})}
    handleLogin= e => {
        e.preventDefault();
        const creds = { username: this.state.username, password: this.state.password }
        axios.post('https://lambda-mud-.herokuapp.com/api/Login/', creds)
            .then(res => {
                sessionStorage.setItem('key', res.data.key)
                sessionStorage.setItem('username', this.state.username)
                this.props.history.push('/')
            })
        .catch(err => console.log(err.res))
    }

    render() {
        return (
            <div className='Login'>
                <h1 className='Header'>Login</h1>
                <form className='login-form' onSubmit={this.handleLogin}>
                <input 
                type='text'
                name='username'
                value={this.state.username}
                onChange={this.handleInputChange}
                placeholder="Username"
                />
                <input 
                type='password'
                name='password'
                value={this.state.password}
                onChange={this.handleInputChange}
                placeholder="Password"
                />
                </form>
                <button type='submit' className='login-button'>Login</button>
                <Link to="/Registration">Register here</Link>
            </div>
        )
    }
}

export default Login;