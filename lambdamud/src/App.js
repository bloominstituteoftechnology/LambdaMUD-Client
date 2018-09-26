import React, { Component } from 'react';
import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import Main from './components/Main';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to LambdaMUD</h1>
        </header>
        <Register />
        <Login />
        <Main />
      </div>
    );
  }
}

export default App;
