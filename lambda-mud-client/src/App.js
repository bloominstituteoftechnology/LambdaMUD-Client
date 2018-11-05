import React, { Component } from 'react';
import './App.css';
import Login from './components/login';
import Register from './components/register';
import Game from './components/game'

import { Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Lambda MUD Project!</h1>
        </header>
        <Route exact path ='/' component={Game} />
        <Route exact path = '/login' component = {Login} />
        <Route exact path = '/register' component = {Register} /> 
      </div>
    );
  }
}

export default App;
