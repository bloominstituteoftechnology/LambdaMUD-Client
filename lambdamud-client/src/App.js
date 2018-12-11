import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';

import Home from './components/home';
import Registration from './components/registrations';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path='/' component={Home} />
        <Route path='/registration' component={Registration} />
      </div>
    );
  }
}

export default App;
