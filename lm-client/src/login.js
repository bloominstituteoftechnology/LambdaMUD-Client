import React from 'react';
import './app.css';
import Axios from 'axios';

//Login form

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        username:"",
        password:""
    }
    }
    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
          });
    }

    handleSubmit = e => {
        e.preventDefault();
        const {username,password} = this.state;
        Axios.post('https://jmcadvproject.herokuapp.com/api/login/',{username,password})
        .then(res => {
            localStorage.setItem('jwt',res.data.key);
            if (localStorage.getItem('jwt')){
                this.props.history.push('/')
            }
        })
    }

    render() {
        return (
        <div className = "form-container" onSubmit = {this.handleSubmit}>
            <form className = "login-form">
            <h3>Login</h3>
                <input 
                    onChange = {this.handleChange}
                    type = "text" 
                    placeholder = "Enter Username"
                    value = {this.state.username}
                    id = "username"
                />
                <input
                    onChange = {this.handleChange}
                    type = "text"
                    placeholder = "Enter Password"
                    id = "password"
                    value = {this.state.password}
                />
                <button 
                   
                    className = "form-btn">
                Login
                </button>
            </form>
        </div>
        )
    }
}