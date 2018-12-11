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
          <Route exact path={'/'}
            render={(props) => <LogIn />}
          />
          <a
            className="App-link"
            href="https://i.imgur.com/z5k5ykt.jpg"
            target="_blank"
            rel="noopener noreferrer"
          >
            No Need To Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
