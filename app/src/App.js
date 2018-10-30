import React, { Component } from 'react';
import {
  BrowserRouter
} from 'react-router-dom';
import {isMobile} from 'react-device-detect'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    if (!isMobile) {
      window.resizeTo(600, 444)
    }
    return (
      <div className="App">
        <header className="App-header">
          
        </header>
      </div>
    );
  }
}

export default App;
