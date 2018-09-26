import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import GameStart from './components/GameStart'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path='/api/registration/' component={Register} />
        <Route path='/api/login/' component={Login} />
        <Route path='/api/gamestart' component={GameStart} />
      </div>
    );
  }
}

export default App;
