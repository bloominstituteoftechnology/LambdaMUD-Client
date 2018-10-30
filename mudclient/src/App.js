import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import login from './components/login';

class App extends Component {

  render() {
    return (
      <div className="app">
        <Switch>
          <Route exact path="/login" component={login} />
        </Switch>
      </div>
    );
  }
}

export default App;
