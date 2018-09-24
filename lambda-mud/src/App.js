import React, { Component } from 'react';
import Login from './components/Login';
import {Link} from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <div>
        <h1>Lambda Adventure</h1>
        <Login />
        <Link to='/register'>Sign up </Link>
      </div>
    );
  }
}

export default App;
