import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Login extends Component {
    state = {
        username: "",
        password: ""
    };

    handleInput = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = e => {
        e.preventDefault();
        const credentials = {
            username: this.state.username,
            password: this.state.password
        };
        const URL = 'https://sania-parekh-lambda-mud.herokuapp.com'
        axios
          .post(`${URL}/api/login`, credentials)
          .then(response => {
            localStorage.setItem('key', response.data.key);
            this.props.history.push('/');
          })
          .catch(error => console.log(error));
    }
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
                    <Link to='/register'>Register Here!</Link>
                </div>
            </div>
        );
    }

    
}

export default Login;