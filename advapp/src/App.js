import React, { Component } from 'react';
import { Route, withRouter, NavLink } from 'react-router-dom';
import './App.css';

import Login from './components/Login/Login';
import Register from './components/Register/Register';
// import Main from './components/Main/Main';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <div className="links-container">
            <NavLink to="/login" className="nav-link">Log In</NavLink>
            <NavLink to="/register" className="nav-link">Sign Up</NavLink>
            <button onClick={ this.logout }>Logout</button>
          </div>
        </header>

        <Route path="/register" component={ Register } />
        <Route path="/login" component={ Login } />
        {/* <Route path="/main" component={ Main } /> */}
      </div>
    );
  }
}

export default withRouter(App);
