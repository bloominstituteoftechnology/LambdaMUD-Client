import React from 'react';
import { Link } from 'react-router-dom';

class Register extends React.Component {
    constructor() {
        super();
        this.state = {
            username:"",
            password:"",
            confirmpassword:""
        };
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    render() {
        return (
            <div>
                <h2>Register a new account</h2>
                <form>
                    <input
                        name="username"
                        type="text"
                        placeholder="Select a username"
                        onChange={this.handleChange}
                        value={this.state.username}
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Select a password"
                        onChange={this.handleChange}
                        value={this.state.password}
                    />
                    <input
                        name="confirmpassword"
                        type="password"
                        placeholder="Confirm your password"
                        onChange={this.handleChange}
                        value={this.state.confirmpassword}
                    />
                </form>
                <button>Submit</button>
                <div>
                    Already have an account?
                    <Link to="/login">Log in</Link>
                </div>
            </div>
        )
    }
}

export default Register;