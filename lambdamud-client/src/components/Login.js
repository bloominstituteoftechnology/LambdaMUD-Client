import React, { Component } from 'react';

import { Route, withRouter, Link, NavLink } from 'react-router-dom'

import PasswordForm from './PasswordForm'
import UsernameForm from './UsernameForm'

//agregale la funcion para que cuando alguien typee, se cambie el texto
//PasswordForm y UsernameForm

class Login extends React.Component {

    state = {
        password: '',
        username: '',
      }

      handleChange = e => {
        this.setState({ [e.target.name] : e.target.value})
      }

    render() {
        return(
            <div className="note-options">
                <UsernameForm
                    username={this.state.username}
                    handleChange={this.handleChange}
                />
                <PasswordForm 
                    password={this.state.password}
                    handleChange={this.handleChange}
                    name='password'
                />
            </div>
        )
    }
}

export default Login
