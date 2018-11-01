import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import Home from './components/home';
import Login from './components/login';
import Register from './components/register';
import Adventure from './components/adventure';

import './App.css';

class App extends Component {
  logout = e => {
    localStorage.removeItem('jwt');
  };

  render() {
    return (
      <div className="App">
        <div>
          <Link to="/">
            <button onClick={this.logout}>Logout</button>
          </Link>
        </div>
        <Route exact path="/" component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/adventure" component={Adventure} />
      </div>
    );
  }
}

export default App;
