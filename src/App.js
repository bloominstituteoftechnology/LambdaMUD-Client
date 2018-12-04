import React, { Component } from 'react';
import HomeScreen from './HomeScreen.js';
import Login from './Login.js';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  browserHistory
} from "react-router-dom";


class App extends Component {
  render() {
    
    return (
      <div className="App">
        <Login/>
      </div>
    );
  }
}

export default App;
