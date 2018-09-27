import React, { Component } from 'react';
import logo from './logo.gif';
import './App.css';
import Game from './components/Game'
import Login from './components/Login'
import Register from './components/Register'
import { Route, withRouter } from 'react-router-dom'
import styled from 'styled-components'

const LogoutButton = styled.button`
    position: absolute;
    top:0; 
    right:0;
`;

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {}
}

  logoutHandler = e => {
    localStorage.removeItem("key");
    this.props.history.push('/login');
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <LogoutButton onClick={this.logoutHandler}>Log out</LogoutButton>
        </header>
        <Route exact path='/' component={Game} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
      </div>
    );
  }
}

export default withRouter(App);
