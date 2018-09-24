import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Main from './components/Main';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path='/' component={Main} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
      </div>
    );
  }
}

export default App;
