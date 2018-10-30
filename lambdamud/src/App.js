import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import Login from './compontents/login';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app-container">
      <Route path="/" component={Login}/>
      </div>
    );
  }
}

export default App;
