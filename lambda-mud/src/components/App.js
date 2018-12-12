import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink, withRouter } from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';
import Login from './Login';
import Registration from './Registration';
import InitNewGame from './InitNewGame';
import NewGame from './NewGame';

class App extends Component {
  render() {
    return (
      <div className="App">

        <div className='nav-container'>
          <NavLink to='/api/registration'>Register</NavLink>
        </div>

        <Route 
          exact
          path='/api/registration'
          component={Registration}
        />
      </div>
    );
  }
}

export default withRouter(App);
// Landing page with registratioin and login forms

    // Route and link to Registration page
        // Display Registration form for new players
        // connect registration form to API
        // registration triggers redirect to landing page

    // Route and link to Login page
        // Display Login form for existing users
        // connect login form to API
        // login triggers redirect to page with 'start new game' button