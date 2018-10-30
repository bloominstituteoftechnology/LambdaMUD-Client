import React, {Component} from 'react';

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
                    placeholder = "Username"
                    onChange = {this.handleChange}
                    />
                    <input type = "password"
                    value = {this.state.password}
                    placeholder = "Password"
                    onChange = {this.handleChange}
                    />
                    <button>Login</button>
                    <div>
                        <h4>New Player?  Click below</h4>
                        <button>Register</button>
                    </div>
                </form>
            </div>

        )
    }
}

export default Login;