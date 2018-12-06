import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Splash from './components/Splash';
import Login from './components/Login';
import Register from './components/Register';
import GameWindow from './components/GameWindow';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="Body">
        <Route exact path="/" component={Splash} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/window" component={GameWindow} />
      </div>
    );
  }
}

export default App;
