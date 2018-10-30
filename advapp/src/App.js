import React, { Component } from 'react';
import { Route, withRouter, NavLink } from 'react-router-dom';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <div className="links-container">
            <NavLink to="/signin" className="nav-link">Log In</NavLink>
            <NavLink to="/signup" className="nav-link">Sign Up</NavLink>
            <button onClick={ this.logout }>Logout</button>
          </div>
        </header>

        <Route path="/signup" component={ Signup } />
        <Route path="/signin" component={ Signin } />
        <Route path="/users" component={ Users } />
      </div>
    );
  }
}

export default withRouter(App);
