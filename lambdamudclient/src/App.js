import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Route} from 'react-router-dom';
import LogIn from './components/LogIn.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <Route exact path={'/'}
          render={(props) => <LogIn />}
        />
      </div>
    );
  }
}

export default App;
