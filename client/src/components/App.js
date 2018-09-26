import React, { Component } from 'react';
import '../styles/App.css';

import { Route } from 'react-router-dom';
import Navigation from './Navigation';
import Home from './Home';
import LoginForm from './loginScreen';
import RegisterForm from './createAccountScreen';
import LogoutScreen from './logoutScreen';
import MainScreen from './mainScreen';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <Route exact path="/" component={Home} />
        <Route path="/login" component={LoginForm} />
        <Route path="/register" component={RegisterForm} />
        <Route path="/logout" component={LogoutScreen} />
        <Route path="/game" component={MainScreen} />
      </div>
    );
  }
}

export default App;
