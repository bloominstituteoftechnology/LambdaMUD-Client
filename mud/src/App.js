import React, { Component } from 'react';
import Authenticate from './components/Authentication/Authenticate'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Hello
        </header>
      </div>
    );
  }
}

export default Authenticate(App);
