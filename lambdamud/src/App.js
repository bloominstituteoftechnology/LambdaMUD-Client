import React, { Component } from 'react';
import './App.css';
import Register from './components/Register';
import Login from './components/Login';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to LambdaMUD</h1>
        </header>
        <Register />
        <Login />
      </div>
    );
  }
}

export default App;
