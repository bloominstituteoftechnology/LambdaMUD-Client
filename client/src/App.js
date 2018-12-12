import React, { Component } from "react";
import {
  Route, 
  BrowserRouter as Router, 
  Switch,
} from 'react-router-dom'
import "./App.css";
import RegisterPage from './components/RegisterPage.js'
import HomePage from './components/HomePage.js';

 class App extends Component {
  render() {
    return (
      <div className="Contains App">
        <header className="App-header">
          <Router>
            <Switch>
              <Route exact path = "/" component={HomePage} />
              <Route path = "/register" component = {RegisterPage} />
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