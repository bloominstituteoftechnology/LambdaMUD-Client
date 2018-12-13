import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Route} from 'react-router-dom';
import LogIn from './components/LogIn.js';
import Navigation from './components/Navigation.js';
import Register from './components/Register.js';
import MainScreen from './components/MainScreen.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div className="Main-component">
          <Navigation />
          <Route exact path={'/'}
            render={(props) => <MainScreen />}
          />
          <Route path={'/login'}
            render={(props) => <LogIn />}
          />
          <Route path={'/register'}
            render={(props) => <Register />}
          />
        </div>
      </div>
    );
  }
}

export default App;
