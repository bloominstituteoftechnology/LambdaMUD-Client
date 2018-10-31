import React, { Component } from 'react';
//import logo from './logo.svg';
import Login from './components/Login';
import Register from './components/Register';
import Game from './components/Game';
import {Link, Route} from 'react-router-dom';
//import styled from 'styled-components';
import './App.css';



class App extends Component {
  render() {
    return (
      <div className="App">
        <Link to='/registration' style={{padding: '1rem'}}>Register</Link>
        <Link to='/login'>Login</Link>
        <Route exact path='/login' component={Login} />
        <Route exact path='/registration' component={Register} />
        <Route exact path='/game' component={Game} />

      </div>
    );
  }
}

export default App;
