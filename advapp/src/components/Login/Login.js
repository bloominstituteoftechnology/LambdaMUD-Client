import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
    state = {
        username: '',
        password: '',
    };

    render() {
        return (
            <form onSubmit={ this.signin }>
                <div>
                    <label>Username</label>
                    <input 
                        name="username"
                        value={this.state.username}
                        onChange={this.handleChange}
                        type="text"/>
                </div>
                <div>
                    <label>Password </label>
                    <input 
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        type="password"/>
                </div>
                <button type="submit">Log In</button>
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
            localStorage.setItem('jwt', res.data.token);
            this.props.history.push('/main');
        })
        .catch(err => {
            this.props.history.push('/login');
            console.error('Axios response: ', err);
        })
    }
}

export default Login;