import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navigation.css';

const Navigation = () => {
  return (
    <div className="Nav">
      <div>
        <Link to="/">Home</Link>
      </div>
      <div style={(sessionStorage.getItem('key')) ? {display:'block'} : {display:'none'}}>
        <Link to="/game">Play</Link>
      </div>
      <div style={!(sessionStorage.getItem('key')) ? {display:'block'} : {display:'none'}}>
        <Link to="/login">Login</Link>
      </div>
      <div style={!(sessionStorage.getItem('key')) ? {display:'block'} : {display:'none'}}>
        <Link to="/register">Register</Link>
      </div>
      <div style={(sessionStorage.getItem('key')) ? {display:'block'} : {display:'none'}}>
        <Link to="/logout">Logout</Link>
      </div>
    </div>
  )
}

export default Navigation;
