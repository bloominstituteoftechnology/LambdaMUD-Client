import React, { Component } from 'react';
import './App.css';
import LoginForm from './Login';
import GameScreen from './GameScreen';
import Register from './Register';

class App extends Component {
  render() {
    
    return ( 
      <div className="App">
        <GameScreen/>
      </div>
    );
  }
}

export default App;
