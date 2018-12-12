import React, { Component } from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'

class Register extends Component {
    state = {
        username: '',
        password1: '',
        password2: ''
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    signin = e =>{
        e.preventDefault()

        axios
            .post('https://muddymud.herokuapp.com/api/registration/', this.state)
            .then(res => {
                localStorage.setItem('jwt', res.data.key);
                if(localStorage.getItem('jwt')){
                    this.props.history.push('/main');
                }
                
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <div className="auth-bkgrd">
                <div className="auth-form-wrap">
                    <h2>Register:</h2>
                    <form onSubmit = {this.signin}>
                        <div className="auth-form">
                            <label>Username</label>
                            <input name = 'username' value = {this.state.username} onChange = {this.handleChange} type="text"></input>
                        </div>
                        <div className="auth-form">
                            <label>Password</label>
                            <input name = 'password1' value = {this.state.password1} onChange = {this.handleChange} type="password"></input>
                        </div>
                        <div className="auth-form">
                            <label>Enter Password Again</label>
                            <input name = 'password2' value = {this.state.password2} onChange = {this.handleChange} type="password"></input>
                        </div>
                        <div className="auth-form-btn">
                            <button type = "submit">Register</button>
                            <Link to = '/'><button type= "button">Back</button></Link>
                        </div>
                    </form>
                </div>
            </div>
            );
    }
}

export default Register;