import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Login from './components/login';
import Register from './components/register';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">

       <Route exact path = "/" render = {props =>
          (<Login {...props}/>)}
        />

        <Route path = '/register' render = {props =>
          (<Register {...props}/>)}
        />

      </div>
    );
  }
}

export default App;
