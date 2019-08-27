import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

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

    handleSubmit = event => {
        event.preventDefault();
        let URL = `https://lambda-mud-cs.herokuapp.com/api/login/`
        axios
        .post(URL, {
            username: this.state.username,
            password: this.state.password
        })
        .then(res => {
            localStorage.setItem("authToken", res.data.key);
            console.log(res.data.key)
            // clear form after submit
            this.setState({
                username:"",
                password:""
            })
            // navigate to page after logging in
            this.props.history.push("/game")
        })
        .catch(err => {
            alert("Invalid Credentials")
            this.setState({
                username:"",
                password:""
            })
            console.log(err)
        });
    }

    render() {
        return (
            <div>
                <div>    
                    <Link to="/">
                        Home
                    </Link>
                </div>
                <h2>Login</h2>
                <form onSubmit={this.handleSubmit}>
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
                    <button onClick={this.handleSubmit}>Submit</button>
                </form>
                <div>
                    Don't have an account?
                    <Link to="/register">Register</Link>
                </div>
            </div>
        )
    }
}

export default Login;