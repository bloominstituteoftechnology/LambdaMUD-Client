import React, { Component } from 'react';
import axios from 'axios';
import './Login.css';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
        };
    }

    render() {
        return (
            <form onSubmit={ this.signin } className="login-form">
                <div className="login-card">
                    <div className="login-input">
                        <label>Username </label>
                        <input 
                            name="username"
                            value={this.state.username}
                            onChange={this.handleChange}
                            type="text"/>
                    </div>
                    <div className="login-input">
                        <label>Password </label>
                        <input 
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            type="password"/>
                    </div>
                    <button type="submit">Log In</button>
                </div>
            </form>
        );
    };

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    signin = event => {
        event.preventDefault();

        axios
        .post('https://advbackend.herokuapp.com/api/login/', this.state)
        .then(res => {
            console.log('Axios response: ', res);
            localStorage.setItem('token', res.data.key);
            this.props.history.push('/main');
        })
        .catch(err => {
            this.props.history.push('/login');
            console.error('Axios response: ', err);
        })
    }
}

export default Login;