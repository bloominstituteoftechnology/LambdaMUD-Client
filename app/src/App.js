import React, { Component } from 'react';
import {
  Route, Link
} from 'react-router-dom';
import {isMobile} from 'react-device-detect';
import logo from './logo.svg';
import './App.css';
import LoginRegView from './components/LoginRegView';
import Login from './components/LoginView';
import Register from './components/RegisterView';
import MUDView from './components/MUDView';

class App extends Component {
  render() {
  
    return (
      <div className="App">
        <header className="App-header">
        <h1 className="mud-header">MMUD</h1>
        <h6 className="mud-slogan" >A Game Anyone Only Plays Simply B/c It's Now A Novelty!</h6>
        <Route exact path="/" component={LoginRegView} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        </header>
        <Route path="/mudview" component={MUDView} />
      </div>
    );
  }
}

export default App;
