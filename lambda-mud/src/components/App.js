import React, { Component } from 'react';
import { Route, Link, withRouter } from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';
import Login from './Login';
import Registration from './Registration';
import Adv from './Adv';


class App extends Component {
  render() {
    return (
      <div className="App">

        <div className='nav-container'>
          <Link to='/api/registration'>Register</Link>
          <Link to='/api/login'>Log in</Link>
        
        </div>

        <Route 
          exact
          path='/api/registration'
          component={Registration}
          // render={() => (
          //     <Registration />
          // )}
        />
        <Route 
          exact
          path='/api/login'
          component={Login}
          // render={() => (
          //   <Login />
          // )}
        />

        <Route
          exact
          path='/api/adv/init'
          component={Adv}
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