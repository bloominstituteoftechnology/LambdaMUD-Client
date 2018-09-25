import React, { Component } from 'react';
import './App.css';
import Main from './components/Main'
import Register from './components/Register'
import Play from './components/Play'
import {Route} from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path='/' component={Main} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/play' component={Play} />
      </div>
    );
  }
}

export default App;
