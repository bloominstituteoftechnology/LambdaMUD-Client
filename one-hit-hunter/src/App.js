// --> Library stuff / CSS
import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom'
import './App.css';

// --> Components
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import Mud from './components/Mud'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">  
          <NavLink exact to='/home'>Home</NavLink>  
          &nbsp; | &nbsp;             
          <NavLink exact to='/sign-up'>Sign Up</NavLink>
          &nbsp; | &nbsp;
          <NavLink to='/login'>Login</NavLink>
          &nbsp; | &nbsp;
          <NavLink to='/mud'>Let's Play</NavLink>
        </header>
        <Route
          exact path='/home'
          component={Home}
        />

        <Route
          exact path='/sign-up'
          component={Register}
        />

        <Route
          path='/login'
          component={Login}
        />

        <Route 
          path='/mud'
          component={Mud}
        />
      </div>
    );
  }
}

export default App;
