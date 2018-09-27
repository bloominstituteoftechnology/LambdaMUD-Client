import React, { Component } from 'react';
import logo from './logo.svg';
import {Route} from 'react-router-dom';
import Login from './components/login';
import Register from './components/register';
import Game from './components/game';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App-container">
      <Route exact path="/" component={Login}/>
      <Route path="/Register" component={Register}/>
      <Route path="/Game" component={Game}/>
      </div>
    );
  }
}

export default App;
