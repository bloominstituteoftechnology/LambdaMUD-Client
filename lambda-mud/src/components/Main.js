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
        <div>
          <img src={logo} className="Main-logo" alt="logo" />
          <NavLink className='start-game-button' to='/play'>Start Game</NavLink>
          <button className='main-logout' onClick={this.handleLogout}>Logout</button>
        </div>
          
      </div>
    );
  } 
  }
  
  export default Authenticate(Main);
  