import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Adv from './components/adventure.js';
import Home from './components/home.js';
import Register from './components/register.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path='/' component={Home} />
        <Route path='/registration' component={Register} />
        <Route path='/adv' component={Adv} />
      </div>
    );
  }
}


export default App;
