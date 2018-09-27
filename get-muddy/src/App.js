import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Game from './components/Game';
import Login from './components/Login';
import Registration from './components/Registration';
class App extends Component {
  constructor() {
      super()
      this.state = {
          key: 0
      }
  }
  render() {
    return (
      <div className="App">
        <h1 className="App-title">Lets get MUDding</h1>
        <Switch>
          <Route exact path='/' component={Game} />
          <Route path='/registration' component={Registration} />
          <Route path='/login' component={Login} />
        </Switch>
      </div>
    );
  }
}

export default App;

/*this.props.history.listen(() => {
console.log('New URL', this.props.history.location.pathname);*/