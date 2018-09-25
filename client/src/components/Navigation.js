import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navigation.css';

const Navigation = () => {
  return (
    <div className="Nav">
      <div>
        <Link to="/">Home</Link>
      </div>
      <div>
        <Link to="/">Play</Link>
      </div>
      <div>
        <Link to="/login">Login</Link>
      </div>
      <div>
        <Link to="/register">Register</Link>
      </div>
      <div>
        <Link to="/">Logout</Link>
      </div>
    </div>
  )
}

export default Navigation;
