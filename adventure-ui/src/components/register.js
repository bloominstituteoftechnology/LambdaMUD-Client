import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Register extends Component {
    constructor() {
        super();

        this.state = {
            username: '',
            password: '',
            password_check: ''
        };
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
    }

    render() {
        return (
            <div className = "register">
                <h3>Please sign up!</h3>
                <form onSubmit = {this.handleSubmit}>
                    <input type = "text"
                    value = {this.state.username}
                    id = 'username'
                    placeholder = "Username"
                    onChange = {this.handleChange}
                    />
                    <input type = "password"
                    value = {this.state.password}
                    id = 'password'
                    placeholder = "Password"
                    onChange = {this.handleChange}
                    />
                    <input type = "password"
                    value = {this.state.password}
                    id = 'password_check'
                    placeholder = "Please Re-enter Password"
                    onChange = {this.handleChange}
                    />
                    <button>Submit</button>
                </form>
            </div>

        )
    }
}

export default Register;