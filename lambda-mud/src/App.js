import React, { Component } from 'react';
//import logo from './logo.svg';
import Login from './components/Login';
import Register from './components/Register';
import {Link, Route} from 'react-router-dom';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Link to='/registration'>Register</Link>
        <Link to='/login'>Login</Link>
        <Route exact path='/login' component={Login} />
        <Route exact path='/registration' component={Register} />
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header> */}
      </div>
    );
  }
}

export default App;
