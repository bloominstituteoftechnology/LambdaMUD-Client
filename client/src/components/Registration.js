import React, { Component } from 'react';
import axios from "axios";
import { BrowserRouter, Route, Link } from 'react-router-dom';



class Registration extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password1: '',
            password2: ''
            
        }
    }
    changeInput = e => this.setState({ [e.target.name]: e.target.value });

    submitReg = e => {
        e.preventDefault()
        const reg = {
            username: this.state.username,
            password1: this.state.password1,
            password2: this.state.password2
        }
        const local = 'http://127.0.0.1:8000/api/registration/'
        const apiUrl = 'https://lam-mud-2.herokuapp.com/api/registration/'
        axios
            .post(apiUrl, reg)
            .then(response => {
                sessionStorage.setItem('token', response.data.key);
                this.props.history.push('/game')
                console.log('User registered')
            })
            .catch(err => console.log(err.response))
        this.setState({ username: '', password1: '', password2: '' })
    }
    render() { 
        return (
            <form> 
                <input
          className="input"
          value={this.state.username}
          name="username"
          type="text"
          placeholder="username"
          onChange={this.changeInput}
        />
        <input
          className="input"
          value={this.state.password1}
          name="password1"
          type="password"
          placeholder="password1"
          onChange={this.changeInput}
        />
        <input
          className="input"
          value={this.state.password2}
          name="password2"
          type="password"
          placeholder="password2"
          onChange={this.changeInput}
        />
        <Link to='/login' onClick={this.submitReg}  >
                    Submit
                </Link>
        <button onClick={this.submitReg}> SUB</button>
                
                
            </form>
        );
    }
}


export default Registration;