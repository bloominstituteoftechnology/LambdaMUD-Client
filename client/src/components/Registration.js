import React, { Component } from 'react';

class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password1: '',
            password2: ''
        }
    }
    handleInputChange = (e) => {this.setState({[e.target.name]: e.target.value})}
    render() { 
        return (
            <div className='Registration'>
                <h1 className='title'>Create Account Screen</h1>
                <input className='input' name='username' value={this.state.username} placeholder='Username' onChange={this.handleInputChange} />
                <input className='input' name='password1' value={this.state.password1} placeholder='Password' onChange={this.handleInputChange} type='password' />
                <input className='input' name='password2' value={this.state.password2} placeholder='Password again' onChange={this.handleInputChange} type='password' />
                <div className='btn'>Connect</div>
            </div>
        );
    }
}
 
export default Registration;