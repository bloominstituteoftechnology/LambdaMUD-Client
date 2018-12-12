import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { Route, withRouter, Link, NavLink } from 'react-router-dom'
import SignUp from './components/SignUp';
import Login from './components/Login';
import MainScreen from './components/MainScreen';


class App extends Component {
  render() {
    return (
      <React.Fragment>
      <div className="App">
        <p> it works! </p>
      </div>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/main" component={MainScreen} />
      </React.Fragment>
    );
  }
}

export default App;
