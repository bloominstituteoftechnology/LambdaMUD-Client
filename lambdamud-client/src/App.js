import React, { Component } from 'react';
import './App.css';
import CreateAccount from './CreateAccount';
import Login from './Login'

class App extends Component {
  render() {
    return (
      <div className="App">
        <CreateAccount />
        <LoginPage />
      </div>
    );
  }
}

export default App;
