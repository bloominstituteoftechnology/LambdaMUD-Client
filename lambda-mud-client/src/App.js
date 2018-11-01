import React, { Component } from 'react';
import { Route } from "react-router-dom";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Authentication from './components/auth/Authentication';
import Adventure from './components/adv/Adventure';

// Main app container component
// Contains two routes, one for login/registration and one for the adventure game
// Set up material-ui framework
 class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
      <div>
        <Route exact path="/" component={Authentication} />
        <Route exact path="/adventure" component={Adventure} />
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;