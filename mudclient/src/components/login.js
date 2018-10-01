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
    credentials = JSON.stringify(credentials)

    let token;
    let username;
    axios
        .post('https://mud-jjashcraft.herokuapp.com/api/login/', credentials)
        .then(response =>{
            const dataArray = response;

            sessionStorage.setItem('token', dataArray.data.key)
            sessionStorage.setItem('username', this.state.username)
            username = sessionStorage.getItem('username')
            token = sessionStorage.getItem('token')

        }).then(response => {
            let auth = "Token " + token

            axios
            .get('https://mud-jjashcraft.herokuapp.com/api/adv/init/', 
            {headers: 
                {"Authorization": auth}})
            .then(response => {

            sessionStorage.setItem('currentRoomTitle', response.data.title);
            sessionStorage.setItem('currentRoomDesc', response.data.description);
            sessionStorage.setItem('playeruuid', response.data.uuid);
            this.props.toUpdateUser({username: this.state.username, isRegistered: true, isLoggedIn: true, uuid: response.data.uuid})
            this.props.toUpdateRoom({title: response.data.title, description: response.data.description, players: response.data.players})
            // let room = JSON.stringify(this.state.room)
            // console.log('current room', room)
            // this.props.toAddProgress(room);
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
            <h1>Let's Go!</h1>
                <input placeholder='username' className='custominput' required type="text" onChange = {this.changeHandler} name='username' value = {this.state.username}/>
                <input placeholder='password' className='custominput' required type="password" name='password' onChange = {this.changeHandler} value = {this.state.password1}/>
                <button type='submit' className='register-button'>Login</button>
            </form>
            <p>Still need to register?  <button onClick={this.switchToRegister}>Click here.</button></p>
            </div>
            </React.Fragment>
        );
    }
}

export default Register