import React, { Component } from 'react';
import '../styles/App.css';

import { Route } from 'react-router-dom';
import Navigation from './Navigation';
import Home from './Home';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <Route exact path="/" component={Home} /> 
      </div>
    );
  }
}

export default App;
