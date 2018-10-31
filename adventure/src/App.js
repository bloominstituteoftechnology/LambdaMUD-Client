import React, { Component } from 'react';
import Login from './components/login';
import './App.css';

class App extends Component {0
  constructor() {
    super();
    this.state = {
      projects: []
    }
  }
  
  render() {
    return (
      <div className="App">
        <Login/>
      </div>
    );
  }
}

export default App;
