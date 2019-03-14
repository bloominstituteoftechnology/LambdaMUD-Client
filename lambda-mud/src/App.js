import React, { Component } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Game from './components/Game';
import Navbar from './components/Navbar';
import { Route } from 'react-router-dom';
// import styled from 'styled-components';
import './App.css';

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
  render() {
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
