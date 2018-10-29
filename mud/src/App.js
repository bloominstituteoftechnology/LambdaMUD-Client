import React, { Component } from 'react';
import Login from './components/login/login';
import './App.css';


class App extends Component {
  constructor() {
    super();
    this.state = {
      projects: []
    }
  }

  render() {
    return (
      <div className="App">
      <p> in progress...</p>
      <i className="fas fa-gamepad fa-spin"></i>
       <Login/>
      </div>
    );
  }
}

export default App;
