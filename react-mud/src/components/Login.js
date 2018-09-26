import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: ''
        }
    }
    render() {
        return(
            <div className="login">
                <form action="">
                    <input                        
                        className="login-input"
                        name="username"
                        value={this.state.username}
                        placeholder="Username..."
                        type="text"
                        onChange={this.handleInputChange}
                    />
                    <input                        
                        className="login-input"
                        name="password"
                        value={this.state.password}
                        placeholder="Password..."
                        type="password"
                        onChange={this.handleInputChange}
                    />
                    <button className="login-input login-input-button" onClick={this.handleLoginSubmit}>Connect</button>
                </form>
            </div>

        )
    };
    handleInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }
    handleLoginSubmit = (event) => {
        // event.preventDefault();
        const userCredentials = {
            "username": this.state.username, 
            "password": this.state.password 
        } 
        alert(`{\n     "username": "${userCredentials.username}", \n     "password": "${userCredentials.password}"\n}`)        
    }
}
export default Login;