import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import './App.css';
import Register from './components/register';
import Login from './components/login';
import Game from './components/game';
import Home from './components/home';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 className="welcome">Welcome!</h1>
          <Link to='/' className="navlinks">Home</Link>
          <Link to='/game' className="navlinks">Game Start</Link>
          <Link to='/login' className="navlinks">Login</Link>
          <Link to='/register' className="navlinks">New User</Link>
          
          <Route path='/' component={Home} />
          <Route path="/game" component={Game} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
      </div>
    );
  }
}

export default App;