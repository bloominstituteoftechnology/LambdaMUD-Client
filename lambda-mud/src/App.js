import React, { Component } from 'react';
//import logo from './logo.svg';
import Login from './components/Login';
import Register from './components/Register';
import Game from './components/Game';
import {Link, Route} from 'react-router-dom';
//import styled from 'styled-components';
import './App.css';


class App extends Component {
  logout = e => {
    e.preventDefault();
    localStorage.removeItem('Authorization');
    window.location.href='http://localhost:3000/login'
  }
  render() {
    return (
      <div className="App">
        <h1 style={{color:'teal'}}>LambdaMUD</h1>
        <div style={{padding:'1rem', color:'grey', outline:'0', position:'absolute', top:'0', right:'0'}}>
          <Link to='/registration' style={{padding: '1rem', textDecoration:'none'}}>Register</Link>
          <Link to='/login' style={{padding: '1rem', textDecoration:'none'}}>Login</Link>
          <button style={{border: 'none', color:'blue', background:'none'}} onClick={this.logout}>Logout</button>
        </div>
        <Route exact path='/login' component={Login} />
        <Route exact path='/registration' component={Register} />
        <Route exact path='/game' component={Game} />
      </div>
    );
  }
}

export default App;
