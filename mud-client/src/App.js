import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Home from './components/home';
import Login from './components/login';
import Register from './components/register';
import './App.css';

class App extends Component {
  logout = e => {
    localStorage.removeItem('jwt');
  };

  render() {
    return (
      <div className="App">
        <div>
          <button onClick={this.logout}>Logout</button>
        </div>
        <Route exact path="/" component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
      </div>
    );
  }
}

export default App;
