import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route } from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to LambdaMUD!</h1>
        </header>
        <Route path='/api/registration/' component={Register} />
        <Route path='/api/login/' component={Login} />
      </div>
    );
  }
}

export default App;
