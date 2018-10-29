import React, { Component } from 'react';
import './App.css';
import { Link, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Game from './components/Game';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h1>LambdaMUD - GHR</h1>
          <Link to="/register">Register</Link>
          <Link to="/login">Log in</Link>
          <Link to="/game">Play game</Link>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/game" component={Game} />
        </header>
      </div>
    );
  }
}

export default App;
