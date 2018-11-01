import React, { Component } from 'react';
import {Route} from 'react-router-dom';

import logo from './logo.svg';
import './App.css';

import Register from './components/Register'
import Login from './components/Login'
import Home from './components/Home'
import Game from './components/Game'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>

        <Route exact path="/" component={Home}></Route>
        <Route exact path="/game" component={Game}></Route>
        <Route exact path="/register" component={Register}></Route>
        <Route exact path="/login" component={Login}></Route>

      </div>
    );
  } 
}

export default App;
