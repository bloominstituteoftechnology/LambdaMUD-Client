import React, { Component } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Game from './components/Game';
import Navbar from './components/Navbar';
import { Route } from 'react-router-dom';
// import styled from 'styled-components';
import './App.css';
import axios from 'axios';

const url = 'https://francis-t-lambda-mud.herokuapp.com'
const url1 = process.env.REACT_APP_FRONTEND_URL

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn: false,
      username: '',
      password: '',
    }
  }
  logout = e => {
    e.preventDefault();
    localStorage.removeItem('Authorization');
    this.setState({ loggedIn: false })
    window.location.href=`${process.env.REACT_APP_FRONTEND_URL}login`
  }
  submit = e => {
    e.preventDefault();
    const { username, password } = this.state;
    axios.post(`${url}/api/login`, {
            username: username,
            password: password
        })
        .then( res => {
            this.setState({ loggedIn: true, username: '', password:'' });
            localStorage.setItem('Authorization', `Token ${res.data.key}`)
            window.location.href=`${url1}game`;
        })
        .catch(err => alert(err.message));
}
  render() {
    console.log(this.state.loggedIn)
    return (
      <div>
        <Navbar loggedIn={this.state.loggedIn} logout={this.logout} />
        <div className="App">
          <Route exact path='/login' component={Login} />
          <Route exact path='/registration' component={Register} />
          <Route exact path='/game' component={Game} />
        </div>
      </div>
    );
  }
}

export default App;
