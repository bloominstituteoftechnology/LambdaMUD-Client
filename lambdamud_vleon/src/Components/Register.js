import React, { Component } from 'react';


class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password1: "",
            password2: ""
        };

    }

    render() {
        return (
        <div className="register-container">
            <h4>Register</h4>
            <input type="text" placeholder="username"/>
            <input type="password" placeholder="password"/>
            <input type="password" placeholder="verify password"/>
            <div className="register-btn">
                Register
            </div>
        </div>
        )


    }



}

export default Register;