import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path='/api/registration/' component={Register} />
        <Route path='/api/login/' component={Login} />
      </div>
    );
  }
}

export default App;
