import React, { Component } from 'react';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = { n };

  componentDidMount = () => {
    //
  };

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/">
            <div className="home">//</div>
          </Route>
        </Switch>
      </div>
    );
  }
}

export default App;
