import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route } from 'react-router-dom';
import LoginForm from './components/Login';
import Registration from './components/Registration';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path='/login' component={LoginForm} />
        <Route path='/registration' component={Registration} />
      </div>
    );
  }
}

export default App;
