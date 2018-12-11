import React, { Component, Fragment } from 'react';
import './App.css';
import {NavLink, Route, withRouter} from 'react-router-dom';
import Styled from 'styled-components';
import MainView from './views/MainView';
import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView";
import NavigationView from "./views/NavigationView";
import Home from "./components/Home/Home";

const Wrapper = Styled.div`
  width: 100%;
`;

const NavBar = Styled.div`
    height: 50px;
    width: 100%;
`;

class App extends Component {
  render() {
    return (
      <Wrapper>
          <NavBar>
              <NavigationView/>
          </NavBar>
          <Fragment>
              <Route exact path="/" component={Home} />
              <Route exact path="/game" component={MainView} />
              <Route exact path="/login" component={LoginView} />
              <Route exact path="/register" component={RegisterView} />
          </Fragment>
      </Wrapper>
    );
  }
}

export default withRouter(App);
