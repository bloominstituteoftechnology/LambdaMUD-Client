import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import Authenticate from './components/Authentication/Authenticate'
import Game from './components/Game/Game'
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
    }
  }

  render() {
    return (
      <div className="App">
        <Route path='/' component={Game} />
      </div>
    );
  }
}

export default Authenticate(App);
