import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Login extends Component {
    state = {
        username: "",
        password: ""
    };
    render() {
        return (
            <div className="login-container">
                <h1>Hello! Please Login Here.</h1>
                <form onSubmit={this.handleSubmit}>
                <div>
                    <input
                     type="text"
                     value={this.state.username}
                     onChange={this.handleInput}
                     name="username"
                     placeholder="Username"
                     />
                </div>
                <div>
                    <input
                      type="password"
                      value={this.state.password}
                      onChange={this.handleInput}
                      name="password"
                      placeholder="Password"
                      />
                </div>
                <div>
                    <button type="submit">Login</button>
                </div>
                </form>
                <div>
                    <p>Don't have a login yet?</p>
                    <button>Register Here!</button>
                </div>
            </div>
        );
    }

    
}

export default login;