import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Game from './components/Game';
import './App.css';
class App extends Component {
  render() {
    return (
      <div className="App-container">
        <Route exact path="/" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/play" component={Game} />
      </div>
    );
  }
}
export default App;