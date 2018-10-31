import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import login from "./components/login";
import register from "./components/register";
import Titlebar from "./components/titlebar";
import Game from "./components/game";

class App extends Component {
  render() {
    return (
      <div className="app">
        <Titlebar />
        <Switch>
          <Route exact path="/login" component={login} />
          <Route exact path="/register" component={register} />
          <Route exact path="/" component={Game} />
        </Switch>
      </div>
    );
  }
}

export default App;
