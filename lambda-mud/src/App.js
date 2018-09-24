import React, { Component } from 'react';
import Login from './components/Login';
import Adventure from './components/Adventure';
import {Link} from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <div>
        <h1>Lambda Adventure</h1>
        
        {localStorage.getItem("token") ? <Adventure />:
        <div><Login /><Link to='/register'>Sign up </Link>
        </div>}

      </div>
    );
  }
}

export default App;
