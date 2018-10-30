import React, { Component } from 'react';

class Registration extends Component {
 constructor() {
     super()
     this.state = {
         username: '',
         password: ''
     }
 };

 handleInput = e => {
     this.setState({ [e.target.name]: e.target.value })
 };

 render() {
    return (
        <form>
        <input 
        type='text' 
        placeholder='username' 
        onChange={this.handleInput} 
        value={this.state.username} 
        />
        <input 
        type='password' 
        placeholder='password' 
        onChange={this.handleInput} 
        value={this.state.password} 
        />
        </form>
    )
 }
}

export default Registration;