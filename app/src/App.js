import React, { Component } from 'react';
import {
  Route, Link
} from 'react-router-dom';
import {isMobile} from 'react-device-detect';
import logo from './logo.svg';
import './App.css';
import LoginRegView from './components/LoginRegView';
import Login from './components/LoginView';
import Register from './components/RegisterView';
import MUDView from './components/MUDView';

class App extends Component {
  render() {
  
    return (
      <div className="App">
        <header className="App-header">
        <Route exact path="/" component={LoginRegView} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        </header>
        {/* <Route exact path="/" component={LoginRegView} />
        <Route path="/login" component={Login} /> */}
        
        <Route path="/mudview" component={MUDView} />
      </div>
    );
  }
}

export default App;
