import React, { Component } from 'react';
import logo from './logo.svg';
import Home from './components/Home';
import Login from './components/Login';
import Registration from './components/Registration';
// import Game from './components/Game';

import { Route, Switch } from 'react-router-dom';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
      
        
        <div className="container">
          <div className="page">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/registration" component={Registration} />
              {/* <Route exact path="/game" component={Game} /> */} */}
            </Switch>            
          </div>        
        </div>
      </div>
    );
  }
}

export default App;
