import React, { Component } from 'react';
import './App.css';
// import Register from './components/Register';
// import Login from './components/Login';
// import Main from './components/Main';
import { Login, Register, Main } from './components';
import { Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to LambdaMUD</h1>
        </header>
        <Route exact path='/' component={Main} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
      </div>
    );
  }
}

export default App;
