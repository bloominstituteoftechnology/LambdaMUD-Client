import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
class Register extends Component {
    state = {
        username: '',
        password1: '',
        password2: '',
        accountCreated: '',
        response: {
            status: 201,
            content: {}
        }
    }
    inputChangeHandler = event => {
        this.setState({ [event.target.name]: event.target.value })
    };
    submitHandler = event => {
        event.preventDefault();
        //const local = 'http://127.0.0.1:8000'
        const herokuUrl = 'https://jenniferplayer-lambdamud.herokuapp.com'
        axios.post(`${herokuUrl}/api/registration`, this.state)
            .then(res => {
                console.log(res.data);
                const token = res.data.key;
                localStorage.setItem('key', token);
                this.setState({
                    accountCreated: 'Your account has been created, click here to login',
                    response: {status:201, content:{}}
                })
           })
            .catch(err => {
                const error = {
                    status: err.response.status,
                    content: err.response.data
                }
                this.setState({
                    response: error
                })
            });
        console.log('state', this.state);
    };
    render() {
        return (
            <div className="register">
                <h1>Register</h1>
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
                            value={this.state.password1}
                            onChange={this.inputChangeHandler}
                            placeholder="Password"
                            type="password"
                            name="password1" />
                    </div>
                    <div>
                        <input
                            value={this.state.password2}
                            onChange={this.inputChangeHandler}
                            placeholder="Password again"
                            type="password"
                            name="password2" />
                    </div>
                    <div>
                        <button type="submit">
                            Create Account
                        </button>
                        <Link to='/login'><a>Account created? Login Here</a></Link>
                    </div>
                </form>
                <div> {this.state.response.content.error}</div>
                <div><Link to='/'><a>{this.state.accountCreated}</a></Link></div>
            </div>
        );
    }
}
export default Register; 