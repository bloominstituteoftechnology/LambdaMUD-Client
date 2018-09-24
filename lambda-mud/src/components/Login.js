import React from 'react';
import { loginUser } from './../actions/index';
import { connect } from 'react-redux';
import Styled from 'styled-components';
import {withRouter} from 'react-router-dom';

class Login extends React.Component{
    constructor() {
        super();
        this.state = {
            login: {username: '',
            password: ''}
        }
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }


    render() {
        return (
            <div>
                <h4>Join Game</h4>
                <form>
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
                    <button onClick={this.props.loginUser.bind(this.state.login)}>Log in</button>
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

  Login = withRouter(Login);
  export default connect( mapStateToProps, mapActionsToProps)(Login);