import React, { Component } from "react";
import "./App.css";
import { Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import TextWindow from "./Window";
import Redir from './Redir'

// const url = "https://charles-mud.herokuapp.com";



class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Lambda MUD</h1>
        <Route exact path='/' component={Redir} />
        <Route path="/register" component={Register}/>
        <Route path="/login" component={Login} />
        <Route path="/main" component={TextWindow} />
      </div>
    );
  }
}

export default App;
