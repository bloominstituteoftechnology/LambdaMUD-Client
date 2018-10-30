import React, { Component } from 'react';
//import logo from './logo.svg';
import Login from './components/Login';
import Register from './components/Register';
import Game from './components/Game';
import {Link, Route} from 'react-router-dom';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Link to='/registration'>Register</Link>
        <Link to='/login'>Login</Link>
        <Route exact path='/login' component={Login} />
        <Route exact path='/registration' component={Register} />
        <Route exact path='/game' component={Game} />
        <div>
          <h1>Help Menu:</h1>
          <p><span>move 'direction': </span>moves you in the direction specified</p>
          <p><span>say 'message': </span>say the input message to the players present in the room</p>
        </div>
      </div>
    );
  }
}

export default App;
