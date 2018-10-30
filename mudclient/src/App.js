import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import login from "./components/login";
import register from "./components/register";

class App extends Component {
  render() {
    return (
      <div className="app">
        <Switch>
          <Route exact path="/login" component={login} />
          <Route exact path="/register" component={register} />
        </Switch>
      </div>
    );
  }
}

export default App;
