import React, { Component } from 'react';
import { Route } from 'react-router-dom';
// import axios from 'axios';

import Login from './components/login';
import Register from './components/register';
import './App.css';


class App extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      password_check: ''
    }
    console.log(this.state)
  }

//-------- Handler Functions----------//

handleChange = event => {
  this.setState({ [event.target.name]: event.target.value })
}

handleSubmit = event => {
  event.preventDefault();
}

  render() {
    return (
      <div className="App">

       <Route exact path = "/login" render = {props =>
          (<Login {...props}
          handleSubmit = {this.handleSubmit}
          handleChange = {this.handleChange}
          handleLogin = {this.handleLogin}

          />)}
        />

        <Route path = '/register' render = {props =>
          (<Register {...props}
            handleSubmit = {this.handleSubmit}
            handleChange = {this.handleChange}
            handleRegister = {this.handleRegister}
          />)}
        />    

      </div>
    );
  }
}

export default App;
