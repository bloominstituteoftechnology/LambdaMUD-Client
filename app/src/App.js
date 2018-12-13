import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

import Register from './components/Register';
import Login from './components/Login';

class App extends Component {
    state = {
        loggedIn: false
    }

    register = (userObject) => {
        axios.post("http://lambda-mud-sprint.herokuapp.com/api/registration/", userObject)
        .then(res => {
            console.log("****** Registered User ******")
            localStorage.setItem("token", res.data.key)
            this.setState({ loggedIn: true })
        })
        .catch(err => {
            console.log(err)
        })
    }

    login = (userObject) => {
        axios.post()
        .then(res => {
            console.log("****** posting ******")
        })
        .catch(err => {
            console.log(err)
        })
    }


  render() {
    return (
      <div className="App">
        <header>
            Learn React
        </header>
        <Register register={ this.register } />
        <Login login={ this.login }/>
      </div>
    );
  }
}

export default App;
