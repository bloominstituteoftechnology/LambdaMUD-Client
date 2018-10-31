import React, { Component } from 'react';
import { Route } from "react-router-dom";
import './App.css';
import Login from './components/login';
import Register from './components/register';
import GameView from './components/gameview';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Route exact path='/register' render ={props => <Register {...props} />} />
        <Route exact path='/login' render ={props => <Login {...props} />} />
        <Route eact path='/gameview' render ={props => <GameView {...props} />} />
      </div>
    );
  }
}

export default App;
