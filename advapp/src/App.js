import React, { Component } from 'react';
import { Route, withRouter, NavLink } from 'react-router-dom';
import './App.css';

import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Main from './components/Main/Main';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <div className="links-container">
            <h3>LAMBDA MUD</h3>
            <NavLink to="/login" className="nav-link">LOG IN</NavLink>
            <NavLink to="/register" className="nav-link">SIGN UP</NavLink>
            <button onClick={ this.logout }>LOGOUT</button>
          </div>
        </header>

        <Route path="/register" component={ Register } />
        <Route path="/login" component={ Login } />
        <Route path="/main" component={ Main } />
      </div>
    );
  }

  logout = event => {
    localStorage.removeItem('token');
    this.props.history.push('/login');
  };
}

export default withRouter(App);
