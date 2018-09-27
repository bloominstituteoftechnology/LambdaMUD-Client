import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navigation.css';

const Navigation = () => {
  return (
    <div className="Nav">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li style={(sessionStorage.getItem('key')) ? {display:'block'} : {display:'none'}}>
          <Link to="/game">Play</Link>
        </li>
        <li style={!(sessionStorage.getItem('key')) ? {display:'block'} : {display:'none'}}>
          <Link to="/login">Login</Link>
        </li>
        <li style={!(sessionStorage.getItem('key')) ? {display:'block'} : {display:'none'}}>
          <Link to="/register">Register</Link>
        </li>
        <li style={(sessionStorage.getItem('key')) ? {display:'block',float:'right'} : {display:'none'}}>
          <Link to="/logout">Logout</Link>
        </li>
      </ul>
    </div>
  )
}

export default Navigation;
