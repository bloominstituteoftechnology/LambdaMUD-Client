import React, { Component } from 'react';
import { Route } from "react-router-dom";
import Main from "./components/Main";
import Register from "./components/Register";
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={Main} /> 
        <Route path="/login" component={Register} />                    
      </div>
    );
  }
}

export default App;
