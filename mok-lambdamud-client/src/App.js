import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Home from './components/home';
import Login from './components/login';
import Registration from './components/registration';
import MUD from './components/mud';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path='/' component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Registration} />
        <Route exact path="/adventure" render={props => <MUD {...props} init={this.init} />} /> 
      </div>
    );
  }
}

export default App;
