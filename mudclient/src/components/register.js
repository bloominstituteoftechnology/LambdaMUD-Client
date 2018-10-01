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

    credentials = JSON.stringify(credentials)

    axios
        .post('https://mud-jjashcraft.herokuapp.com/api/registration/', credentials)
        .then(response =>{
            const dataArray = response;

            sessionStorage.setItem('token', dataArray.data.key)
            sessionStorage.setItem('username', this.state.username)
            let username = sessionStorage.getItem('username')
            let token = sessionStorage.getItem('token')

        }).then(response => {
            
            let token = sessionStorage.getItem('token')
            let auth = "Token " + token

            axios
              .get('https://mud-jjashcraft.herokuapp.com/api/adv/init/', {
                headers: {
                  "Authorization": auth
                }
              })
              .then(response => {

                sessionStorage.setItem('currentRoomTitle', response.data.title);
                sessionStorage.setItem('currentRoomDesc', response.data.description);
                sessionStorage.setItem('playeruuid', response.data.uuid);
                this.props.toUpdateUser({
                  username: this.state.username,
                  isRegistered: true,
                  isLoggedIn: true,
                  uuid: response.data.uuid
                })
                this.props.toUpdateRoom({
                  title: response.data.title,
                  description: response.data.description,
                  players: response.data.players
                })
                // let room = JSON.stringify(this.state.room)
                // console.log('current room', room)
                // this.props.toAddProgress(room);
              })
          })}

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
                <h1>Ready to Play?</h1>
                <input placeholder='username' className='custominput' required type="text" onChange = {this.changeHandler} name='username' value = {this.state.username}/>
                <input placeholder='password' className='custominput' required type="password" name='password1' onChange = {this.changeHandler} value = {this.state.password1}/>
                <input placeholder='confirm password' className='custominput' required type="password" name='password2' onChange = {this.changeHandler} value = {this.state.password2}/>
                <button type='submit' className='register-button'>Register</button>
            </form>
            <p>Already Registered?  <button onClick={this.switchToLogin}>Click here to Login.</button></p>
            </div>
            </React.Fragment>
        );
    }
}

export default Register