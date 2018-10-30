import React, { Component } from 'react';
// import axios from 'axios';

class Register extends Component {
    state = {
        username: '',
        password: '',
    };

    render() {
        return (
            <form>
                <div>
                    <label>Username</label>
                    <input 
                        name="username"
                        type="text"/>
                </div>
                <div>
                    <label>Password </label>
                    <input 
                        name="password"
                        type="password"/>
                </div>
                <button>Sign Up</button>
            </form>
        )
    }
}

export default Register;
