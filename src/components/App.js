import React, { Component } from "react";
import {
  Route, 
  BrowserRouter as Router, 
  Switch,
} from 'react-router-dom'
// import {Switch, Route} from 'react-router'
import "./App.css";
import HomePage from './HomePage.js';
import LoginScreen from './LoginScreen.js'
import RegisterPage from './Register.js'
import GamePlay from './GamePlay.js'


class App extends Component {
  render() {
    return (
      <div className="App container">
        <header className="App-header">
          <Router>
            <Switch>
              <Route exact path = "/" component={HomePage} />
              <Route path = "/login" component={LoginScreen} />
              <Route path = "/register" component = {RegisterPage} />
              <Route path = "/game" component = {GamePlay} />
              <Route component={HomePage} /> 
              {/* This last line takes the user to the home page in the event they attempt to go to a path that doesn't exist. */}
            </Switch>

          </Router> 
        </header>
      </div>
    );
  }
}

export default App;
