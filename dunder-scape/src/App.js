import React, { Component } from "react";
import { Route } from "react-router-dom";
import styled from "styled-components";
import HomeComponent from "./components/home/HomeComponent";
import './index';
import ChoiceComponent from "./components/login-or-registration/ChoiceComponent";
const AppWrapper = styled.div`
`;
class App extends Component {
  render() {
    return (
      <AppWrapper>
        <Route exact path = "/" component = {HomeComponent} />
        <Route exact path = "/login-or-register" component = {ChoiceComponent} />
      </AppWrapper>
    );
  }
}

export default App;
