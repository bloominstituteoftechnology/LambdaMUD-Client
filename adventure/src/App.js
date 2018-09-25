import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route } from 'react-router-dom'
import Register from './components/Register'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to LambdaMUD!</h1>
        </header>
        <p className="App-intro">
          No Hacking Please!
        </p>
        <Route path='/api/registration/' component={Register} />
      </div>
    );
  }
}

export default App;
