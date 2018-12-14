import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {register} from '../actions/index';

class Register extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password1: '',
            password2: '',
        }
    }

    handleInput = event => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleRegister = event => {
        event.preventDefault();
        const newUser = {
            username: this.state.username,
            password1: this.state.password1,
            password2: this.state.password2
        }
        this.props.register(newUser);
    }

    render(){
        // redirect
        if(localStorage.getItem('uuid') || this.props.isLoggedIn){
            this.props.history.push('/game')
        }
        return(
            <div className = 'register-container'>
            <h1>Register New Account</h1>
            <form onSubmit={this.handleRegister}>
            <input type = 'text' name = 'username' value={this.state.username} onChange={this.handleInput} placeholder='Username'></input>
            <input type = 'password' name = 'password1' value={this.state.password1} onChange={this.handleInput} placeholder='Password'></input>
            <input type = 'password' name='password2' value={this.state.password2} onChange={this.handleInput} placeholder='Password (Again)'></input>
            <button type = 'submit'>Register</button>
            </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.isLoggedIn,
        registerFailure: state.registerFailure
    }
}

export default withRouter(connect(mapStateToProps, {
    register,
})(Register));