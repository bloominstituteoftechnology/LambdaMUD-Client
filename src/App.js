import React, { Component } from 'react';
import { Route } from "react-router-dom";
import './App.css';
import Authenticate from './components/authenticate/authenticate';
import GameWindow from './components/gamewindow/gamewindow';
import Login from './components/login/login';
import Registration from './components/registration/registration';
import styled from "styled-components";

const GameContainer = styled.div`
  background-image: url(./assets/images/scroll_background.jpg);
`

class App extends Component {
  render() {
    return (
      <GameContainer className="App">
        <Route path="/login" component={Login} />
        <Route path="/register" component={Registration} />
        <Route exact path="/" component={GameWindow} />
      </GameContainer>
    );
  }
}

export default Authenticate(App);
