import React, { Component } from 'react';

class LoginScreen extends Component {
    state = {
        username : "",
        password : "",

    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value})
    }

    render () {

        return (
            <div>
                <h5>UserName</h5>
                <input onChange = {this.handleChange} className ="input-box" type="text" placeholder = "Username" value = {this.state.username} name = "username"/>
                <h5>Password</h5>
                <input onChange = {this.handleChange} className ="input-box" type="password" placeholder = "Password" value = {this.state.password} name = "password"/>
                <br/>
                <button>Submit</button>
                <button>Sign Up</button>
            </div>
        )

    }

}
export default LoginScreen;