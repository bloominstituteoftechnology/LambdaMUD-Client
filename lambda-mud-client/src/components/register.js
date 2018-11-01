import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Register extends Component {
    state = {
        username: "",
        password1: "",
        password2: ""
    };

    handleInput = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = e => {
        e.preventDefault();
        const newUser = {
            username: this.state.username,
            password1: this.state.password1,
            password2: this.state.password2
        };
        const URL = 'https://sania-parekh-lambda-mud.herokuapp.com'
        axios
          .post(`${URL}/api/registration/`, newUser)
          .then(response => {
            localStorage.setItem('key', response.data.key);
            this.props.history.push('/');
          })
          .catch(error => console.log(error));
    }
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
                    <Link to='/login'>Login Here!</Link>
                </div>
            </div>
        );
    }

    
}

export default Register;