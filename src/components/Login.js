import React, { Component } from 'react';
import axios from 'axios';
import '../styles/Login.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }
    handleInputChange = (e) => {this.setState({[e.target.name]: e.target.value})}
    handleLogin = () => {
        const creds = { username: this.state.username, password: this.state.password }
        axios.post('https://lam-mud.herokuapp.com/api/login/', creds )
            .then(response => {
                sessionStorage.setItem('token', response.data.key)
                this.props.history.push('/game')
            })
            .catch(error => console.log(`Login: ${error}`))
    }
    render() { 
        return (
            <div className='Login'>
                <h1 className='title'>Login Screen</h1>
                <input className='input' name='username' value={this.state.username} placeholder='Username' onChange={this.handleInputChange} />
                <input className='input' name='password' value={this.state.password} placeholder='Password' onChange={this.handleInputChange} type='password' />
                <div className='btn' onClick={this.handleLogin}>Connect</div>
            </div>
        );
    }
}
 
export default Login;