import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Home extends Component {
  render() {
    return (
      <div className="App">
        <h1>LambdaMUD Project</h1>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
      </div>
    );
  }
}
