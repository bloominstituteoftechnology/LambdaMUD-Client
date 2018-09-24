import React, { Component } from 'react';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import { Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
      </div>
    );
  }
}

export default App;
