import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { NavLink, Route } from 'react-router-dom';
import { withRouter } from 'react-router';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <nav>
            <NavLink to="/signup">Sign Up</NavLink>
            &nbsp;|&nbsp;
          </nav>
        </header>

        <main>
      
        <Route
          path="/signup"
          component={SignUpForm}/>

        </main>
      </div>
    );
  }
}

export default withRouter(App);
