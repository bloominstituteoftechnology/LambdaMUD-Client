import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Register extends Component {
    state = {
        username: "",
        password: ""
    };
    render() {
        return (
            <div className="register-container">
                <h1>Hello! Please Register Here.</h1>
                <form onSubmit={this.handleSubmit}>
                <div>
                    <input
                     type="text"
                     value={this.state.username}
                     onChange={this.handleInput}
                     name="username"
                     placeholder="Create a Username"
                     />
                </div>
                <div>
                    <input
                      type="password"
                      value={this.state.password1}
                      onChange={this.handleInput}
                      name="password1"
                      placeholder="Create a Password"
                      />
                </div>
                <div>
                    <input
                      type="password"
                      value={this.state.password2}
                      onChange={this.handleInput}
                      name="password2"
                      placeholder="Retype Your Password"
                      />
                </div>
                <div>
                    <button type="submit">Register</button>
                </div>
                </form>
                <div>
                    <p>Already have a login?</p>
                    <button>Login Here!</button>
                </div>
            </div>
        );
    }

    
}

export default Register;