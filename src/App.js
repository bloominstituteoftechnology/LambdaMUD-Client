import React, { Component } from 'react';
import { Route } from "react-router-dom";
import './App.css';
import Authenticate from './components/authenticate/authenticate';
import GameWindow from './components/gamewindow/gamewindow';
import Login from './components/login/login';
import Registration from './components/registration/registration';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/login/" component={Login} />
        <Route path="/register/" component={Registration} />
        <Route exact path="/" component={GameWindow} />
      </div>
    );
  }
}

export default Authenticate(App);
