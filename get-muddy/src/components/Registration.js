import React from 'react';
import axios from 'axios';
import './styling/Game.css';
import { Link } from 'react-router-dom';
class Registration extends React.Component {
    state = {
        username: '',
        password1: '',
        password2: ''
    }
    
    
    handleRegistration = e => {
        e.preventDefault();
        const user = { username: this.state.username, password1: this.state.password1, password2: this.state.password2 }
        axios.post('https://lambda-mud-.herokuapp.com/api/registration/', user)
            .then(res => {
                sessionStorage.setItem('key', res.data.key)
                this.props.history.push('/')
            })
        .catch(err => console.log(err.res))
    }
    handleInputChange = (e) => { this.setState({[e.target.name]: e.target.value}) }

    render() {
        return (
            <div className='Registration'>
                <h1 className='Header'>Create Account</h1>
            <form className='register-form' onSubmit={this.handleRegistration}>
                <input 
                type='text'
                name='username'
                value={this.state.username}
                onChange={this.handleInputChange}
                placeholder="Username"
                />
                <input 
                type='password'
                name='password1'
                value={this.state.password1}
                onChange={this.handleInputChange}
                placeholder="Password"
                />
                <input 
                type='password'
                name='password2'
                value={this.state.password2}
                onChange={this.handleInputChange}
                placeholder="Repeat password"
                />
                </form>
                <button type='submit' className="register-button">Register</button>
                <Link to="/login" className="register-link">Back to Login</Link>
            </div>
        )
    }
}

export default Registration;