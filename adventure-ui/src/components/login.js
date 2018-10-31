import React, {Component} from 'react';
import { Link } from 'react-router-dom';


class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
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
            <div className = "login">
                <h3>May all of your wildest dreams come true</h3>
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
                    <button onClick = {this.props.handleLogin} >Login</button>
                    <div>
                        <h4>New Player?  Click below</h4>
                        <Link to = {`/register`}>
                            <button>Register</button>
                        </Link>
                    </div>
                </form>
            </div>

        )
    }
}

export default Login;