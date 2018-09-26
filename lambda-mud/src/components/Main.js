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
          <img src={logo} className="Main-logo" alt="logo" />
          <h1 className="Main-title">Welcome to VueAct</h1>
        <p className="Main-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <NavLink className='start-game-button' to='/play'>Start Game</NavLink>
        <button className='logout' onClick={this.handleLogout}>Logout</button>
      </div>
    );
  } 
  }
  
  export default Authenticate(Main);
  