import React, { Component } from 'react';
import Header from './components/Header';
import { Route } from 'react-router-dom';
import Main from './components/Main';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { withRouter } from 'react-router';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/" component={Header} />
        <Route exact path="/" component={Main} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/main" component={Main} />
      </div>
    );
  }
}

export default withRouter(App);
