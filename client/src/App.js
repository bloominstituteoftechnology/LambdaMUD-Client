import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import LoginForm from './Authentication/Login';
import Registration from './Authentication/Registration';
import Main from './Main';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path='/login' component={LoginForm} />
        <Route path='/registration' component={Registration} />
        <Route path='/' exact component={Main} />
      </div>
    );
  }
}

export default App;
