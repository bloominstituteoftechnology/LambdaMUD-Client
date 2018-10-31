import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';

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
  }

//-------- Handler Functions----------//

handleChange = event => {
  this.setState({ [event.target.name]: event.target.value })
}

handleLogin = () => {
  const creds = { username: this.state.username, password: this.state.password };

  axios
    .post('https://baldwin-adv-project.herokuapp.com/api/login', creds)
    .then(response => {
      localStorage.setItem('token', response.data.key);
      localStorage.setItem('username', this.state.username);
      this.props.history.push('/main');
    })
    .catch(error => console.log(error))
}

handleRegister = () => {
  const creds = { username: this.state.username, password: this.state.password, password_check: this.state.password_check };
  axios
    .post('https://baldwin-adv-project.herokuapp.com/api/registration', creds)
    .then(response => {
      localStorage.setItem('token', response.data.key);
      localStorage.setItem('username', this.state.username);
      this.props.history.push('/main');
    })
    .catch(error => console.log(error));
}

  render() {
    return (
      <div className="app">

       <Route exact path = "/login" render = {props =>
          (<Login {...props}/>)}
        />

        <Route path = '/register' render = {props =>
          (<Register {...props}/>)}
        />    

      </div>
    );
  }
}

export default App;
