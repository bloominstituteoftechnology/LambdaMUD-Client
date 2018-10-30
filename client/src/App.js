import React, { Component } from 'react';
import { Route, Redirect  } from 'react-router-dom'
import { Auth } from './components'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Redirect from="/" to="/auth"></Redirect>
        <Route path="/auth" component={Auth}></Route>
      </div>
    );
  }
}

export default App;