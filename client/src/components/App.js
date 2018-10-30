import React, { Component } from "react";
import {
  Route, 
  Link, 
  BrowserRouter as Router, 
  Switch,
} from 'react-router-dom'
// import {Switch, Route} from 'react-router'
import "./App.css";
import HomePage from './HomePage.js';
import LoginScreen from './LoginScreen.js'
import RegisterPage from './Register.js'
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
            </Switch>

          </Router>
        </header>
      </div>
    );
  }
}

export default App;
