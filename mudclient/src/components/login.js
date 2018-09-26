import React, { Component } from 'react';
import axios from 'axios';
import './components.css'


class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username:'',
            password:'',
        }
    }

changeHandler = (e) => {
    e.preventDefault();
    this.setState({
        [e.target.name]: e.target.value
    })
}

userLogin = (e, credentials) => {
    e.preventDefault();
    console.log('credentials', credentials)
    credentials = JSON.stringify(credentials)
    console.log(credentials)
    let token;
    let username;
    axios
        .post('https://mud-jjashcraft.herokuapp.com/api/login/', credentials)
        .then(response =>{
            const dataArray = response;
            console.log('data array for days', dataArray)
            sessionStorage.setItem('token', dataArray.data.key)
            sessionStorage.setItem('username', this.state.username)
            username = sessionStorage.getItem('username')
            token = sessionStorage.getItem('token')
            console.log('token found', token)
            console.log('username', username)
        }).then(response => {
            let auth = "Token " + token
            console.log(auth)
            axios
            .get('https://mud-jjashcraft.herokuapp.com/api/adv/init/', 
            {headers: 
                {"Authorization": auth}})
            .then(response => {
            console.log('initialize response', response)
            console.log(response.data)
            console.log(response.data.uuid)
            console.log(response.data.description)
            console.log(response.data.title)
            console.log(response.data.players)
            this.props.toUpdateUser({username: this.state.username, isRegistered: true, isLoggedIn: true, uuid: response.data.uuid})
            this.props.toUpdateRoom({title: response.data.title, description: response.data.description, players: response.data.players})
            })
        })
}

switchToRegister = (e) => {
    e.preventDefault();
    console.log('switching')
    this.props.toUpdateUser({
            username:'',
            isRegistered: false,
            isLoggedIn: false
    })
}


 
    render() {
        let credentials = {
            "username": this.state.username,
            "password": this.state.password,
        }
        return (
            <React.Fragment>
            <div className='main'>
            <form method='post' className='form-wrapper' onSubmit = {(e)=>{this.userLogin(e, credentials)}}>
                <input className='custominput' required type="text" onChange = {this.changeHandler} name='username' value = {this.state.username}/>
                <input className='custominput' required type="password" name='password' onChange = {this.changeHandler} value = {this.state.password1}/>
                <button type='submit' className='register-button'>Login</button>
            </form>
            <p>Still need to register?  <button onClick={this.switchToRegister}>Click here.</button></p>
            </div>
            </React.Fragment>
        );
    }
}

export default Register