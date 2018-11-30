import React, { Component } from 'react';

import Splash from './components/Splash';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="Body">
        {/* <Splash/> */}
        <Login />
        {/* <Register /> */}
      </div>
    );
  }
}

export default App;
