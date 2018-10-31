import React, { Component } from 'react';
import {
  Route, Link
} from 'react-router-dom';
import {isMobile} from 'react-device-detect';
import logo from './logo.svg';
import './App.css';
import LoginRegView from './components/LoginRegView';
import Login from './components/LoginView';
import Register from './components/RegisterView';

class App extends Component {
  render() {
    if (!isMobile) {
      window.resizeTo(600, 444)
    }
    return (
      <div className="App">
        <header className="App-header">
          <LoginRegView></LoginRegView>
        </header>
  
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </div>
    );
  }
}

export default App;
