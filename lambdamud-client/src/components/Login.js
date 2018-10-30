import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
class Login extends Component {
    state = {
        username: '',
        password: '',
        authorized: false
    }
    inputChangeHandler = event => {
        this.setState({ [event.target.name]: event.target.value })
    };
    submitHandler = event => {
        event.preventDefault();
        const credentials = {
            username: this.state.username,
            password: this.state.password
        }
        //const local = 'http://127.0.0.1:8000'
        const herokuUrl = 'https://jenniferplayer-lambdamud.herokuapp.com'
        axios.post(`${herokuUrl}/api/login`, credentials).then(res => {
            console.log(res.data);
            const token = res.data.key;
            localStorage.setItem('key', token);
            this.setState({ authorized: true });
        })
            .catch(err => {
                console.error(err.response);
            });
        console.log('state', this.state);
    };
    render() {
        return (
            <div className="login">
                <h1>Sign In</h1>
                <form onSubmit={this.submitHandler}>
                    <div>
                        <input
                            value={this.state.username}
                            onChange={this.inputChangeHandler}
                            placeholder="Username"
                            type="text"
                            name="username" />
                    </div>
                    <div>
                        <input
                            value={this.state.password}
                            onChange={this.inputChangeHandler}
                            placeholder="Password"
                            type="password"
                            name="password" />
                    </div>
                    <div>
                        <button type="submit">
                            Sign In
                        </button>
                        <Link to='/Register'> <a>Don't have an account? Register Here</a> </Link>
                    </div>
                    {this.state.authorized ? <Link to="/play"> Play </Link> : null}
                </form>
            </div>
        );
    }
}
export default Login; 