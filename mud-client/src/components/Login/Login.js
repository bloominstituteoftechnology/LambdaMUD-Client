import React from 'react';

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
                <button>Log in</button>
            </div>
        )
    }
}

export default Login;