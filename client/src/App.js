import React, { Component } from "react";
import "./App.css";
import HomePage from './components/HomePage.js';


class App extends Component {
  render() {
    return (
      <div className="Contains app">
        <header className="App-header">
          <HomePage /> 
          
        </header>
      </div>
    );
  }
}
 export default App;