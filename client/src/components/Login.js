import React from 'react';
import {withRouter, NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {login} from '../actions/index';

class Login extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    handleInput = event => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleLogin = event => {
        event.preventDefault();
        let user = {
            username: this.state.username,
            password: this.state.password
        }
        console.log(`user:${user}`)
        this.props.login(user);
    }

    render(){
        if(this.props.isLoggedIn){
            this.props.history.replace('/game')
        }
        return(
            <div className = 'login-container'>
            <h1>Login</h1>
            <form onSubmit={this.handleLogin}>
            <input type = 'text' name = 'username' value={this.state.username} onChange={this.handleInput} placeholder='Username'></input>
            <input type = 'password' name = 'password' value={this.state.password} onChange={this.handleInput} placeholder='Password'></input>
            <button type = 'submit'>Login</button>
            </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.isLoggedIn,
    }
}

export default withRouter(connect(mapStateToProps, {
    login,
})(Login));