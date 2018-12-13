import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

import Register from './components/Register';
import Login from './components/Login';
import Chatroom from './components/Chatroom';

class App extends Component {
    state = {
        loggedIn: false,
        registering: false
    }

    register = (userObject) => {
        axios.post("http://lambda-mud-sprint.herokuapp.com/api/registration/", userObject)
        .then(res => {
            console.log("****** Registered User ******")
            localStorage.setItem("token", res.data.key)
            this.setState({ loggedIn: true })
        })
        .catch(function(err) {
            console.log(err)
        })
        this.toggleUser()
    }

    login = (loginObject) => {
        axios.post("http://lambda-mud-sprint.herokuapp.com/api/login/", loginObject)
        .then(res => {
            console.log("****** posting ******")
            localStorage.setItem("token", res.data.key)
            this.setState({
                loggedIn: true
            })
        })
        .catch(function(err) {
            console.log(err)
        })
    }

    logout = (e) => {
        e.preventDefault()
        localStorage.clear()
        this.setState({
            loggedIn: false
        })
    }

    toggleUserUser = () => {
        this.setState({
            registering: !this.state.registering
        })
    }

    render() {
        return (
        <div className="App">
            <header>
               L - MUD
            </header>
            {
            !this.state.loggedIn && !this.state.registering ? (
                <>
                <h1>Lambda MUD</h1>
                <Login
                    toggleUser={this.toggleUser}
                    login={this.login}
                />
                </>
            ) : null
            }
            {
            !this.state.loggedIn && this.state.registering ? (
                <>
                <h1>Signup</h1>
                <Register
                    toggleUser={this.toggleUser}
                    register={this.register}
                />
                </>
            ) : null
            }
            {
            this.state.loggedIn ? (
                <Chatroom
                loggedIn={this.state.loggedIn}
                logout={this.logout}
                />
            ) : null
            }
        </div>
        );
    }
}

export default App;
