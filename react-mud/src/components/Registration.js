
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// axios.defaults.baseURL = "https://vtwo-tristan-lambda-mud.herokuapp.com"

class Registration extends Component {

    constructor() {
        super();
        this.state = {
            username: "",
            password1: "",
            password2: ""
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
        event.preventDefault();
        const newUserCredentials = {
            username: this.state.username, 
            password1: this.state.password1, 
            password2: this.state.password2 
        }
        this.createUser(newUserCredentials)
    }
    createUser = (newUserCredentials) => {
        alert('server call');
        axios
            .post('https://vtwo-tristan-lambda-mud.herokuapp.com/api/registration', newUserCredentials)
            .then(response => {
                console.log(response);
                const token = response.data.key;
                localStorage.setItem('auth', token)               
            })
            .catch(error => {
                console.log(error);
                alert(error);
            })
    
    }
}
export default Registration;