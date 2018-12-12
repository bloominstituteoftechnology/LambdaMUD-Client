import React, { Component } from "react";
import {
  Route, 
  BrowserRouter as Router, 
  Switch,
} from 'react-router-dom'
import "./App.css";
import RegisterPage from './components/RegisterPage.js'
import HomePage from './components/HomePage.js';
import LoginPage from './components/LoginPage.js';

 class App extends Component {
  render() {
    return (
      <div className="Contains App">
        <header className="App-header">
          <Router>
            <Switch>
              <Route exact path = "/" component={HomePage} />
              <Route path = "/register" component = {RegisterPage} />
              <Route path = "/login" component={LoginPage} />
              <Route component={HomePage} /> 
            </Switch>
           </Router> 
        </header>
      </div>
    );
  }
}
 export default App;