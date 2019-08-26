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
        // http://127.0.0.1:8000/api/
        // https://muddymud.herokuapp.com/api/registration/
        axios
            .post('http://localhost:8000/api/registration/', this.state)
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
            <div className="home-wrap">
                <div className="home-box">
                    <h2 className="auth-title">Register:</h2>
                    <form className="forms" onSubmit = {this.signin}>
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
                        <div className="auth-links">
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