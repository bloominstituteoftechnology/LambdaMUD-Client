import React, { Component } from 'react';
import './App.css';
import Login from './components/Login';
import Main from './components/Main';
import Registration from './components/Registration';

import { Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 className="App-title">Welcome to LambdaMUD</h1>
        <Route exact path='/' component={Main} />
        <Route path = "/registration" component = {Registration} />
        <Route path = "/login" component = {Login} />
      </div>
    );
  }
}

export default App;
