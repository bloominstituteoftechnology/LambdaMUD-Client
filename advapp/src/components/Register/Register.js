import React, { Component } from 'react';
import axios from 'axios';

import './Register.css';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password1: '',
            password2: '',
        };
    }

    render() {
        return (
            <form onSubmit={ this.register } className="register-form">
                <div className="register-card">
                    <div className="register-input">
                        <label>Username</label>
                        <input 
                            name="username"
                            value={this.state.username}
                            onChange={this.handleChange}
                            type="text"/>
                    </div>
                    <div className="register-input">
                        <label>Password </label>
                        <input 
                            name="password1"
                            value={this.state.password1}
                            onChange={this.handleChange}
                            type="password"/>
                    </div>
                    <div className="register-input">
                        <label>Retype<br/>Password </label>
                        <input 
                            name="password2"
                            value={this.state.password2}
                            onChange={this.handleChange}
                            type="password"/>
                    </div>
                    <button type="submit">Sign Up</button>
                </div>
            </form>
        );
    };

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    register = event => {
        event.preventDefault();

        axios
        .post('https://advbackend.herokuapp.com/api/registration/', this.state)
        .then(res => {
            console.log('Axios response: ', res);
            localStorage.setItem('token', res.data.key);
            this.props.history.push('/login');
        })
        .catch(err => {
            console.error('Axios response:', err)
        });
    };
}

export default Register;
