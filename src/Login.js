import React, { Component } from 'react';

class Login extends Component {
    state = {
        username:'',
        password:''
    }
    handleChange = event => {
        this.setState({ [event.target.id]: event.target.value})
    }
    render() {
    const { username, password} = this.state
    return (
        <div className='form'>
            <h4>Login to start a game!</h4>
            <label htmlFor='username'>Username:</label>
            <input id='username' onChange={this.handleChange} value={username}/>
            <label htmlFor='password'>Password:</label>
            <input id='password' onChange={this.handleChange} value={password}/>
            <button onClick={() => this.props.login(username, password)}>Login</button>
        </div>
    )}
}

export default Login;