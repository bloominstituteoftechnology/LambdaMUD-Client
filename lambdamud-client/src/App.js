import React, { Component } from 'react';
import './App.css';
import Login from './components/Login';
import Game from './components/Game';
import Registration from './components/Registration';

import { Route , withRouter } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 className="App-title">Welcome to LambdaMUD <i class="fas fa-gamepad"></i></h1>
        <Route exact path='/' component={Game} />
        <Route path = "/registration" component = {Registration} />
        <Route path = "/login" component = {Login} />
      </div>
    );
  }
}

export default withRouter(App);
