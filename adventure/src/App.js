import React, { Component } from 'react';
import Login from './components/login';
import './App.css';
import Registration from './components/registration'

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
        <Registration/>
      </div>
    );
  }
}

export default App;
