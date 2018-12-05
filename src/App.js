import React, { Component } from 'react';
import './App.css';
import LoginForm from './Login';
import GameScreen from './GameScreen';
import Register from './Register';
import HomeScreen from './HomeScreen';

class App extends Component {
  render() {
    
    return ( 
      <div className="App">
        <HomeScreen/>
      </div>
    );
  }
}

export default App;
