import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Header from '../Layout/Header';
import Home from '../Home';
import SignUp from '../SignUp';
import LogIn from '../LogIn';
import Game from '../Game';
import Footer from '../Layout/Footer';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="app">
        <Route path="/" component={Header} />
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/login" component={LogIn} />
        <Route exact path="/game" component={Game} />
        <Route path="/" component={Footer} />
      </div>
    );
  }
}

export default App;