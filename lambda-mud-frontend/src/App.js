import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom'
import Registration from './Components/Registration'
class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component = {Registration}/>
      </div>
    );
  }
}

export default App;
