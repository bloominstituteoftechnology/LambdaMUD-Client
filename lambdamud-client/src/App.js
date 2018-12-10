import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route } from 'react-router-dom';

import Registration from './components/registrations';

class App extends Component {
  render() {
    return (
      <div className="App">
       <Route path='/register' component={Registration} />
      </div>
    );
  }
}

export default App;
