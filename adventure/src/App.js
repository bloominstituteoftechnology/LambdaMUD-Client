import React, { Component } from 'react';
import Login from './components/login';
import './App.css';
import Registration from './components/registration'
import { Route } from 'react-router-dom';

class App extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      title: '',
      description: '',
      uuid:'',
      players: [],
    }
  }

  render() {
    return (
      <div className="App">        
        <Route path = "/" component = {Login} />
        <Route path = "/registration" component = {Registration} />
      </div>
    );
  }
}

export default App;
