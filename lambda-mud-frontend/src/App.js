import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom'
import Registration from './Components/Registration'
import Login from './Components/Login'
class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component = {Registration}/>
        <Route path = "/login" component = {Login}/>
        
      </div>
    );
  }
}

export default App;
