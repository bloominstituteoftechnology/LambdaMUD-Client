import React, { Component } from 'react';
import axios from 'axios';
import './styling/Game.css';

class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password1: '',
            password2: ''
        }
    }
    handleInputChange = (e) => {this.setState({[e.target.name]: e.target.value})}
    handleRegistration = e => {
        e.preventDefault();
        const user = { username: this.state.username, password1: this.state.password1, password2: this.state.password2 }
        axios.post('https://lambda-mud-.herokuapp.com/api/registration/', user)
            .then(res => {
                sessionStorage.setItem('key', res.data.key)
                this.props.history.push('/')
            })
        .catch(err => console.log(err))
    }
    render() {
        return (
            <div className='Registration'>
                <h1 className='Header'>Create Account</h1>
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
                <div className="SubmitButton" onClick={this.handleRegistration}>Submit</div>
            </div>
        )
    }
}

export default Registration;