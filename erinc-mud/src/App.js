import React, { Component } from 'react';
import { Route } from "react-router-dom";
import Main from "./components/Main";
import Register from "./components/Register";
import Login from "./components/Login";
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={Main} /> 
        <Route path="/register" component={Register} />    
        <Route path="/login" component={Login} />                                            
      </div>
    );
  }
}

export default App;
