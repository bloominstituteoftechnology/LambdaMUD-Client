import React, { Component } from "react";
import { Route } from "react-router-dom";
import styled from "styled-components";
import HomeComponent from "./components/home/HomeComponent";
import './index';
import ChoiceComponent from "./components/login-or-registration/ChoiceComponent";
import RegisterContainer from "./components/registration/RegisterContainer";
import LoginContainer from "./components/login/LoginContainer";
import GameContainer from "./components/game/GameContainer";
const AppWrapper = styled.div`
`;
class App extends Component {


  render() {
    return (
      <AppWrapper>
        <Route exact path = "/" component = {HomeComponent} />
        <Route exact path = "/login-or-registration" component = {ChoiceComponent} />
        <Route exact path = "/registration" component = {RegisterContainer} />
        <Route exact path = "/login" component = {LoginContainer} />
        <Route exact path = "/game" component = {GameContainer} />
      </AppWrapper>
    );
  }
}

export default App;
