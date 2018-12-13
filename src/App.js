import React, { Component } from "react";
import HomePage from "./components/homepage/HomePage";
import RegisterPage from "./components/register/RegisterPage";
import LoginPage from "./components/login/LoginPage";
import Game from "./components/game/Game";
import { Route } from "react-router-dom";
import "./App.css";

// this file holds all of the components 
class App extends Component {
  render() {
    return (
      <div className="App">  
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route
          exact
          path="/adventure"
          render={props => <Game {...props} init={this.init} />}
        /> 
      </div>
    );
  }
}

export default App;