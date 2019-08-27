import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            username:"",
            password:""
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
                <h2>Login</h2>
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
                </form>
                <button>Submit</button>
                <div>
                    Don't have an account?
                    <Link to="/register">Register</Link>
                </div>
            </div>
        )
    }
}

export default Login;