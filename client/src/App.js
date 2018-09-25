import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route } from 'react-router-dom';
import LoginForm from './components/Authentication/Login';
import Registration from './components/Authentication/Registration';
import Main from './components/Main';

class App extends Component {
  constructor(props){
    super(props)
    // this.state = {
    //   user: {
    //     username:
    //   }
    // }
  }
  render() {
    return (
      <div className="App">
        <Route path='/login' component={LoginForm} />
        <Route path='/registration' component={Registration} />
        <Route path='/' exact component={Main} />
      </div>
    );
  }
}

export default App;
