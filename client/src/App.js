import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
            <LoginBox />
            <RegisterBox />
      </div>
    );
  }
}


class LoginBox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            test: '1'
        }
    }

    submitlogin(e) {
    }

    render() {
        return (
            <div className="hedge-container">
                <div className="register-header">
                    Login
                </div>
                <div className="login-container">
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input className="login-input" type="text" name="username" placeholder="Username"></input>
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input className="login-input" type="password" name="password" placeholder="Password"></input>
                    </div>

                    <button className="login-button" type="button" onClick={this.submitlogin.bind(this)}>Login</button>
                </div>
            </div>
        )
    }
}

class RegisterBox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            test: '1'
        }
    }

    submitregister(e) {
    }

    render() {
        return (
            <div className="hedge-container">
                <div className="register-header">
                    Register
                </div>
                <div className="register-container">
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input className="register-input" type="text" name="username" placeholder="Username"></input>
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input className="register-input" type="password" name="password" placeholder="Password"></input>
                    </div>

                    <button className="register-button" type="button" onClick={this.submitregister.bind(this)}>Register</button>
                </div>
            </div>
        )
    }
}

export default App;
