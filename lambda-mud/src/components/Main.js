import React, {Component} from 'react';
import logo from '../logo.svg';
import '../App.css'
import Authenticate from './Authenticate'
//import axios from 'axios';
import {NavLink} from 'react-router-dom'

class Main extends Component {
  handleLogout = () => {
    localStorage.removeItem('key')
    window.location.reload()
  }

  render() {
    return (
      <div className="Main">
        <header className="Main-header">
          <img src={logo} className="Main-logo" alt="logo" />
          <h1 className="Main-title">Welcome to VueAct</h1>
        </header>
        <p className="Main-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <NavLink to='/play'>Start Game</NavLink>
        <button onClick={this.handleLogout}>Logout</button>
      </div>
    );
  }
  }
  
  export default Authenticate(Main);
  