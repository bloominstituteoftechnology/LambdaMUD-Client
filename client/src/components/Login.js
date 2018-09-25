import React, { Component } from 'react';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }
    handleInputChange = (e) => {this.setState({[e.target.name]: e.target.value})}
    render() { 
        return (
            <div className='Login'>
                <h1 className='title'>Login Screen</h1>
                <input className='input' name='username' value={this.state.username} placeholder='Username' onChange={this.handleInputChange} />
                <input className='input' name='password' value={this.state.password} placeholder='Password' onChange={this.handleInputChange} type='password' />
                <div className='btn'>Connect</div>
            </div>
        );
    }
}
 
export default Login;