import React, { Component } from 'react';
import { Route } from "react-router-dom";
import Main from "./components/Main";
import Register from "./components/Register";
import Login from "./components/Login";
import Play from "./components/Play";
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={Main} /> 
        <Route exact path="/register" component={Register} />    
        <Route exact path="/login" component={Login} /> 
        {/* <Route exact path="/play" component={Play} />                                                                                                */}
      </div>
    );
  }
}

export default App;
