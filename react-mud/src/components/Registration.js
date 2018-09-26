
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Registration extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password1: '',
            password2: '',
        }
    }
    render() {
        return(
            <div className="login">
                <form action="">
                    <input                        
                        className="login-input"
                        placeholder="Username..."
                        name="username"
                        value={this.state.username}
                        type="text"
                        onChange={this.handleInputChange}
                    />
                    <input                        
                        className="login-input"
                        placeholder="Password..."
                        name="password1"
                        value={this.state.password}
                        type="password"
                        onChange={this.handleInputChange}
                    />
                    <input                        
                        className="login-input"
                        placeholder="Confirm Password..."
                        name="password2"
                        value={this.state.password}
                        type="password"
                        onChange={this.handleInputChange}
                    />
                    <button className="login-input login-input-button" onClick={this.handleRegisterSubmit}>Connect</button>
                </form>
            </div>

        )
    };
    handleInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }
    handleRegisterSubmit = (event) => {
        // event.preventDefault();
        const userCredentials = {
            "username": this.state.username, 
            "password": this.state.password 
        } 
        alert(`{\n     "username": "${userCredentials.username}", \n     "password": "${userCredentials.password}"\n}`)        
    }
}
export default Registration;