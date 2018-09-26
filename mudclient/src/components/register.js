import React, { Component } from 'react';
import axios from 'axios';
import './components.css'


class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username:'',
            password1:'',
            password2:''
        }
    }

changeHandler = (e) => {
    e.preventDefault();
    this.setState({
        [e.target.name]: e.target.value
    })
}

userRegister = (e, credentials) => {
    e.preventDefault();
    console.log('credentials', credentials)
    credentials = JSON.stringify(credentials)
    console.log(credentials)
    axios
        .post('https://mud-jjashcraft.herokuapp.com/api/registration/', credentials)
        .then(response =>{
            const dataArray = response;
            console.log('data array for days', dataArray)
            sessionStorage.setItem('token', dataArray.data.key)
            sessionStorage.setItem('username', this.state.username)
            let username = sessionStorage.getItem('username')
            let token = sessionStorage.getItem('token')
            console.log('token found', token)
            console.log('username', username)
        }).then(
            this.props.toUpdateUser({username: this.state.username, isRegistered: true, isLoggedIn: true}),
            this.setState({username:'', password1: '', password2:''}))
}

switchToLogin = (e) => {
    e.preventDefault();
    console.log('switching')
    this.props.toUpdateUser({
            username:'',
            isRegistered: true,
            isLoggedIn: false
    })
}


 
    render() {
        let credentials = {
            "username": this.state.username,
            "password1": this.state.password1,
            "password2": this.state.password2
        }
        return (
            <React.Fragment>
            <div className='main'>
            <form method='post' className='form-wrapper' onSubmit = {(e)=>{this.userRegister(e, credentials)}}>
                <input className='custominput' required type="text" onChange = {this.changeHandler} name='username' value = {this.state.username}/>
                <input className='custominput' required type="password" name='password1' onChange = {this.changeHandler} value = {this.state.password1}/>
                <input className='custominput' required type="password" name='password2' onChange = {this.changeHandler} value = {this.state.password2}/>
                <button type='submit' className='register-button'>Register</button>
            </form>
            <p>Already Registered?  <button onClick={this.switchToLogin}>Click here to Login.</button></p>
            </div>
            </React.Fragment>
        );
    }
}

export default Register