import React, { Component } from 'react';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };

    }

    render() {
        return (
        <div className="login-container">
            <h4>Login In</h4>
            <input type="text"/>
            <div className="login-btn">
                LOGIN
            </div>
        </div>
        )


    }



}

export default Login;