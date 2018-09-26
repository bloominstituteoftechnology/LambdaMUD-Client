import React, { Component } from 'react';
import logo from './tiki_logo.png';
import './App.css';
import Register from './components/register';
import Login from './components/login';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      register: true,
      chat: []
    }

  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        {this.state.register ? <Register/> : <Login/> }
        
      </div>
    );
  }
}

export default App;
