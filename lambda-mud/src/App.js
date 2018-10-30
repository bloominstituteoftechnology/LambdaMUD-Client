import React, { Component } from 'react';
//import logo from './logo.svg';
import Login from './components/Login';
import Register from './components/Register';
import Game from './components/Game';
import {Link, Route} from 'react-router-dom';
import styled from 'styled-components';
import './App.css';

const Span = styled.span`
  font-size: 1rem;
  font-weight: 900;
  color: blue
`

class App extends Component {
  render() {
    return (
      <div className="App">
        <Link to='/registration' style={{padding: '1rem'}}>Register</Link>
        <Link to='/login'>Login</Link>
        <Route exact path='/login' component={Login} />
        <Route exact path='/registration' component={Register} />
        <Route exact path='/game' component={Game} />
        <div>
          <h1>Help Menu:</h1>
          <p><Span>move 'direction': </Span>moves you in the direction specified (n, e, s, w)</p>
          <p><Span>say 'message': </Span>say the input message to the players present in the room</p>
        </div>
      </div>
    );
  }
}

export default App;
