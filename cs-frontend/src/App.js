import React, { Component } from 'react';

import Home from './Components/Pages';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    user: null
  };

  componentDidMount = () => {
    //
  };

  login = user => {
    this.setState({ user });
  };

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/">
            {this.user ? <div className="home">//</div> : <Login />}
          </Route>
        </Switch>
      </div>
    );
  }
}

export default App;
