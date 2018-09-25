import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Registration from './components/Registration';
import Login from './components/Login';
import { BrowserRouter, Route, Link } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Route path='/login' component={Login}/>
        <Route path='/register' component={Registration}/>
      </div>
    );
  }
}

export default App;
