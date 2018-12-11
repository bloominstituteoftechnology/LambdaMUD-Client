import React, { Component } from 'react';
import Form from '../styles/form';

class Register extends Component {
    state = {
        username: '',
        password1: '',
        password2: ''
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.registerUser(this.state, this.props.history);
    }

    render() {
        return (
            <div>
                <Form style={{ border: '1px', borderRadius: "20px", bordercolor: 'red' }}  onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        value={this.state.username}
                        name="username"
                        onChange={this.handleChange}
                        placeholder="Username"
                        required
                    />
                    <input
                        type="password"
                        value={this.state.password1}
                        name="password1"
                        onChange={this.handleChange}
                        placeholder="Password"
                        required
                    />
                    <input
                        type="password"
                        value={this.state.password2}
                        name="password2"
                        onChange={this.handleChange}
                        placeholder="Confirm Password"
                        required
                    />
                    <button className="button" type="submit">Register</button>
                </Form>
            </div>
        );
    }
}

export default Register;
