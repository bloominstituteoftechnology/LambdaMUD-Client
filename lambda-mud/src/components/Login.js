import React from 'react';
import { loginUser } from './../actions/index';
import { connect } from 'react-redux';
import Styled from 'styled-components';
import {withRouter} from 'react-router-dom';

class Login extends React.Component{
    constructor() {
        super();
        this.state = {
            username: '',
            password: ''
        }
    }

//sets username and password to state
    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

//submits credentials to server via actions
    submitLogin = (event) => {
        event.preventDefault();
        const user = this.state;
        this.props.loginUser(user, this.props.history);
        this.setState({username: '', password: ''})
    }


    render() {
        return (
            <div>
                <h4>Join Game</h4>
                <form onSubmit={this.submitLogin}>
                    <input
                        type='text'
                        name='username'
                        placeholder='username'
                        value={this.state.username}
                        onChange={this.handleChange}
                    />
                    <input
                        type='password'
                        name='password'
                        placeholder='password'
                        value={this.state.password}
                        onChange={this.handleChange}
                    />
                    <button onClick={this.submitLogin}>Log in</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
      users: state.users
    }
  }
  
  const mapActionsToProps = {
    loginUser: loginUser,
  }

//added withRouter so that page redirects upon login
  Login = withRouter(Login);
  export default connect(mapStateToProps, mapActionsToProps)(Login);