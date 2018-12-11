import React, { Component } from 'react';
import './App.css';
import { Route, withRouter } from 'react-router-dom';
import Styled from 'styled-components';
import MainView from './views/MainView';
import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView";

const Wrapper = Styled.div`
  background-color: #f3f3f3;
  height: 100%;
`;

const SideBar = Styled.div`
    position: fixed;
    top: 0px;
    bottom: 0px;
    left: 0px;
    width: 20%;
`;

const Content = Styled.div`

  margin-left: 20%;
  width: 80%;


  background-color: #f3f3f3;
`;

class App extends Component {
  render() {
    return (
      <Wrapper>
          <SideBar/>
          <Content>
              <Route exact path="/" component={MainView} />
              <Route exact path="/login" component={LoginView} />
              <Route exact path="/register" component={RegisterView} />
          </Content>
      </Wrapper>
    );
  }
}

export default withRouter(App);
