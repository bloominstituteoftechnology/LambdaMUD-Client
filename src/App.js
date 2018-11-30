import React, { Component } from 'react';
import Game from './Game';
import Login from './Login';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';

class App extends Component {
  handleLogin = (username, password) => {
    return null
  }
  render() {
    return (
      <Router>
        <div className='root'>
          <Route path="/" exact component={() => <Login login={this.handleLogin} />} />
          <Route path="/game" component={Game} />
        </div>
      </Router>      
    );
  }
}

export default App;
