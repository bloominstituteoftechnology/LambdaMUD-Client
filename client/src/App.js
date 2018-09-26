import React, { Component } from 'react';
import logo from './logo.svg';
import {Route} from 'react-router-dom';
import Login from './components/login';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App-container">
      <Route path="/" component={Login}/>
      </div>
    );
  }
}

export default App;
